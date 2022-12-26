import { Col, Container, Row } from "react-bootstrap";
import { Title } from "../../components/Title";
import { CardPainel, ContainerIcon, NumberCard, SubtitleCard, TitleCards } from "../../styles/pages/Admin/Painel";
import { Avatar, Box, Divider, IconButton, Tooltip, Typography } from "@mui/material";
import { withSSRAuth } from "../../utils/withSSRAuth";
import { setupAPIClient } from "../../lib/api";
import { Controller, useForm } from "react-hook-form";
import ReactSelect from "react-select";
import { DatePicker } from "@mui/x-date-pickers";
import { InputForm, InputLabel } from "../../styles/components/FormComponents";
import FilterAltOffIcon from '@mui/icons-material/FilterAltOff';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import { useDocesPeriodo } from "../../hooks/useDocesPeriodo";
import Spinner from "../../components/Spinner";
import { useEffect } from "react";
import CardDocePeriodo from "../../components/CardDocePeriodo";
import { StyledCard } from "../../styles/components/CardDocePeriodo";
import CardReceitaPeriodo from "../../components/CardReceitaPeriodo";

export default function Relatorios({ }) {

    const StatusOptions = [
        { value: 'pendente', label: "Pendente" },
        { value: 'confirmado', label: "Confirmado" },
        { value: 'finalizado', label: "Finalizado" },
        { value: 'cancelado', label: "Cancelado" },
    ]

    const { control, watch, register, setValue, getValues, reset, formState } = useForm({
        mode: "onChange",
        defaultValues: {
            status: StatusOptions.find(a => a.value === 'confirmado'),
            dataInicio: null,
            dataFinal: null,
        }
    });
    const { errors, isDirty, isValid, isSubmitSuccessful } = formState;
    const watchAllFields = watch();

    const { data: doces, isLoading, error, isFetching, refetch } = useDocesPeriodo(watchAllFields?.status?.value, watchAllFields?.dataInicio, watchAllFields?.dataFinal);

    useEffect(() => {
        refetch();
    }, [
        watchAllFields?.dataInicio,
        watchAllFields?.dataFinal,
        watchAllFields?.status?.value,
    ])

    const disabledCleanFilter = !getValues('status') && !getValues('dataInicio') && !getValues('dataFinal');

    function cleanFilters() {
        reset({
            status: null,
            dataInicio: null,
            dataFinal: null
        })
    }

    return (
        <div style={{ backgroundColor: "#fee2f3c5", backgroundImage: 'linear-gradient(to right, #ffc2f288 , #fdededc5)', minHeight: '92vh', padding: '20px 0' }}>
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

                <StyledCard>
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                        <label style={{ fontWeight: 600, fontSize: 19, padding: 10, marginBottom: 5 }}>
                            Relatório quantidade de doces a fazer por período
                        </label>
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                        {/* <label>Quant.</label> */}
                        <Row style={{ width: 1200 }}>
                            {doces && doces.length > 0 ?
                                doces.map((item, index) => (
                                    <CardDocePeriodo key={index} item={item} />

                                ))

                                :
                                !isFetching && !isLoading ?
                                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                                        <p style={{ fontSize: 15, color: '#595959' }}>Nenhum doce encontrado</p>
                                    </div>
                                    :
                                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                                        <Spinner size={20} />
                                    </div>
                            }
                        </Row>
                    </div>
                </StyledCard>

                {/* <StyledCard>
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                        <label style={{ fontWeight: 600, fontSize: 19, padding: 10, marginBottom: 5 }}>
                            Relatório quantidade de receitas a fazer por período
                        </label>
                    </div>

                    <div style={{ display: 'flex' }}>
                    
                        <Row>
                            {doces && doces.length > 0 ?
                                doces.map((item, index) => (
                                    <CardReceitaPeriodo key={index} receitas={item.doce.receitas} quantidade={item.totalQuantity} />
                                ))

                                :
                                !isFetching && !isLoading ?
                                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                                        <p style={{ fontSize: 15, color: '#595959' }}>Nenhuma receita encontrada</p>
                                    </div>
                                    :
                                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                                        <Spinner size={20} />
                                    </div>
                            }
                        </Row>
                    </div>
                </StyledCard> */}
            </Container>
        </div>
    )
}

export const getServerSideProps = withSSRAuth(async (ctx) => {
    // const api = setupAPIClient(ctx);

    // const pendentes = (await api.get('/pedidos/status/?status=pendente')).data;

    return {
        props: {

        }
    }
}, {
    admin: true,
})
