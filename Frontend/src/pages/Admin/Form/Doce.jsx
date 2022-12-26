/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { useForm, Controller } from 'react-hook-form';
import Select from 'react-select';
import { Container, Row, Col } from 'react-bootstrap';
import { Title } from "../../../components/Title";
import { CancelButton } from "../../../components/CancelButton";
import Link from "next/link";
import { PrimaryButton } from "../../../components/PrimaryButton";
import { ErrorText, InputForm, InputLabel, StyledNumericInput, StyledSwitch, SubTitle, Table, TextArea, ColorButton, ActionButton, StyledInputMask } from "../../../styles/components/FormComponents";
import { Alert, Typography } from "@mui/material";
import { Tooltip } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import { toast } from 'react-toastify';
import DeleteIcon from '@mui/icons-material/Delete';
import RefreshIcon from '@mui/icons-material/Refresh';
import noImage from '../../../img/noImage.png';
import EditIcon from '@mui/icons-material/Edit';
import { ImageContainer, Accordion, AccordionSummary, AccordionDetails, } from '../../../styles/pages/Admin/Form/Doce';
import Image from "next/future/image";
import receitaService from "../../../services/receita.service";
import doceService from "../../../services/doce.service";
import categoriaService from '../../../services/categoria.service';
import { priceFormatter, revertPriceFormatter } from "../../../utils/formatter";
import { queryClient } from '../../../lib/queryClient';
import moment from "moment/moment";
import horaService from "../../../services/hora.service";
import { useCloudinary } from "../../../hooks/useCloudinary";
import { getPlaiceholder } from "plaiceholder";
import { withSSRAuth } from "../../../utils/withSSRAuth";
import { setupAPIClient } from "../../../lib/api";
import PopoverStyled from "../../../components/Popover";
//import ReceitaDataService from '../../services/receita.service';

export default function Doce({ doce, optionsReceita, allReceitas, optionsCategoria, valorHora, imagePlaceholderUrl }) {

    const MedidasReceitaOptions = [
        { label: 'g / mL', value: 'g/mL' },
        { label: 'Kg / L', value: 'Kg/L' }
    ]

    const { register, handleSubmit, control, setValue, getValues, reset, formState } = useForm({
        mode: "onChange",
        defaultValues: {
            nomeDoce: doce && doce.nomeDoce,
            categoria: doce ? optionsCategoria.find(categoria => doce.idCategoria === categoria.value) : null,
            receitas: doce && doce.receitas,
            valorTotalReceitas: doce && doce.valorTotalReceitas,
            horasTrab: doce && doce.horasTrab,
            maoDeObra: doce && doce.maoDeObra,
            valorEmbalagem: doce && doce.valorEmbalagem,
            totalCustoProducao: doce && doce.totalCustoProducao,
            margemLucro: doce && doce.margemLucro,
            valorTotalComMargem: doce && doce.valorTotalComMargem,
            peso: doce && doce.peso,
            porcoes: doce && doce.porcoes,
            valorPorcao: doce && doce.valorPorcao,
            anotacoes: doce && doce.anotacoes,
            descricao: doce && doce.descricao,
            disponivel: doce ? doce.disponivel : true
        }
    });

    const { errors, isDirty, isValid } = formState;
    const uploadImage = useCloudinary();

    const [selectedReceita, setSelectedReceita] = useState();
    const [selectedMedidaReceita, setSelectedMedidaReceita] = useState(MedidasReceitaOptions[0]);
    const [quantidadeReceita, setQuantidadeReceita] = useState('');

    function handleSelectedReceita(selectedOption) {
        setSelectedReceita(selectedOption);
    }
    function handleSelectedMedidaReceita(selectedOption) {
        setSelectedMedidaReceita(selectedOption);
    }
    function handleQuantidadeReceita(e) {
        setQuantidadeReceita(e.target.value);
    }
    const isButtonAddReceitaDisabled = selectedReceita && quantidadeReceita !== '' ? false : true;
    const [receitasDoce, setReceitasDoce] = useState(doce ? doce.receitas : []);
    const [receitasDoceChanged, setReceitasDoceChanged] = useState(false);

    function handleAddReceitasDoce() {
        if (receitasDoce.length !== 0 && receitasDoce.find(receita => receita.idReceita === selectedReceita.value)) {
            toast.warn('Essa receita já foi adicionada!');
        } else {

            const receitaBanco = allReceitas.find(receita =>  //pegar os dados do ingrediente que tem o id
                receita.id === selectedReceita.value
            )
            // console.log(receitaBanco)
            let valorReceita = 0;
            let precoKg = 0;

            //calcular valor da receita por kg
            if (receitaBanco.unidadeDeMedida === "Kg/L") {
                precoKg = (receitaBanco.custo / parseFloat(receitaBanco.rendimento)).toFixed(2);
            } else {
                precoKg = (receitaBanco.custo / parseFloat(receitaBanco.rendimento) * 1000).toFixed(2);
            }

            if (selectedMedidaReceita.value === "Kg/L") {
                valorReceita = quantidadeReceita * precoKg;
            } else {
                valorReceita = quantidadeReceita / 1000 * precoKg;
            }

            const receitaDoce = {
                idReceita: selectedReceita.value,
                nome: selectedReceita.label,
                quantReceita: quantidadeReceita,
                unidadeDeMedida: selectedMedidaReceita.value,
                tempoPreparo: receitaBanco.tempoPreparo,
                valor: valorReceita
            }

            setReceitasDoce(old => [...old, receitaDoce]);
            setSelectedReceita(null);
            setQuantidadeReceita('');
            setReceitasDoceChanged(true);
        }
    }

    function handleDeleteReceitaDoce(id) {
        setReceitasDoce(receitasDoce.filter(receita => receita.idReceita !== id));
        setReceitasDoceChanged(true);
    }

    const onSubmit = data => {
        //console.log(data);
        const submit = async () => {

            let linkImage = urlImage;
            if (image) {
                if (doce?.imagemDoce !== urlImage) {
                    // console.log(image)
                    try {
                        const res = await uploadImage(image);
                        linkImage = res.data.secure_url;
                    } catch (err) {
                        throw err;
                    }

                }
            }
            const doceFields = {
                anotacoes: data.anotacoes,
                descricao: data.descricao,
                disponivel: data.disponivel,
                horasTrab: data.horasTrab,
                nomeDoce: data.nomeDoce,
                peso: data.peso,
                porcoes: data.porcoes,
                totalCustoProducao: data.totalCustoProducao,
                valorPorcao: data.valorPorcao,
                idCategoria: data.categoria.value,
                margemLucro: typeof data.margemLucro === "number" || data.margemLucro === null ? data.margemLucro : parseFloat(data.margemLucro.replace("%", "")),
                valorTotalComMargem: revertPriceFormatter(data.valorTotalComMargem).toFixed(2),
                valorEmbalagem: data.valorEmbalagem && revertPriceFormatter(data.valorEmbalagem).toFixed(2),
                valorTotalReceitas: revertPriceFormatter(data.valorTotalReceitas).toFixed(2),
                maoDeObra: revertPriceFormatter(data.maoDeObra).toFixed(2),
                receitas: receitasDoce,
                imagemDoce: linkImage
            }

            // console.log(doceFields)
            if (!doce) {
                return doceService.create(doceFields);
            } else {
                return doceService.update(doce.id, doceFields);
            }
        }

        const res = toast.promise(
            submit,
            {
                pending: 'Enviando...',
                success: 'Doce salvo com sucesso!',
                error: 'Ocorreu um erro ao salvar o doce!'
            }
        )
        res.then(() => {
            if (doce) {
                reset({}, {
                    keepValues: true,
                });
            } else {
                reset({
                    nomeDoce: '',
                    categoria: '',
                    receitas: '',
                    valorTotalReceitas: '',
                    horasTrab: '',
                    maoDeObra: '',
                    valorEmbalagem: '',
                    totalCustoProducao: '',
                    margemLucro: '',
                    valorTotalComMargem: '',
                    peso: '',
                    porcoes: '',
                    valorPorcao: '',
                    anotacoes: '',
                    descricao: '',
                    disponivel: ''
                });
                setReceitasDoce([]);
                setImage(null)
            }
            queryClient.invalidateQueries('doces');//invalidar o query para atualizar a tabela
            setReceitasDoceChanged(false); //desabilitar botao salvar
        }).catch((err) => {
            console.log(err);
        })
    }

    function calculoValorVenda() {
        const margem = getValues("margemLucro") ? getValues("margemLucro") : 0;
        const valorTotal = getValues("valorTotalReceitas");
        const totalCustoProducao = revertPriceFormatter(getValues("totalCustoProducao"));

        var totalMargem = 0;

        if (totalCustoProducao) {
            // console.log("totalCustoProducao", totalCustoProducao)
            totalMargem = ((parseFloat(totalCustoProducao) * (parseFloat(margem) / 100)) + parseFloat(totalCustoProducao)).toFixed(2);
        } else {
            totalMargem = valorTotal && margem && ((parseFloat(valorTotal) * (parseFloat(margem) / 100)) + parseFloat(valorTotal)).toFixed(2);
        }
        setValue("valorTotalComMargem", String(totalMargem).replace(".", ","));

    }

    function calculoValorReceitas() { //calcular os valores quando for editar

        const newReceitasDoce = receitasDoce.map(receita => {
            const receitaBanco = allReceitas.find(receitaAll =>
                receitaAll.id === receita.idReceita
            )
            let valorReceita = 0;
            let precoKg = 0;

            //calcular valor da receita por kg
            if (receitaBanco.unidadeDeMedida === "Kg/L") {
                precoKg = (receitaBanco.custo / parseFloat(receitaBanco.rendimento)).toFixed(2);
            } else {
                precoKg = (receitaBanco.custo / parseFloat(receitaBanco.rendimento) * 1000).toFixed(2);
            }

            if (receita.unidadeDeMedida === "Kg/L") {
                valorReceita = receita.quantReceita * precoKg;
            } else {
                valorReceita = receita.quantReceita / 1000 * precoKg;
            }

            return {
                ...receita,
                tempoPreparo: receitaBanco.tempoPreparo,
                valor: valorReceita
            }
        })

        setReceitasDoce(newReceitasDoce)
    }

    function sumTime(start, end) {
        var data = moment.duration(start).asMinutes() + moment.duration(end).asMinutes()
        var minutes = data % 60;
        var hours = (data - minutes) / 60;
        return ((hours.toString().length === 1 ? `0${hours}` : hours) + ":" + minutes);

    }

    function calculoCustoHorasAndPeso() {
        var custo = 0;
        var peso = 0;
        var horasTrab = 0;

        receitasDoce.map(receitaDoce => {

            if (receitaDoce.unidadeDeMedida === "Kg/L") {
                peso = (peso + (parseFloat(receitaDoce.quantReceita) * 1000));
            } else {
                peso = (peso + parseFloat(receitaDoce.quantReceita));
            }

            custo = custo + receitaDoce.valor;
            horasTrab = sumTime(horasTrab, receitaDoce.tempoPreparo)
        })

        setValue('horasTrab', horasTrab)
        setValue('peso', peso)
        setValue('valorTotalReceitas', custo) //custo receitas
        setValue('maoDeObra', calculoMaoDeObra(horasTrab))
    }

    function calculoCustoProducao() {
        const maoDeObra = getValues('maoDeObra') ? getValues('maoDeObra') : 0;
        const valorEmbalagem = getValues('valorEmbalagem') ? getValues('valorEmbalagem') : 0;

        const totalcusto = (revertPriceFormatter(getValues('valorTotalReceitas')) +
            revertPriceFormatter(maoDeObra) +
            revertPriceFormatter(valorEmbalagem)
        )

        setValue("totalCustoProducao", totalcusto)
    }

    function calculoMaoDeObra(horasTrab) {
        //horas trab * valor hora
        var data = moment.duration(horasTrab).asMinutes() //tempo em minutos
        var minutos = data % 60;
        var horas = (data - minutos) / 60;
        var maoDeObra = (horas * valorHora + (minutos * (valorHora / 60)));
        // console.log("maodeObra", maoDeObra)

        return maoDeObra;
    }

    function handleResetButton() {
        calculoCustoHorasAndPeso();
        calculoCustoProducao();
        calculoValorVenda();
    }

    function handleCustoAndValorFinal() {
        calculoCustoProducao();
        calculoValorVenda();
    }

    useEffect(() => {
        if (receitasDoceChanged) { //para nao chamar automaticamente quando vai editar
            calculoCustoHorasAndPeso();
            calculoCustoProducao();
            calculoValorVenda();
        }
    }, [receitasDoce])

    useEffect(() => {
        if (doce) {
            calculoValorReceitas()
        }
    }, [])

    const [expanded, setExpanded] = React.useState(false);

    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };

    function handleHorasTrab(horas) {
        setValue('maoDeObra', calculoMaoDeObra(horas.replace('h', '')));
        handleCustoAndValorFinal();
    }

    const [image, setImage] = useState(null);
    const [urlImage, setUrlImage] = useState(doce?.imagemDoce ? doce.imagemDoce : null);

    function handleImageChange(e) {
        if (!e.target.files || e.target.files.length === 0) {
            setImage(null);
        } else {
            setImage(e.target.files[0]);
        }
    }

    useEffect(() => {
        if (!image) {
            setUrlImage(doce?.imagemDoce ? doce.imagemDoce : null);
        } else {
            const objectUrl = URL.createObjectURL(image);
            setUrlImage(objectUrl);

            return () => URL.revokeObjectURL(objectUrl);
        }
    }, [image])

    const isSubmitButtonDisabled = (!image && !receitasDoceChanged && !isDirty) || (!isValid && isDirty);

    return (
        <Container className="w-50 mb-5">
            <Title title={doce ? 'Editar Doce' : 'Cadastrar Doce'} />
            <form onSubmit={handleSubmit(onSubmit)}>
                <Row>
                    <Col >
                        <input
                            type="file"
                            id='inputImage'
                            style={{ zIdex: -1, position: 'absolute', opacity: 0 }}
                            accept={'image/png, image/jpeg, image/jpg'}
                            onChange={handleImageChange}
                        />
                        <ImageContainer htmlFor='inputImage'>
                            <div style={{ borderRadius: 10 }}>
                                <Image
                                    src={urlImage ? urlImage : noImage}
                                    alt=""
                                    fill
                                    size={350}
                                    style={{ objectFit: 'cover' }}
                                    placeholder="blur"
                                    blurDataURL={imagePlaceholderUrl ? imagePlaceholderUrl : noImage}
                                />
                            </div>
                            <span><EditIcon fontSize="small" style={{ color: 'gray' }} /></span>
                        </ImageContainer>
                    </Col>
                    <Col md={12} lg={6}>
                        <Row>
                            <Col lg={7}>
                                <InputLabel color={errors.nomeDoce ? 'error' : 'normal'}>Nome</InputLabel>
                                <InputForm color={errors.nomeDoce ? 'error' : 'normal'} type="text"
                                    {...register("nomeDoce",
                                        { required: "Digite o nome do doce" })} />
                                {errors.nomeDoce && <ErrorText>{errors.nomeDoce.message}</ErrorText>}
                            </Col>
                            <Col>
                                <InputLabel color={errors.categoria ? 'error' : 'normal'}>Categoria</InputLabel>
                                <Controller
                                    name="categoria"
                                    control={control}
                                    rules={{
                                        required: "Escolha a categoria do doce"
                                    }}
                                    render={({ field }) =>
                                        <Select
                                            {...field}
                                            instanceId={'categoria'}
                                            options={optionsCategoria}
                                            theme={(theme) => ({
                                                ...theme,
                                                colors: {
                                                    ...theme.colors,
                                                    primary25: '#fadcec',
                                                    primary: '#F7A0CE',
                                                },
                                            })}
                                        />
                                    }
                                />
                                {errors.categoria && <ErrorText>{errors.categoria.message}</ErrorText>}

                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <InputLabel>Descrição doce</InputLabel>
                                <TextArea color={'normal'} {...register("descricao")} style={{ height: 100 }} />
                            </Col>
                        </Row>
                    </Col>
                </Row>
                <Row>
                    <Col lg={6}>
                        <InputLabel>Receita</InputLabel>
                        <Select
                            instanceId="receitas"
                            onChange={handleSelectedReceita}
                            value={selectedReceita}
                            options={optionsReceita}
                            theme={(theme) => ({
                                ...theme,
                                colors: {
                                    ...theme.colors,
                                    primary25: '#fadcec',
                                    primary: '#F7A0CE',
                                },
                            })}
                        />
                    </Col>
                    <Col>
                        <InputLabel>Quantidade</InputLabel>
                        <StyledNumericInput
                            decimalScale={3}
                            decimalSeparator={','}
                            color={'normal'}
                            onChange={handleQuantidadeReceita}
                            value={quantidadeReceita}
                        />
                    </Col>
                    <Col>
                        <InputLabel>Medida</InputLabel>
                        <Select
                            instanceId="medidaReceita"
                            onChange={handleSelectedMedidaReceita}
                            value={selectedMedidaReceita}
                            options={MedidasReceitaOptions}
                            theme={(theme) => ({
                                ...theme,
                                colors: {
                                    ...theme.colors,
                                    primary25: '#fadcec',
                                    primary: '#F7A0CE',
                                },
                            })}
                        />
                    </Col>
                    <Col lg={1} style={{ display: 'flex', justifyContent: 'center', }}>
                        <div style={{ marginTop: 'auto', marginBottom: '0.25rem' }}>
                            <Tooltip title='Adicionar'>
                                <span>
                                    <ColorButton aria-label="Add"
                                        onClick={handleAddReceitasDoce}
                                        disabled={isButtonAddReceitaDisabled}>
                                        <AddIcon />
                                    </ColorButton>
                                </span>
                            </Tooltip>
                        </div>
                    </Col>
                </Row>
                <Row >
                    <Col>
                        <Table>
                            <thead>
                                <tr>
                                    <th style={{ width: '30%' }}>Nome</th>
                                    <th style={{ width: '20%' }}>Quantidade</th>
                                    <th style={{ width: '20%' }}>Valor</th>
                                    <th style={{ width: '20%' }}>Tempo Preparo</th>
                                    <th style={{ width: '5%' }}></th>
                                </tr>
                            </thead>
                            <tbody>
                                {receitasDoce.length > 0 ?
                                    receitasDoce.map(receita => (
                                        <tr key={receita.idReceita} >
                                            <td>{receita.nome}</td>
                                            <td>{receita.quantReceita} {receita.unidadeDeMedida}</td>
                                            <td>{priceFormatter.format(String(receita.valor))}</td>
                                            <td>{receita.tempoPreparo}</td>
                                            <td> <Tooltip title='Deletar'>
                                                <ActionButton onClick={() => handleDeleteReceitaDoce(receita.idReceita)}>
                                                    <DeleteIcon />
                                                </ActionButton>
                                            </Tooltip></td>

                                        </tr>
                                    ))
                                    :
                                    <>
                                        <tr style={{ color: '#8e8e8e ' }} >
                                            <td style={{ width: '100%' }}>Adicione receitas</td>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                            <td ></td>
                                        </tr>
                                    </>
                                }
                            </tbody>
                        </Table>
                    </Col>
                </Row>

                <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
                    <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
                        <SubTitle style={{ marginTop: 0 }}>Cálculo custo da produção</SubTitle>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Alert severity="info">Nesta seção opcional é calculado o custo da produção.</Alert>

                        <Row className="align-items-start">
                            <Col>
                                <InputLabel color={errors.valorTotalReceitas ? 'error' : 'normal'}>Valor total receitas</InputLabel>
                                <Controller
                                    name="valorTotalReceitas"
                                    control={control}
                                    rules={{
                                        required: "Digite o valor total de receitas",
                                        onChange: handleCustoAndValorFinal
                                    }}
                                    render={({ ref, field }) =>
                                        <StyledNumericInput
                                            {...field}
                                            ref={ref}
                                            prefix={'R$ '}
                                            decimalScale={2}
                                            decimalSeparator={','}
                                            color={'normal'}
                                        />}
                                />
                                {/* automático*/}
                                {errors.valorTotalReceitas && <ErrorText>{errors.valorTotalReceitas.message}</ErrorText>}
                            </Col>
                            <Col>
                                <InputLabel>Horas trabalhadas</InputLabel>
                                <Controller
                                    name="horasTrab"
                                    control={control}
                                    rules={{
                                        required: "Digite as horas trabalhadas",
                                        onChange: (e) => handleHorasTrab(e.target.value) //console.log(moment.duration(e.target.value.replace('h', '')).asMinutes())//
                                    }}
                                    render={({ ref, field }) =>
                                        <StyledInputMask
                                            format="##:##h"
                                            {...field} ref={ref}
                                            color={errors.tempoPreparo ? 'error' : 'normal'}
                                        />}
                                />
                                {/* <InputForm type="text" color={'normal'} {...register("horasTrab")} /> */}
                                {/* automático*/}
                            </Col>
                            <Col>
                                <div style={{ display: 'flex', alignItems: "end", gap: 4 }}>
                                    <InputLabel style={{ width: 90 }}>Mão de obra</InputLabel>
                                    <PopoverStyled text="Valor da hora x tempo de preparo" />
                                </div>

                                <Controller
                                    name="maoDeObra"
                                    control={control}
                                    rules={{
                                        onChange: handleCustoAndValorFinal
                                    }}
                                    render={({ ref, field }) =>
                                        <StyledNumericInput
                                            {...field}
                                            ref={ref}
                                            prefix={'R$ '}
                                            decimalScale={2}
                                            decimalSeparator={','}
                                            color={'normal'}
                                        />}
                                />
                                {/* automático*/}
                            </Col>
                            <Col  >
                                <InputLabel>Valor embalagem</InputLabel>
                                <Controller
                                    name="valorEmbalagem"
                                    control={control}
                                    rules={{
                                        onChange: handleCustoAndValorFinal
                                    }}
                                    render={({ ref, field }) =>
                                        <StyledNumericInput
                                            {...field}
                                            ref={ref}
                                            prefix={'R$ '}
                                            decimalScale={2}
                                            decimalSeparator={','}
                                            color={'normal'}
                                        />}
                                />
                            </Col>

                            <Col xs={3} sm={2} md={2} lg={1} style={{ marginTop: '2rem' }}>
                                <Tooltip title='Recalcular peso e custo receitas'>
                                    <ActionButton onClick={handleResetButton}>
                                        {/* calculoCustoProducao */}
                                        <RefreshIcon />
                                    </ActionButton>
                                </Tooltip>
                            </Col>
                        </Row>
                        <Row className=" align-items-center justify-content-end mt-3">
                            <Col lg={4}>
                                <Typography fontSize={'1.20rem'} align="right">Total custo:</Typography>
                            </Col>

                            <Col lg={2}>
                                <Controller
                                    name="totalCustoProducao"
                                    control={control}
                                    rules={{
                                        onChange: calculoValorVenda
                                    }}
                                    render={({ ref, field }) =>
                                        <StyledNumericInput
                                            {...field}
                                            style={{ fontSize: '1rem' }}
                                            ref={ref}
                                            prefix={'R$ '}
                                            decimalScale={2}
                                            decimalSeparator={','}
                                            color={'normal'}
                                        />}
                                />
                                {/* automático, soma do custo das receitas 
                        (preço ingredientes + horas trabalhadas(deve pegar o tempo de preparo de cada receita+tempo de montar o doce?), 
                        vira preço de mão de obra + preço de embalagens
                         utilizadas+custos fixos(multiplica o total dos custos fixos por 3 e divide por 100))*/}
                            </Col>
                        </Row>
                    </AccordionDetails>
                </Accordion>

                {/* <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
                    <AccordionSummary aria-controls="panel2d-content" id="panel2d-header">
                        <SubTitle style={{ marginTop: 0 }}>Porções</SubTitle>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Row className="align-items-end">
                            <Col>
                                <InputLabel >Quantidade porções</InputLabel>
                                <Controller
                                    name="porcoes"
                                    control={control}
                                    render={({ ref, field }) =>
                                        <StyledNumericInput
                                            {...field} ref={ref}
                                            decimalScale={0}
                                            color={'normal'}
                                        />}
                                />
                            </Col>
                            <Col>
                                <InputLabel >Peso porção</InputLabel>
                                <Controller
                                    name="peso"
                                    control={control}
                                    rules={{
                                        required: "Digite o peso do doce",
                                    }}
                                    render={({ ref, field }) =>
                                        <StyledNumericInput
                                            {...field} ref={ref}
                                            suffix={' Kg'}
                                            decimalScale={3}
                                            decimalSeparator={','}
                                            color={'normal'}
                                        />}
                                />
                                calcula automaticamente de acordo com os pesos das receitas
                            </Col>

                            <Col>
                                <InputLabel >Valor porção</InputLabel>
                                <Controller
                                    name="valorPorcao"
                                    control={control}
                                    render={({ ref, field }) =>
                                        <StyledNumericInput
                                            {...field}
                                            ref={ref}
                                            prefix={'R$ '}
                                            decimalScale={2}
                                            decimalSeparator={','}
                                            color={'normal'}
                                        />}
                                />
                                automático divide o valor total em porcoes
                            </Col>
                        </Row>
                    </AccordionDetails>
                </Accordion> */}

                <Row className="mt-4">
                    <Col lg={3} md={3}>
                        <InputLabel>Peso final (g)</InputLabel>
                        <Controller
                            name="peso"
                            control={control}
                            // rules={
                            //     {
                            //         required: "Informe o peso do doce",
                            //     }
                            // }
                            render={({ ref, field }) =>
                                <StyledNumericInput
                                    {...field} ref={ref}
                                    // decimalScale={2}
                                    decimalSeparator=","
                                    color={errors.peso ? 'error' : 'normal'}
                                />}
                        />
                    </Col>
                    <Col lg={3} md={3}>
                        <InputLabel>Margem de lucro</InputLabel>
                        <Controller
                            name="margemLucro"
                            control={control}
                            rules={{
                                onChange: calculoValorVenda
                            }}
                            render={({ ref, field }) =>
                                <StyledNumericInput
                                    {...field} ref={ref}
                                    suffix={'%'}
                                    color={'normal'}
                                />}
                        />
                        {/* <p className="error">{errors.margemLucro?.message}</p> */}
                    </Col>
                    <Col className="d-flex align-items-end justify-content-end">
                        <Row className="align-items-center justify-content-end mt-3">
                            <Col>
                                <Typography fontSize={'1.20rem'} align="right">Valor venda:</Typography>
                            </Col>
                            <Col>
                                <Controller
                                    name="valorTotalComMargem"
                                    control={control}
                                    rules={
                                        {
                                            required: "Informe o valor do doce",
                                        }
                                    }
                                    render={({ ref, field }) =>
                                        <StyledNumericInput
                                            {...field} ref={ref}
                                            decimalScale={2}
                                            style={{ fontSize: '1rem' }}
                                            decimalSeparator=","
                                            prefix={'R$ '}
                                            color={errors.valorTotalComMargem ? 'error' : 'normal'}
                                        />}
                                />
                            </Col>

                        </Row>

                        {/* automático (soma o custo de produção com a multiplicação do custo pela divisão da margem por 100 )*/}
                    </Col>
                </Row>


                <Row className="align-items-center">
                    <Col>
                        <InputLabel >Anotações</InputLabel>
                        <TextArea color={'normal'} {...register("anotacoes")} />
                    </Col>

                    <Col className="d-flex align-items-center justify-content-end">
                        <InputLabel style={{ marginTop: 0, width: '45%' }}>Disponível para venda?</InputLabel>
                        <Controller
                            name="disponivel"
                            control={control}
                            render={({ ref, field, value }) =>
                                <StyledSwitch
                                    {...field} ref={ref}
                                    onChange={(e) => field.onChange(e.target.checked)}
                                    checked={field.value}
                                    inputProps={{ 'aria-label': 'controlled' }}
                                />
                            }
                        />

                    </Col>
                </Row>
                <Row className="justify-content-end mt-3">
                    <Col sm={4} md={3} lg={2}>
                        <Link href="/Admin/DocesCadastrados">
                            <CancelButton text={'Cancelar'} />
                        </Link>
                    </Col>
                    <Col sm={8} md={3} lg={2}>
                        <PrimaryButton
                            type={'submit'}
                            label={doce ? "Salvar" : "Cadastrar"}
                            disabled={isSubmitButtonDisabled}
                        />
                    </Col>
                </Row>
            </form>

        </Container >
    )
}

export const getServerSideProps = withSSRAuth(async (ctx) => {
    const api = setupAPIClient(ctx);

    const allReceitas = (await api.get('/receita')).data;
    const allCategorias = (await api.get('/categoria')).data;
    const dataHora = (await api.get(`/valorHora/${1}`)).data;

    const optionsCategoria = allCategorias.map(categoria => {
        return {
            value: categoria.id,
            label: categoria.nomeCategoria,
        }
    });

    const optionsReceita = allReceitas.map(receita => {
        return {
            label: receita.nome,
            value: receita.id
        }
    })

    if (ctx.query.id) {

        const doceBanco = await api.get(`/doce/${ctx.query.id}`);
        const data = doceBanco.data;

        console.log("data doce: ", data)

        const receitas = data.receitas.map(receita => {
            return {
                idReceita: receita.id,
                nome: receita.nome,
                custo: receita.custo,
                quantReceita: receita.Receitas_doce.quantReceita,
                unidadeDeMedida: receita.Receitas_doce.unidadeDeMedida,
            }
        });

        const doce = {
            ...data,
            receitas,
        }
        let placeholder = null;
        try {
            placeholder = (await getPlaiceholder(doce.imagemDoce)).base64;
        } catch (err) {
            console.log(err)
            placeholder = (await getPlaiceholder('https://e-traelasten.dk/wp-content/uploads/2016/12/safe_image.png')).base64;
        }

        return {
            props: {
                doce,
                optionsReceita,
                allReceitas,
                optionsCategoria,
                valorHora: dataHora.valorHora,
                imagePlaceholderUrl: placeholder,
            },
        }
    }


    const { base64 } = await getPlaiceholder('https://e-traelasten.dk/wp-content/uploads/2016/12/safe_image.png');

    return {
        props: {
            doce: null,
            optionsReceita,
            allReceitas,
            optionsCategoria,
            valorHora: dataHora.valorHora,
            imagePlaceholderUrl: base64,
        }
    }
}, {
    admin: true,
})

