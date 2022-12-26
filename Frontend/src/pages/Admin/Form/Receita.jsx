/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { useForm, Controller } from 'react-hook-form';
import Select from 'react-select';
import { Container, Row, Col } from 'react-bootstrap';
import { Title } from "../../../components/Title";
import Link from "next/link";
import { InputForm, InputLabel, ErrorText, TextArea, StyledNumericInput, ColorButton, Table, ActionButton, StyledInputMask, SubTitle } from "../../../styles/components/FormComponents";
import { PrimaryButton } from "../../../components/PrimaryButton";
import { CancelButton } from "../../../components/CancelButton";
import { Tooltip, Typography } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import RefreshIcon from '@mui/icons-material/Refresh';
import receitaService from "../../../services/receita.service";
import { toast } from "react-toastify";
import ingredienteService from '../../../services/ingrediente.service';
import { queryClient } from '../../../lib/queryClient';
import ReactSelect from 'react-select';
import { Accordion, AccordionSummary, AccordionDetails, } from '../../../styles/pages/Admin/Form/Doce';
import { priceFormatter, revertPriceFormatter } from '../../../utils/formatter';
import { withSSRAuth } from '../../../utils/withSSRAuth';
import { setupAPIClient } from '../../../lib/api';

export default function CadastroReceita({ receita, optionsIngredientes, allIngredientes }) {

    const TipoReceitaOptions = [
        { value: "massa", label: "Massa" },
        { value: "recheio", label: "Recheio" },
        { value: "cobertura", label: "Cobertura" },
        { value: "outro", label: "Outro" },
    ]

    const { handleSubmit, control, register, setValue, getValues, reset, formState } = useForm({
        mode: "onChange",
        defaultValues: {
            nome: receita && receita.nome,
            tipoReceita: receita ? TipoReceitaOptions.find(a => a.value === receita.tipoReceita) : null,
            tempoPreparo: receita && receita.tempoPreparo,
            rendimento: receita && receita.rendimento,
            custo: receita && receita.custo,
            anotacoes: receita && receita.anotacoes,
            modoPreparo: receita && receita.modoPreparo
        }
    });
    const { errors, isDirty, isValid, isSubmitSuccessful } = formState;

    const onSubmit = data => {
        console.log({ ...data, ingredientes: ingredientesReceita });
        const submit = () => {
            if (!receita) {
                return receitaService.create(
                    {
                        ...data,
                        tipoReceita: data.tipoReceita.value, //valor do array selecionado no select
                        ingredientes: ingredientesReceita,
                        //  data.custo.toFixed(2),
                        custo: revertPriceFormatter(data.custo),
                        unidadeDeMedida: "g/mL"
                    }
                );
            } else {
                return receitaService.update(receita.id,
                    {
                        ...data,
                        tipoReceita: data.tipoReceita.value,
                        ingredientes: ingredientesReceita,
                        // custo: data.custo.toFixed(2),
                        custo: revertPriceFormatter(data.custo),
                        unidadeDeMedida: "g/mL"
                    })
            }
        }

        const res = toast.promise(
            submit,
            {
                pending: 'Enviando...',
                success: 'Receita salva com sucesso!',
                error: 'Ocorreu um erro ao salvar a receita!'
            }
        )
        res.then(() => {
            if (receita) {
                reset({}, {
                    keepValues: true,
                });
            } else {
                reset({
                    nome: '',
                    tipoReceita: '',
                    tempoPreparo: '',
                    rendimento: '',
                    custo: '',
                    anotacoes: '',
                    modoPreparo: '',

                });
                setIngredientesReceita([])
            }
            queryClient.invalidateQueries('receitas');//invalidar o query 'receitas' para atualizar a tabela
            setIngredientesReceitaChanged(false); //desabilitar botao salvar
        }).catch((err) => {
            console.log(err);
        })
    }

    const MedidasIngredienteOptions = [
        { label: 'g / mL', value: 'g/mL' },
        { label: 'Kg / L', value: 'Kg/L' }
    ]
    const [selectedIngrediente, setSelectedIngrediente] = useState();
    const [selectedMedidaIngrediente, setSelectedMedidaIngrediente] = useState(MedidasIngredienteOptions[0]);
    const [quantidadeIngrediente, setQuantidadeIngrediente] = useState('');

    function handleSelectedIngrediente(selectedOption) {
        setSelectedIngrediente(selectedOption);
    }
    function handleSelectedMedidaIngrediente(selectedOption) {
        setSelectedMedidaIngrediente(selectedOption);
    }
    function handleQuantidadeIngrediente(e) {
        setQuantidadeIngrediente(e.target.value);
    }
    const isButtonAddIngredienteDisabled = selectedIngrediente && quantidadeIngrediente !== '' ? false : true;
    const [ingredientesReceita, setIngredientesReceita] = useState(receita ? receita.ingredientes : []);
    const [ingredientesReceitaChanged, setIngredientesReceitaChanged] = useState(false);

    function handleAddIngredientesReceita() {
        if (ingredientesReceita.length !== 0 && ingredientesReceita.find(ingrediente => ingrediente.idIngrediente === selectedIngrediente.value)) {
            toast.warn('Esse ingrediente já foi adicionado!');
        } else {
            let valorIngrediente = 0;

            const ingredienteBanco = allIngredientes.find(ingrediente =>  //pegar os dados do ingrediente que tem o id
                ingrediente.id === selectedIngrediente.value
            )

            if (selectedMedidaIngrediente.value === "Kg/L") {
                valorIngrediente = quantidadeIngrediente * ingredienteBanco.precoKg;
            } else {
                valorIngrediente = quantidadeIngrediente / 1000 * ingredienteBanco.precoKg;
            }

            const ingredienteReceita = {
                idIngrediente: selectedIngrediente.value,
                nome: ingredienteBanco.nome,
                marca: ingredienteBanco.marca,
                quantIngrediente: quantidadeIngrediente,
                unidadeDeMedida: selectedMedidaIngrediente.value,
                valor: valorIngrediente
            }
            setSelectedIngrediente(null);
            setQuantidadeIngrediente('');
            setIngredientesReceita(old => [...old, ingredienteReceita]);
            setIngredientesReceitaChanged(true);
        }
    }

    function handleDeleteIngredienteReceita(id) {
        setIngredientesReceita(ingredientesReceita.filter(ingrediente => ingrediente.idIngrediente !== id));
        setIngredientesReceitaChanged(true);
    }

    function calculoValorIngredientes() {//chama uma vez para calcular os valores da tabela quando for editar o doce
        const newIngredientes = ingredientesReceita.map(ingredienteReceita => {
            let valorIngrediente = 0;

            const ingredienteBanco = allIngredientes.find(ingrediente =>  //pegar os dados do ingrediente que tem o id
                ingrediente.id === ingredienteReceita.idIngrediente
            )

            if (ingredienteReceita.unidadeDeMedida === "Kg/L") {
                valorIngrediente = ingredienteReceita.quantIngrediente * ingredienteBanco.precoKg;
            } else {
                valorIngrediente = ingredienteReceita.quantIngrediente / 1000 * ingredienteBanco.precoKg;
            }

            return {
                ...ingredienteReceita,
                valor: valorIngrediente
            }
        })

        setIngredientesReceita(newIngredientes);
    }

    function calculoCustoAndRendimento() {
        var custo = 0; //= (getValues("custo") !== '' ? parseFloat(getValues("custo")) : 0);
        var rendimento = 0; //= (getValues("rendimento") !== '' ? parseFloat(getValues("rendimento")) : 0)

        ingredientesReceita.map(ingredienteReceita => {
            if (ingredienteReceita.unidadeDeMedida === "Kg/L") {
                rendimento = (rendimento + (parseFloat(ingredienteReceita.quantIngrediente) * 1000));
            } else {
                rendimento = (rendimento + parseFloat(ingredienteReceita.quantIngrediente));
            }
            custo = (custo + ingredienteReceita.valor); //.toFixed(2)
        })

        setValue('rendimento', rendimento)
        setValue('custo', custo)
    }

    const [expanded, setExpanded] = useState(true);

    function handleChange() {
        setExpanded(old => !old);
    };

    const isSubmitButtonDisabled = (!ingredientesReceitaChanged && !isDirty) || (!isValid && isDirty);
    // console.log({ isDirty, isValid, isSubmitButtonDisabled })

    useEffect(() => {
        if (ingredientesReceitaChanged) //so calcular automaticamente quando estiver cadastrando a receita
            calculoCustoAndRendimento();
    }, [ingredientesReceita])

    useEffect(() => { //calcular o valor dos ingredientes quando for editar a receita
        if (receita) {
            calculoValorIngredientes()
        }
    }, [])

    return (
        <Container style={{ maxWidth: '60%', marginBottom: '2rem' }}>
            <Title title="Cadastro Receita" />
            <form onSubmit={handleSubmit(onSubmit)}>

                <Row>
                    <Col sm>
                        <InputLabel color={errors.nome ? 'error' : 'normal'}>Receita</InputLabel>
                        <InputForm color={errors.nome ? 'error' : 'normal'} type="text"
                            {...register("nome",
                                { required: "Digite o nome da receita" })
                            }
                        />
                        {errors.nome && <ErrorText>{errors.nome.message}</ErrorText>}
                    </Col>
                    <Col sm>
                        <InputLabel color={errors.tipoReceita ? 'error' : 'normal'}>Tipo receita</InputLabel>
                        <Controller
                            name="tipoReceita"
                            control={control}
                            // rules={{
                            //     required: "Digite o tipo da receita"
                            // }}
                            render={({ field }) =>
                                <ReactSelect
                                    {...field}
                                    instanceId={'tipoReceita'}
                                    options={TipoReceitaOptions}
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
                        {/* {errors.tipoReceita && <ErrorText>{errors.tipoReceita.message}</ErrorText>} */}
                    </Col>
                </Row>

                <Accordion expanded={expanded} onChange={handleChange}>
                    <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
                        <SubTitle style={{ marginTop: 0 }}>Ingredientes</SubTitle>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Row>
                            <Col lg={6}>
                                <InputLabel>Ingrediente</InputLabel>

                                <Select
                                    instanceId="ingredientes"
                                    onChange={handleSelectedIngrediente}
                                    value={selectedIngrediente}
                                    options={optionsIngredientes}
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
                                    onChange={handleQuantidadeIngrediente}
                                    value={quantidadeIngrediente}
                                />
                            </Col>
                            <Col>
                                <InputLabel>Medida</InputLabel>

                                <Select
                                    instanceId="medidaIngrediente"
                                    onChange={handleSelectedMedidaIngrediente}
                                    value={selectedMedidaIngrediente}
                                    options={MedidasIngredienteOptions}
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
                                                onClick={handleAddIngredientesReceita}
                                                disabled={isButtonAddIngredienteDisabled}>
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
                                            <th style={{ width: '30%' }}>Marca</th>
                                            <th style={{ width: '25%' }}>Quantidade</th>
                                            <th style={{ width: '25%' }}>Valor</th>
                                            <th style={{ width: '5%' }}></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {ingredientesReceita.length > 0 ?
                                            ingredientesReceita.map(ingrediente => (
                                                <tr key={ingrediente.idIngrediente}>
                                                    <td>{ingrediente.nome}</td>
                                                    <td>{ingrediente.marca}</td>
                                                    <td>{ingrediente.quantIngrediente + " " + ingrediente.unidadeDeMedida}</td>
                                                    <td>{priceFormatter.format(String(ingrediente.valor))}</td>
                                                    <td> <Tooltip title='Excluir'>
                                                        <ActionButton onClick={() => handleDeleteIngredienteReceita(ingrediente.idIngrediente)}>
                                                            <DeleteIcon />
                                                        </ActionButton>
                                                    </Tooltip></td>

                                                </tr>
                                            ))
                                            :
                                            <>
                                                <tr style={{ color: '#8e8e8e ' }}>
                                                    <td style={{ width: '100%' }}>Adicione ingredientes</td>
                                                    <td ></td>
                                                    <td ></td>
                                                    <td ></td>
                                                    <td ></td>
                                                </tr>
                                            </>
                                        }
                                    </tbody>
                                </Table>
                            </Col>
                        </Row>
                    </AccordionDetails>
                </Accordion>
                <Row className='align-items-end'>
                    <Col sm>
                        <InputLabel color={errors.tempoPreparo ? 'error' : 'normal'}>Tempo preparo</InputLabel>
                        <Controller
                            name="tempoPreparo"
                            control={control}
                            rules={{
                                required: "Informe o tempo de preparo",
                            }}
                            render={({ ref, field }) =>
                                <StyledInputMask
                                    format="##:##h"
                                    {...field} ref={ref}
                                    color={errors.tempoPreparo ? 'error' : 'normal'}
                                />}
                        />
                        {errors.tempoPreparo && <ErrorText>{errors.tempoPreparo.message}</ErrorText>}
                    </Col>
                    <Col sm xs={6}>
                        <InputLabel color={errors.rendimento ? 'error' : 'normal'}>Rendimento receita (g/mL)</InputLabel>
                        <Controller
                            name="rendimento"
                            control={control}
                            rules={{ required: "Informe o rendimento" }}
                            render={({ ref, field }) =>
                                <StyledNumericInput
                                    {...field} ref={ref}
                                    decimalScale={2}
                                    decimalSeparator=","
                                    color={errors.rendimento ? 'error' : 'normal'}
                                />}
                        />
                        {errors.rendimento && <ErrorText>{errors.rendimento.message}</ErrorText>}
                    </Col>
                    <Col>
                        <InputLabel color={errors.custo ? 'error' : 'normal'}>Custo de ingredientes</InputLabel>
                        <Controller
                            name="custo"
                            control={control}
                            rules={{ required: "Informe o custo da receita" }}
                            render={({ ref, field }) =>
                                <StyledNumericInput
                                    {...field} ref={ref}
                                    decimalScale={2}
                                    decimalSeparator=","
                                    prefix={'R$ '}
                                    color={errors.custo ? 'error' : 'normal'}
                                />}
                        />
                        {errors.custo && <ErrorText>{errors.custo.message}</ErrorText>}
                    </Col>
                    <Col xs={3} sm={2} md={2} lg={1} style={{ marginTop: '1rem' }}>
                        <Tooltip title='Recalcular rendimento e custo'>
                            <ActionButton onClick={calculoCustoAndRendimento}>
                                <RefreshIcon />
                            </ActionButton>
                        </Tooltip>
                    </Col>
                </Row>
                <Row>
                    <Col sm>
                        <InputLabel>Modo de preparo</InputLabel>
                        <TextArea size='lg' color='normal' type="text"
                            {...register("modoPreparo")}
                        />
                    </Col>
                    <Col sm>
                        <InputLabel>Anotações</InputLabel>
                        <TextArea size='lg' color='normal' type="text"
                            {...register("anotacoes")}
                        />
                    </Col>
                </Row>
                <Row style={{ display: 'flex', justifyContent: 'end', marginTop: '1rem' }} >
                    {/* className="justify-content-between" */}
                    <Col sm={4} md={3} lg={2}>
                        <Link href="/Admin/ReceitasCadastradas">
                            <CancelButton text={'Cancelar'} />
                        </Link>
                    </Col>
                    <Col sm={8} md={3} lg={2}>
                        <PrimaryButton
                            label={receita ? "Salvar" : "Cadastrar"}
                            disabled={isSubmitButtonDisabled} />
                    </Col>
                </Row>
                {!receita &&
                    <Row style={{ display: 'flex', justifyContent: 'end', marginTop: '1rem' }}>
                        <Col sm={8} md={6} lg={4}>
                            <Typography style={{ fontSize: 12, color: '#575757' }}>Já adicionou todas as receitas?
                                <Link href='/Admin/Form/Doce' style={{ fontWeight: 600, textDecoration: 'none', color: '#505050', paddingLeft: '0.5px' }}>
                                    Ir para doce
                                </Link>
                            </Typography>
                        </Col>
                    </Row>
                }
            </form>
        </Container>

    )
}

export const getServerSideProps = withSSRAuth(async (ctx) => {
    const api = setupAPIClient(ctx);
    const allIngredientes = (await api.get('/ingredientes')).data;

    const optionsIngredientes = allIngredientes.map(ingrediente => {
        return {
            label: ingrediente.nome + " | " + ingrediente.marca,
            value: ingrediente.id
        }
    })

    if (ctx.query.id) {
        try {
            const res = await api.get(`/receita/${ctx.query.id}`);
            const data = res.data;

            const ingredientes = data.ingredientes.map(ingrediente => {
                return {
                    nome: ingrediente.nome,
                    marca: ingrediente.marca,
                    idIngrediente: ingrediente.id,
                    quantIngrediente: ingrediente.Ingredientes_receita.quantIngrediente,
                    unidadeDeMedida: ingrediente.Ingredientes_receita.unidadeDeMedida,
                }
            });

            const receita = {
                ...data,
                ingredientes,
            }

            return {
                props: {
                    receita,
                    optionsIngredientes,
                    allIngredientes
                },

            }
        } catch (err) {
            if (err.response.status === 404) {
                return {
                    redirect: {
                        destination: '/404',
                        permanent: false,
                    }
                }
            }
        }
    }





    return {
        props: {
            receita: null,
            optionsIngredientes,
            allIngredientes
        }
    }
}, {
    admin: true,
})