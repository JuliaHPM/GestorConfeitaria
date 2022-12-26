import { Col, Container, Row } from "react-bootstrap";
import { Title } from "../../components/Title";
import { CardPainel, ContainerIcon, NumberCard, SubtitleCard, TitleCards } from "../../styles/pages/Admin/Painel";
import { Avatar, Divider, IconButton, Tooltip, Typography } from "@mui/material";
import DoneOutlinedIcon from '@mui/icons-material/DoneOutlined';
import HourglassEmptyOutlinedIcon from '@mui/icons-material/HourglassEmptyOutlined';
import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined';
import CardGiftcardOutlinedIcon from '@mui/icons-material/CardGiftcardOutlined';
import HourglassFullOutlinedIcon from '@mui/icons-material/HourglassFullOutlined';
import AccessTimeFilledOutlinedIcon from '@mui/icons-material/AccessTimeFilledOutlined';
import AccessTimeOutlinedIcon from '@mui/icons-material/AccessTimeOutlined';
import { withSSRAuth } from "../../utils/withSSRAuth";
import { setupAPIClient } from "../../lib/api";
import CloseIcon from '@mui/icons-material/Close';
import dynamic from 'next/dynamic';
import Link from "next/link";
import Router from "next/router";
import { useVendas } from "../../hooks/useVendas";
import { Controller, useForm } from "react-hook-form";
import { useEffect } from "react";
import { DatePicker } from "@mui/x-date-pickers";
import { Box } from "@mui/system";
import { InputForm } from "../../styles/pages/Admin/Painel";
import { InputLabel } from "../../styles/components/FormComponents";
import FilterAltOffIcon from '@mui/icons-material/FilterAltOff';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import { useState } from "react";
import { dateFormatter } from "../../utils/formatter";
import { format } from "date-fns";

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

export default function Painel({ maisVendidos, totalPedidos, topClientes }) {

    const { control, watch, register, setValue, getValues, reset, formState } = useForm({
        mode: "onChange",
        defaultValues: {
            dataInicio: null,
            dataFinal: null,
        }
    });

    const watchAllFields = watch();

    const { data, refetch } = useVendas(watchAllFields?.dataInicio, watchAllFields?.dataFinal);

    useEffect(() => {
        if (data && Object.keys(data).length > 0) {
            const newOptions = { ...options, xaxis: { categories: data?.datasGrafico } }
            setSeries(old => [{ ...old, data: data.quantidadePedidosGrafico }])
            setOptions(newOptions)
        }

    }, [data])

    const [series, setSeries] = useState([
        {
            name: "Vendas",
            data: []//
        }
    ]);
    const [options, setOptions] = useState({
        xaxis: {
            // type: 'datetime',
            categories: [],
            tickAmount: 10,
            // labels: {
            //     formatter: function (value) {
            //         return 'a'//format(new Date(value), 'MMM / dd')
            //     }
            // }
        },
        fill: {
            type: 'gradient',
            gradient: {
                shadeIntensity: 1,
                opacityFrom: 0.7,
                opacityTo: 0.9,
                stops: [0, 100]
            }
        },
        stroke: {
            curve: 'smooth'
        },
        tooltip: {
            y: {
                formatter: function (val) {
                    return val.toFixed(0);
                }
            }
        }
    });
    // console.log(options)
    function cleanFilters() {
        reset({
            dataInicio: null,
            dataFinal: null,
        })
    }

    const disabledCleanFilter = !getValues('dataFinal') && !getValues('dataInicio')

    useEffect(() => {
        refetch();
    }, [
        watchAllFields?.dataInicio,
        watchAllFields?.dataFinal,
    ])

    return (
        <div style={{ backgroundColor: "#fee2f3c5", backgroundImage: 'linear-gradient(to right, #ffc2f288 , #fdededc5)', minHeight: '100vh' }}>
            <Container>
                {/* <Title title='Painel' /> */}
                <Row style={{ marginBottom: '-10px' }}>
                    <Col lg={3}>

                        <CardPainel hover={true} onClick={() => Router.push("/Admin/pedidos?status=pendente")}>
                            <Avatar sx={{ backgroundColor: '#e6df2066', backgroundImage: 'linear-gradient(to right, #e8e10c91 , #f8f5a8de)', boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)', padding: 3, alignSelf: 'center', marginRight: '15px' }}>
                                {/* color='pendente' */}
                                <AccessTimeOutlinedIcon sx={{ color: 'white' }} />
                            </Avatar>
                            <div>
                                <NumberCard hover={true}>{totalPedidos.pendentes}</NumberCard>
                                <SubtitleCard hover={true}>pedidos pendentes</SubtitleCard>
                            </div>
                        </CardPainel>

                    </Col>
                    <Col lg={3}>
                        <CardPainel hover={true} onClick={() => Router.push("/Admin/pedidos?status=confirmado")}>
                            <Avatar sx={{ backgroundColor: '#8de62066', backgroundImage: 'linear-gradient(to right, #8de62066 , #d6f7ad66)', boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)', padding: 3, alignSelf: 'center', marginRight: '15px' }}>
                                {/* color='pendente' */}
                                <DoneOutlinedIcon sx={{ color: 'white' }} />
                            </Avatar>
                            <div>
                                <NumberCard hover={true}>{totalPedidos.confirmados}</NumberCard>
                                <SubtitleCard hover={true}>pedidos confirmados</SubtitleCard>
                            </div>
                        </CardPainel>
                    </Col>
                    <Col lg={3}>
                        <CardPainel hover={true} onClick={() => Router.push("/Admin/pedidos?status=finalizado")}>
                            <Avatar sx={{ backgroundColor: '#F7A0CE', backgroundImage: 'linear-gradient(to right, #F7A0CE , #fcc7e3)', boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)', padding: 3, alignSelf: 'center', marginRight: '15px' }}>
                                {/* color='pendente' */}
                                <CardGiftcardOutlinedIcon sx={{ color: 'white' }} />
                            </Avatar>
                            <div>
                                <NumberCard hover={true}>{totalPedidos.finalizados}</NumberCard>
                                <SubtitleCard hover={true}>pedidos finalizados</SubtitleCard>
                            </div>
                        </CardPainel>
                    </Col>
                    <Col lg={3}>
                        <CardPainel hover={true} onClick={() => Router.push("/Admin/pedidos?status=cancelado")}>
                            <Avatar sx={{ backgroundColor: '#fa5e2a', backgroundImage: 'linear-gradient(to right, #fa7f3d , #fdbc9a)', boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)', padding: 3, alignSelf: 'center', marginRight: '15px' }}>
                                {/* color='pendente' */}
                                <CloseIcon sx={{ color: 'white' }} />
                            </Avatar>
                            <div>
                                <NumberCard hover={true}>{totalPedidos.cancelados}</NumberCard>
                                <SubtitleCard hover={true}>pedidos cancelados</SubtitleCard>
                            </div>
                        </CardPainel>
                    </Col>
                </Row>
                <Row >
                    <Col lg={6}>
                        <CardPainel style={{ flexDirection: 'column', height: '500px' }}>
                            {/* style={{ display: 'flex', width: 600, height: 350 }} */}
                            <TitleCards>Vendas por período</TitleCards>
                            <form>
                                <Row style={{ justifyContent: 'start', padding: '0 15px' }}>
                                    <Col >
                                        <InputLabel>Data inicio</InputLabel>
                                        <Controller
                                            name="dataInicio"
                                            control={control}
                                            render={({ field: { ref, ...rest } }) =>
                                                <DatePicker
                                                    // {...field}
                                                    // label="Data Nascimento"
                                                    inputFormat="dd/MM/yyyy"
                                                    // value={value}
                                                    // onChange={(e) => field.onChange(parseInt(e.target.value))}
                                                    renderInput={({ inputRef, inputProps, InputProps }) => (
                                                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                                            <InputForm ref={inputRef} {...inputProps} color={'normal'} />
                                                            {InputProps?.endAdornment}
                                                        </Box>
                                                    )}
                                                    {...rest}
                                                />
                                            }
                                        />
                                    </Col>
                                    <Col >
                                        <InputLabel>Data final</InputLabel>
                                        <Controller
                                            name="dataFinal"
                                            control={control}
                                            render={({ field: { ref, ...rest } }) =>
                                                <DatePicker
                                                    // {...field}
                                                    // label="Data Nascimento"
                                                    inputFormat="dd/MM/yyyy"
                                                    // value={value}
                                                    // onChange={(e) => field.onChange(parseInt(e.target.value))}
                                                    renderInput={({ inputRef, inputProps, InputProps }) => (
                                                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                                            <InputForm ref={inputRef} {...inputProps} color={'normal'} />
                                                            {InputProps?.endAdornment}
                                                        </Box>
                                                    )}
                                                    {...rest}
                                                />
                                            }
                                        />
                                    </Col>
                                    <Col lg={1} style={{ display: 'flex', marginTop: 27, padding: 10 }}>
                                        <Tooltip title='Limpar filtro'>
                                            <IconButton color="primary" aria-label="clean filter" component="label" sx={{ margin: -1 }}
                                                disabled={disabledCleanFilter}
                                                onClick={cleanFilters}
                                            >
                                                {!disabledCleanFilter ?
                                                    <FilterAltOffIcon sx={{ color: '#FF6AB9' }} />
                                                    :
                                                    <FilterAltIcon />
                                                }
                                            </IconButton>
                                        </Tooltip>
                                    </Col>
                                </Row>
                            </form>

                            {/* <ChartLine /> */}

                            <div style={{ display: 'flex', justifyContent: 'center' }}>
                                <Chart type="line" series={series} options={options} style={{ width: 560 }} />
                            </div>
                        </CardPainel>
                    </Col>

                    <Col lg={3} >
                        <CardPainel style={{ flexDirection: 'column', height: '500px' }}>
                            {/* style={{ display: 'flex', width: 600, height: 350 }} */}
                            <TitleCards>Mais vendidos</TitleCards>
                            <div style={{ display: 'flex', flexDirection: 'column' }}>
                                {maisVendidos &&
                                    maisVendidos.map((produto, index) => (
                                        <div key={produto.id} style={{ marginTop: '10px' }}>
                                            <div style={{ display: 'flex', alignItems: "center", margin: '12px 10px' }}>
                                                <label style={{ marginRight: 15, color: 'gray' }}>{index + 1}</label>
                                                <Avatar sx={{ bgcolor: "#FFF", boxShadow: '0 5px 10px rgba(0, 0, 0, 0.2)', width: '50px', height: '50px' }} src={produto.imagem} />
                                                <div style={{ marginLeft: 10, display: "flex", flexDirection: 'column' }}>
                                                    <label style={{ fontSize: 17, fontWeight: 500, overflow: 'hidden', textOverflow: 'ellipsis', width: 140, whiteSpace: 'nowrap' }}>{produto.nome}</label>
                                                    <label style={{ fontSize: 15, fontWeight: 400, color: 'gray' }}>{produto.quantidade} vendidos</label>
                                                </div>
                                                {/* <label style={{ marginRight: 15, color: 'gray' }}>{produto.valor}</label> */}
                                            </div>
                                            {/* <Divider color="gray" style={{ width: '70%' }} /> */}
                                        </div>
                                    ))

                                }
                            </div>
                        </CardPainel>
                    </Col>
                    <Col lg={3}>
                        <CardPainel style={{ flexDirection: 'column', height: '500px' }}>
                            {/* style={{ display: 'flex', width: 600, height: 350 }} */}
                            <TitleCards>Top Clientes</TitleCards>
                            <div style={{ display: 'flex', flexDirection: 'column' }}>
                                {topClientes &&
                                    topClientes.map((cliente, index) => (
                                        <div key={cliente.id} style={{ marginTop: '10px' }}>
                                            <div style={{ display: 'flex', alignItems: "center", margin: '12px 10px' }}>
                                                <label style={{ marginRight: 15, color: 'gray' }}>{index + 1}</label>
                                                <Avatar sx={{ bgcolor: "#ffa9e1", boxShadow: '0 5px 10px rgba(0, 0, 0, 0.2)', width: '50px', height: '50px' }} src={cliente.fotoPerfil} />
                                                <div style={{ marginLeft: 10, display: "flex", flexDirection: 'column' }}>
                                                    <label style={{ fontSize: 17, fontWeight: 500, overflow: 'hidden', textOverflow: 'ellipsis', width: 140, whiteSpace: 'nowrap' }}>{cliente.nome}</label>
                                                    <label style={{ fontSize: 15, fontWeight: 400, color: 'gray' }}>{cliente.pedidosCount} pedidos</label>
                                                </div>
                                                {/* <label style={{ marginRight: 15, color: 'gray' }}>{produto.valor}</label> */}
                                            </div>
                                            {/* <Divider color="gray" style={{ width: '70%' }} /> */}
                                        </div>
                                    ))
                                }
                            </div>
                        </CardPainel>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export const getServerSideProps = withSSRAuth(async (ctx) => {
    const api = setupAPIClient(ctx);

    const pendentes = (await api.get('/pedidos/status/?status=pendente')).data;
    const confirmados = (await api.get('/pedidos/status/?status=confirmado')).data;
    const finalizados = (await api.get('/pedidos/status/?status=finalizado')).data;
    const cancelados = (await api.get('/pedidos/status/?status=cancelado')).data;
    const topClientes = (await api.get('/topClientes')).data;
    const vendasPeriodo = (await api.get('/vendasPeriodo')).data;
    const { data } = await api.get('/maisVendidos');
    //   const data = res.data;

    const maisVendidos = data.map(item => {
        return {
            quantidade: item.totalQuantity,
            id: item.doce.id,
            nome: item.doce.nomeDoce,
            peso: item.doce.peso,
            descricao: item.doce.descricao,
            valor: item.doce.valorTotalComMargem,
            imagem: item.doce.imagemDoce
        }
    })

    return {
        props: {
            maisVendidos,
            topClientes,
            totalPedidos: {
                pendentes,
                confirmados,
                finalizados,
                cancelados
            },
        }
    }
}, {
    admin: true,
})
