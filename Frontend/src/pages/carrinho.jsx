import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { CardContent, Typography, FormControl, FormControlLabel, Radio, RadioGroup, Tooltip } from "@mui/material";
import { Box } from "@mui/system";
import PlaceIcon from '@mui/icons-material/Place';
import { Title } from "../components/Title";
import { ImageContainer, InputLabel, PinkLink, StyledCard, TabelaCarrinho, TextareaForm, ButtonRemove, ContainerEndereco, DivImage, ContainerImage } from "../styles/pages/Carrinho";
import { QuantityButton } from "../components/QuantityButton";
import { CancelButton } from "../components/CancelButton";
import Image from "next/future/image";
import { RadioButton } from "../components/RadioButton";
import ArrowOutwardIcon from '@mui/icons-material/ArrowOutward';
import { DatePicker } from "@mui/x-date-pickers";
import TextField from '@mui/material/TextField';
import { PrimaryButton } from "../components/PrimaryButton";
import Link from "next/link";
import carrinhoService from "../services/carrinho.service";
import CloseIcon from '@mui/icons-material/Close';
import { toast } from "react-toastify";
import { useCarrinho } from "../hooks/useCarrinho";
import { queryClient } from "../lib/queryClient";
import Spinner from "../components/Spinner";
import { useEnderecos } from "../hooks/useEnderecos";
import noImage from '../img/noImage.png';
import axios from "axios";
import { priceFormatter, revertPriceFormatter } from "../utils/formatter";
import emptyCart from "../img/Cart.svg"
import { useAuth } from "../hooks/useAuth";
import { useQuery } from "react-query";
import { Controller, useForm } from "react-hook-form";
import pedidoService from "../services/pedido.service";
import { ErrorText } from "../styles/components/FormComponents";
import Router from "next/router";
import { EnderecosRadio } from "../components/EnderecosRadio";
import StorefrontOutlinedIcon from '@mui/icons-material/StorefrontOutlined';
import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined';
import PaidOutlinedIcon from '@mui/icons-material/PaidOutlined';
import { withSSRAuth } from "../utils/withSSRAuth";
import { setupAPIClient } from "../lib/api";
// import env from "react-dotenv";

export default function Carrinho({ settings }) {
    const { user, isAuthenticated } = useAuth();

    const { data: itens, isLoading: loadingCarrinho, isFetching: fetchingCarrinho } = useCarrinho(user?.carrinho.id);
    const { data: enderecos, isLoading: loadingEnderecos, isFetching: fetchingEnderecos } = useEnderecos(user?.id);

    const loading = ((loadingCarrinho && fetchingCarrinho || !itens) || (loadingEnderecos && fetchingEnderecos || !enderecos));

    const [radio, setRadio] = useState("retirada"); //radioButton tipo entrega
    const [enderecoEntrega, setEnderecoEntrega] = useState(null); //id endereco
    const [itensLoading, setItensLoading] = useState(false);
    const [frete, setFrete] = useState(0);
    const [freteLoading, setFreteLoading] = useState(false);

    const { register, handleSubmit, setValue, getValues, control, formState, reset } = useForm({
        mode: "onChange",
        defaultValues: {
            dataEntrega: '',
            observacao: '',
        }
    });
    const { errors, isDirty, isValid } = formState;

    async function handleChangeQuantidade(id, quantidade) {
        try {
            setItensLoading(true);
            await carrinhoService.updateQuantidadeItem(user.carrinho.id, id, quantidade)
            queryClient.invalidateQueries('carrinho')
        } catch (err) {
            if (!!err.data.message) {
                toast.error(err.data.message);
            } else {
                toast.error('Erro!');
            }
            console.log(err)

        } finally {
            setItensLoading(false)
        }
    }

    const handleRadioChange = (event) => {
        setRadio(event.target.value);
        event.target.value === 'retirada' ? setFrete(0) : enderecoEntrega && handleEnderecoChange(enderecoEntrega)
    };

    const handleEnderecoChange = (id) => {
        setEnderecoEntrega(id);
        calculaFrete(id);
    };

    async function calculaFrete(id) {
        const key = 'AIzaSyD-HFZnI8zp4N_DOdff3O1uhmCIa_JWZDM';
        // const origem = 'R. Reinaldo Kuka - Aeroporto, Erechim,185';
        const origem = settings.enderecoOrigem;
        // const destino = enderecos.find(endereco => endereco.id === enderecoEntrega);
        const { rua, bairro, cidade, numero } = enderecos.find(endereco => endereco.id === id);

        setFreteLoading(true);
        const distancia = await axios.get(`https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/distancematrix/json?origins=${origem}&destinations=${rua + bairro + cidade + numero}&key=${key}`,
        )
            .then(res => {
                return (res.data.rows[0].elements[0].distance.value)
            }).catch(err => {
                console.log(err)
                toast.error("Erro ao calcular frete!")
                return 1
            }).finally(() => {

                setFreteLoading(false)
            })

        //preco da gasolina / pela media de km gasto por litro = valor por km
        const valorGasolina = settings.valorKm;
        const taxa = settings.taxaEntrega;
        const valorFrete = distancia * (valorGasolina / 8 / 1000) + taxa;

        setFrete(valorFrete);
    }

    const totalProdutos = itens?.reduce((acc, item) => {
        return acc + item.valorTotalItem
    }, 0);

    const totalPedido = totalProdutos + frete;


    async function handleRemoveItem(id) {
        setItensLoading(true)
        await carrinhoService.deleteItem(id)
            .then(() => {
                queryClient.invalidateQueries('carrinho');//invalidar o query para atualizar a tabela
            }).catch(err => {
                toast.error("Erro ao excluir item do carrinho!");
                console.log(err)
            }).finally(() => {
                setItensLoading(false)
            })
    }

    const onSubmit = data => {
        // console.log({ ...data, tipoEntrega: radio, idEnderecoEntrega: enderecoEntrega, valorEntrega: frete, valorFinal: totalPedido });
        const submit = () => {

            return pedidoService.create(user.id,
                {
                    ...data,
                    tipoEntrega: radio,
                    idEnderecoEntrega: enderecoEntrega,
                    valorEntrega: revertPriceFormatter(frete),
                    valorFinal: revertPriceFormatter(totalPedido),
                    pago: false,
                    status: 'pendente'
                }
            );
        }

        const res = toast.promise(
            submit,
            {
                pending: 'Enviando...',
                success: 'Pedido salvo com sucesso!',
                error: 'Ocorreu um erro ao salvar o pedido!'
            }
        )
        res.then((response) => {
            // reset({
            //     observacao: '',
            //     dataEntrega: '',
            // });
            // setEnderecoEntrega();
            //queryClient.invalidateQueries('carrinho');//invalidar o query para atualizar carrinho
            Router.push(`/pedidoFinalizado?id=${response.data.idPedido}`);
        }).catch((err) => {
            console.log(err);
        })
    }

    const isSubmitButtonDisabled = !isDirty || !isValid;

    return (
        <>
            <Container style={{ marginBottom: '2rem' }}>

                <Title title={'Carrinho'} />
                <Container style={{ display: 'flex', justifyContent: 'center' }}>
                    {/* card filtros */}
                    {
                        loading && !itens?.length > 0 ? <div style={{ display: 'flex', justifyContent: "center", alignItems: "center" }}>  <Spinner /></div>
                            :
                            itens?.length > 0 ?
                                <><StyledCard>
                                    <Box>
                                        <CardContent style={{ alignItems: 'start', textAlign: 'start' }}>

                                            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                                <Typography style={{ textAlign: 'start', p: 0, paddingLeft: 1, fontWeight: '600', fontSize: 17, marginTop: 5 }}>
                                                    Produtos
                                                </Typography>
                                                {itensLoading && <Spinner size={14} />}
                                            </div>


                                            <TabelaCarrinho>
                                                <thead>
                                                    <tr>
                                                        {/* <th></th> */}
                                                        <th></th>
                                                        <th>Nome</th>
                                                        <th>Valor</th>
                                                        <th style={{ textAlign: 'center' }}>Quantidade</th>
                                                        <th>Total</th>
                                                        <th></th>
                                                    </tr>
                                                </thead>

                                                <tbody>
                                                    {itens && itens.map((item, index) => (
                                                        <tr key={index}>
                                                            {/* {console.log(!!selectedProdutos.find(selected => item.id === selected.id))} */}
                                                            {/* <td>
                                                    <Checkbox
                                                        controller={() => handleSelectedProdutos(item.id, item.valorTotal)}
                                                        checked={!!selectedProdutos?.find(selected => item.id === selected.id)}
                                                    />
                                                </td> */}
                                                            <td>
                                                                <ImageContainer>
                                                                    <DivImage>
                                                                        <Image src={item.doce.imagemDoce ? item.doce.imagemDoce : noImage}
                                                                            fill
                                                                            sizes={100}
                                                                            alt={""}
                                                                            style={{ objectFit: 'cover' }} />
                                                                    </DivImage>
                                                                </ImageContainer>
                                                            </td>
                                                            <td>{item.doce.nomeDoce}</td>
                                                            <td>
                                                                {new Intl.NumberFormat('pt-BR', {
                                                                    style: 'currency',
                                                                    currency: 'BRL',
                                                                }).format(item.valorItem)}
                                                            </td>
                                                            <td>
                                                                <QuantityButton
                                                                    id={item.id}
                                                                    quantidade={item.quantidadeItem}
                                                                    handleChange={handleChangeQuantidade}
                                                                    disabled={itensLoading}
                                                                />
                                                            </td>
                                                            <td>
                                                                {new Intl.NumberFormat('pt-BR', {
                                                                    style: 'currency',
                                                                    currency: 'BRL',
                                                                }).format(item.valorTotalItem)}
                                                            </td>
                                                            <td>
                                                                <Tooltip title={'Remover'}>
                                                                    <ButtonRemove aria-label="Remove" type="button" onClick={() => handleRemoveItem(item.id)}>
                                                                        <CloseIcon fontSize='small' />
                                                                    </ButtonRemove>
                                                                </Tooltip>
                                                            </td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </TabelaCarrinho>


                                            <form onSubmit={handleSubmit(onSubmit)}>
                                                <div style={{ marginTop: 20, }}>
                                                    <Typography style={{ textAlign: 'start', fontWeight: '600' }}>
                                                        Tipo de entrega
                                                    </Typography>

                                                    <div style={{ paddingLeft: 10, paddingRight: 10 }}>
                                                        <FormControl style={{ marginBottom: '0.5rem' }}>
                                                            <RadioGroup
                                                                name="entrega"
                                                                value={radio}
                                                                onChange={handleRadioChange}
                                                            >
                                                                <div style={{ display: 'flex' }}>
                                                                    <RadioButton value={'retirada'} label={'Retirada'} />
                                                                    {/* icon={<StorefrontOutlinedIcon />} */}
                                                                    <RadioButton value={'entrega'} label={'Entrega'} />
                                                                    {/* icon={<LocalShippingOutlinedIcon />} */}
                                                                </div>
                                                            </RadioGroup>
                                                        </FormControl>

                                                        {radio === 'retirada' ?

                                                            <div>
                                                                <Typography variant="subtitle2" style={{ marginBottom: '0.3rem' }}>
                                                                    Você pode retirar o seu pedido neste endereço:
                                                                </Typography>
                                                                <div style={{ padding: '12px 20px', backgroundColor: '#ffebf8', borderRadius: 5, border: '2px solid', borderColor: '#FFF', }}>
                                                                    <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                                                                        <div style={{ display: 'flex', flexDirection: 'row' }}>
                                                                            <PlaceIcon sx={{ color: '#FF6AB9', marginRight: 1 }} />
                                                                            <Typography>{settings.enderecoOrigem}</Typography>
                                                                        </div>
                                                                        <div>
                                                                            <PinkLink href={`https://www.google.com/maps/search/?api=1&query=${settings.enderecoOrigem}`} target="_blank" rel="noopener noreferrer" className="linkPink">
                                                                                <Typography variant="subtitle2">
                                                                                    Ver no mapa <ArrowOutwardIcon fontSize="small" />
                                                                                </Typography>
                                                                            </PinkLink>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>

                                                            :

                                                            <>
                                                                <Typography variant="subtitle2" style={{ marginBottom: '0.3rem' }}>
                                                                    Escolha um endereço de entrega:
                                                                </Typography>
                                                                <EnderecosRadio
                                                                    enderecos={enderecos}
                                                                    enderecoSelected={enderecoEntrega}
                                                                    handleEnderecoChange={handleEnderecoChange}
                                                                    freteLoading={freteLoading}
                                                                />
                                                            </>
                                                        }
                                                    </div>
                                                </div>

                                                <div style={{ marginTop: 25 }}>
                                                    <div>
                                                        <Typography style={{ textAlign: 'start', fontWeight: '600', marginBottom: 5 }}>
                                                            Data e observação
                                                        </Typography>
                                                        <Row style={{ paddingLeft: 10, paddingRight: 10 }}>
                                                            <Col sm>
                                                                <Typography variant="subtitle2" className="mb-3">
                                                                    Para qual data você quer o pedido?
                                                                </Typography>
                                                                {/* <InputLabel >Data {value === 'retirada' ? 'retirada' : 'entrega'}</InputLabel> */}
                                                                <Controller
                                                                    name="dataEntrega"
                                                                    control={control}
                                                                    rules={{
                                                                        required: `Insira uma data de ${radio === 'retirada' ? 'retirada' : 'entrega'}`
                                                                    }}
                                                                    render={({ field: { ref, ...rest } }) =>
                                                                        <DatePicker
                                                                            label={`Data de ${radio === 'retirada' ? 'retirada' : 'entrega'}`}
                                                                            inputFormat="dd/MM/yyyy"
                                                                            // value={date}
                                                                            // onChange={handleChange}
                                                                            renderInput={(params) =>
                                                                                <TextField {...params} />}
                                                                            sx={{ color: '#f56bbe' }}
                                                                            {...rest}
                                                                        />
                                                                    }
                                                                />
                                                                {errors.dataEntrega && <ErrorText>{errors.dataEntrega.message}</ErrorText>}

                                                                {/* {...register("dataPedido", { onChange: (e) => disponibilidadeData(e) })} */}
                                                            </Col>
                                                            <Col sm>
                                                                <Typography variant="subtitle2" >
                                                                    Alguma observação para a confeiteira?
                                                                </Typography>
                                                                <InputLabel >Observação</InputLabel>
                                                                <TextareaForm type="text"
                                                                    {...register("observacao")} />
                                                            </Col>
                                                        </Row>
                                                    </div>
                                                </div>

                                                <Col style={{ display: 'flex', justifyContent: 'space-between', marginTop: 10 }}>
                                                    <Row style={{ width: 310 }}>
                                                        <Typography style={{ textAlign: 'start', fontWeight: '600', marginBottom: 5 }}>
                                                            Meio de pagamento
                                                        </Typography>
                                                        <div style={{ marginLeft: 10, padding: '12px 20px', backgroundColor: '#ffebf8', borderRadius: 5, border: '2px solid', borderColor: '#FFF', }}>
                                                            <div style={{ display: 'flex', flexDirection: 'row', }}>
                                                                <PaidOutlinedIcon sx={{ color: '#FF6AB9', marginRight: 1 }} />
                                                                <div>

                                                                    <Typography>Pagamento na entrega/retirada</Typography>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </Row>
                                                    <Row style={{ display: 'flex', flexDirection: "column", justifyContent: 'flex-end' }}>
                                                        <div style={{ display: 'flex', flexDirection: "row", alignItems: 'end', justifyContent: 'end' }}>
                                                            <Typography variant="subtitle2"
                                                                sx={{ marginRight: 1 }}>
                                                                Total produtos:
                                                            </Typography>
                                                            <Typography >
                                                                <b>{priceFormatter.format(totalProdutos)}</b>
                                                            </Typography>
                                                        </div>
                                                        <div style={{ display: 'flex', flexDirection: "row", alignContent: 'flex-end ', justifyContent: 'end', alignItems: 'end' }}>
                                                            <Typography variant="subtitle2"
                                                                sx={{ marginRight: 1 }}>
                                                                Taxa de entrega:
                                                            </Typography>
                                                            <Typography>
                                                                <b>{priceFormatter.format(frete)} </b>
                                                            </Typography>
                                                        </div>
                                                        <div style={{ display: 'flex', flexDirection: "row", justifyContent: 'end', alignItems: 'end' }}>
                                                            <Typography variant="subtitle2"
                                                                sx={{ marginRight: 1 }}>
                                                                Total pedido:
                                                            </Typography>
                                                            <Typography variant="h6">
                                                                <b>{priceFormatter.format(totalPedido)}</b>
                                                            </Typography>
                                                        </div>
                                                    </Row>
                                                </Col>

                                                <Row style={{ display: 'flex', flexDirection: "row", justifyContent: 'space-between', marginTop: '2rem' }}>
                                                    <Col sm={6} md={6} lg={4} >
                                                        {/* xs={{ order: 'last' }} */}
                                                        <Link href="/produtos"><CancelButton text="Adicionar mais produtos" /></Link>
                                                    </Col>
                                                    <Col sm={6} md={6} lg={4}>
                                                        <PrimaryButton label="Enviar pedido" disabled={isSubmitButtonDisabled} />
                                                        {/* Solicitar pedido pelo WhatsApp */}
                                                    </Col>
                                                </Row>

                                            </form>
                                        </CardContent>
                                    </Box>
                                </StyledCard>
                                </>

                                :

                                <>
                                    <ContainerImage>
                                        <Image src={emptyCart} alt='error' width={200} style={{ marginTop: '1rem', marginBottom: '4rem' }} />
                                        <Typography sx={{ fontSize: 23, marginBottom: '0.3rem' }}>Seu carrinho está vazio!</Typography>
                                        <Typography sx={{ fontSize: 15, marginBottom: '2rem' }}>Adicione produtos para continuar</Typography>
                                        <div style={{ width: 150, marginBottom: '1rem' }}>
                                            <Link href='/produtos' style={{ textDecoration: 'none' }}>
                                                <PrimaryButton label="Ir para produtos" />
                                            </Link>
                                        </div>
                                    </ContainerImage>
                                </>
                    }
                </Container>
            </Container>
        </>
    )
}

export const getServerSideProps = withSSRAuth(async (ctx) => {
    const api = setupAPIClient(ctx);
    const settings = await api.get('/settings/1').then(res => {
        return res.data;
    })

    return {
        props: {
            settings
        }
    }
})

// export const getServerSideProps = async () => { //{ query }
//     // if (query.id) {
//     const res = await carrinhoService.getCarrinho(1); //idCarrinho
//     const carrinho = res.data;
//     // console.log(carrinho)
//     return {
//         props: {
//             carrinho,
//         }

//     }
//     // }
//     // return {
//     //     props: {
//     //         doce: null,
//     //     }
//     // }
// }


  // const mokiItens = [
    //     { id: 1, titulo: 'Brigadeiro', imagem: 'brigadeiro.jpg', valor: 14.50, quantidade: 1, valorTotalItem: 14.50 },
    //     { id: 2, titulo: 'Bento', imagem: 'bento.jpg', valor: 10.90, quantidade: 2, valorTotalItem: 20.00 },
    //     { id: 3, titulo: 'Bolo', imagem: 'bolo.jpg', valor: 28.50, quantidade: 1, valorTotalItem: 28.50 },
    //     // { id: 4, titulo: 'Trufa', imagem: 'coracao.jpg', valor: 10.80, quantidade: 2, valorTotalItem: 21.60 },
    //     // { id: 5, titulo: 'Ovo de Páscoa', imagem: 'ovo.jpeg', valor: 34.50, quantidade: 1, valorTotalItem: 34.50 }
    // ]




       // console.log(selectedProdutos)

    // function handleSelectedProdutos(position) {
    //     const updatedBoxesChecked = boxesChecked.map((item, index) =>
    //         index === position ? !item : item
    //     );

    //     setBoxesChecked(updatedBoxesChecked);
    //     updatedBoxesChecked.map((item, index) => {
    //         if (item) {
    //             selectedProdutos.push(itens[index]);
    //         }

    //     });
    // }



     // const [selectedProdutos, setSelectedProdutos] = useState(
    //     itens?.map(item => {
    //         return {
    //             id: item.id,
    //             valorTotal: item.valorTotal
    //         }
    //     })
    // );
    // const [boxesChecked, setBoxesChecked] = useState(new Array(itens?.length).fill(false));
    // let selectedProdutos = itens?.map(item => {
    //     return {
    //         id: item.id,
    //         valorTotal: item.valorTotal
    //     }
    // });

    // function handleSelectedProdutos(id, valorTotal) {
    //     if (!!selectedProdutos?.find(item => item.id === id)) {
    //         setSelectedProdutos(selectedProdutos.filter(item => item.id !== id));
    //     } else {
    //         setSelectedProdutos(old => [...old, { id, valorTotal }])
    //     }
    // }
    // console.log('selected Produtos', selectedProdutos)

    // const DateTimeFormat = global.Intl.DateTimeFormat;