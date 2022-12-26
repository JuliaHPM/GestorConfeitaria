
import { IconButton, Tooltip, Typography } from "@mui/material";
import { convertLength } from "@mui/material/styles/cssUtils";
import { useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { Controller, useForm } from "react-hook-form";
import ReactSelect from "react-select";
import CardPedidoAdm from "../../components/CardPedidoAdm";
import { Title } from "../../components/Title";
import { usePedidos } from "../../hooks/usePedidos";
import { InputForm, InputLabel } from "../../styles/components/FormComponents";
import FilterAltOffIcon from '@mui/icons-material/FilterAltOff';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import { DatePicker } from "@mui/x-date-pickers";
import { Box } from "@mui/system";
import { withSSRAuth } from "../../utils/withSSRAuth";
import { CardPainel } from "../../styles/pages/Admin/Painel";
import Spinner from "../../components/Spinner";
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import { useState } from "react";

export default function Pedidos({ status }) {

    const [ordem, setOrdem] = useState('DESC');

    const StatusOptions = [
        { value: 'pendente', label: "Pendente" },
        { value: 'confirmado', label: "Confirmado" },
        { value: 'finalizado', label: "Finalizado" },
        { value: 'cancelado', label: "Cancelado" },
    ]

    const PagoOptions = [
        { value: 'true', label: "Realizado" },
        { value: 'false', label: "Pendente" }
    ]

    const TipoEntregaOptions = [
        { value: 'retirada', label: "Retirada" },
        { value: 'delivery', label: "Entrega" }
    ]

    const OrdemOptions = [
        { value: 'dataEntrega', label: "Data Entrega" },
        { value: 'id', label: "ID Pedido" },
        { value: 'status', label: "Status" }
    ]

    const { control, watch, register, setValue, getValues, reset, formState } = useForm({
        mode: "onChange",
        defaultValues: {
            status: status ? StatusOptions.find(a => a.value === status) : null,
            pago: null,
            tipoEntrega: null,
            nomeCliente: null,
            dataInicio: null,
            dataFinal: null,
            campoOrdem: OrdemOptions.find(a => a.value === 'dataEntrega'),
        }
    });
    const { errors, isDirty, isValid, isSubmitSuccessful } = formState;
    const watchAllFields = watch();

    const { data: pedidos, isLoading, error, isFetching, refetch } = usePedidos('', watchAllFields?.nomeCliente, watchAllFields?.status?.value, watchAllFields?.pago?.value, watchAllFields?.tipoEntrega?.value, watchAllFields?.dataInicio, watchAllFields?.dataFinal, watchAllFields?.campoOrdem?.value, ordem); //idPedido, nomeCliente, status, pago, tipoEntrega, dataInicio, dataFinal

    function toggleOrdem() {
        setOrdem(old => old === 'ASC' ? 'DESC' : 'ASC')
    }

    useEffect(() => {
        refetch();
    }, [
        watchAllFields?.pago?.value,
        watchAllFields?.tipoEntrega?.value,
        watchAllFields?.nomeCliente,
        watchAllFields?.dataInicio,
        watchAllFields?.dataFinal,
        watchAllFields?.status?.value,
        watchAllFields?.campoOrdem?.value,
        ordem
    ])

    const disabledCleanFilter = !getValues('status') && !getValues('pago') && !getValues('nomeCliente') && !getValues('tipoEntrega') && !getValues('dataInicio') && !getValues('dataFinal') && getValues('campoOrdem').value === 'dataEntrega' && ordem === "DESC";

    function cleanFilters() {
        reset({
            status: null,
            pago: null,
            tipoEntrega: null,
            nomeCliente: null,
            dataInicio: null,
            dataFinal: null,
            campoOrdem: OrdemOptions.find(a => a.value === 'dataEntrega')
        })
        setOrdem('DESC')
    }

    return (
        <div style={{ backgroundColor: "#fee2f3c5", backgroundImage: 'linear-gradient(to right, #ffc2f288 , #fdededc5)', minHeight: '100vh', padding: '20px 0' }}>
            <Container>
                <form >
                    <CardPainel>
                        <Row>
                            <Col >
                                <InputLabel color={'normal'}>Status</InputLabel>
                                <Controller
                                    name="status"
                                    control={control}
                                    render={({ field }) =>
                                        <ReactSelect
                                            {...field}
                                            instanceId={'status'}
                                            options={StatusOptions}
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
                            </Col>
                            <Col >
                                <InputLabel color={'normal'}>Pagamento</InputLabel>
                                <Controller
                                    name="pago"
                                    control={control}
                                    render={({ field }) =>
                                        <ReactSelect
                                            {...field}
                                            instanceId={'pago'}
                                            options={PagoOptions}
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
                            </Col>
                            <Col >
                                <InputLabel color={'normal'}>Tipo de entrega</InputLabel>
                                <Controller
                                    name="tipoEntrega"
                                    control={control}
                                    render={({ field }) =>
                                        <ReactSelect
                                            {...field}
                                            instanceId={'tipoEntrega'}
                                            options={TipoEntregaOptions}
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
                            </Col>
                            <Col >
                                <InputLabel color={'normal'}>Nome Cliente</InputLabel>
                                <InputForm color={'normal'} type="text"
                                    {...register("nomeCliente")}
                                />
                            </Col>
                            <Col >
                                <InputLabel color={'normal'}>Data entrega - inicio</InputLabel>
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
                                <InputLabel color={'normal'}>Data entrega - final</InputLabel>
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
                            <Col lg={2}> <div style={{ display: 'flex', alignItems: 'end' }}>
                                <InputLabel color={'normal'} style={{ width: '30%' }}>
                                    Ordem
                                </InputLabel>
                                <IconButton style={{ margin: '-5px' }} onClick={toggleOrdem}>
                                    {ordem === 'ASC' ?
                                        <ArrowUpwardIcon style={{ fontSize: 16 }} />
                                        :
                                        <ArrowDownwardIcon style={{ fontSize: 16 }} />
                                    }

                                </IconButton></div>
                                <Controller
                                    name="campoOrdem"
                                    control={control}
                                    render={({ field }) =>
                                        <ReactSelect
                                            {...field}
                                            instanceId={'campoOrdem'}
                                            options={OrdemOptions}
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
                    </CardPainel>
                </form>

                <Row style={{ transition: '.2s all', transitionTimingFunction: 'ease-in-out', }}>

                    {pedidos && pedidos.length > 0 ?
                        <>
                            <Typography style={{ marginLeft: 20, marginTop: '-5px', fontSize: 15, color: '#505050' }}>
                                {pedidos.length} pedidos
                            </Typography>
                            {pedidos.map(pedido => (
                                <Col key={pedido.id} lg={6}>
                                    <CardPedidoAdm pedido={pedido} />
                                </Col>
                            ))}
                        </>
                        :
                        !isFetching && !isLoading ?
                            <div style={{ display: 'flex', justifyContent: 'center' }}>
                                <p style={{ fontSize: 15, color: '#595959' }}>Nenhum pedido encontrado</p>
                            </div>
                            :
                            <div style={{ display: 'flex', justifyContent: 'center' }}>
                                <Spinner size={20} />
                            </div>

                    }
                </Row>
                {/* } */}
            </Container>

        </div>
    )
}

export const getServerSideProps = withSSRAuth(async (ctx) => {
    // const api = setupAPIClient(ctx);
    // const pendentes = (await api.get('/pedidos/status/?status=pendente')).data;

    const status = ctx.query.status;

    return {
        props: {
            status: status ? status : null
        }
    }
}, {
    admin: true,
})
