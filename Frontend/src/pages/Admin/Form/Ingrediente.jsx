import React, { useEffect } from "react";
import { Controller, useForm } from 'react-hook-form';
import { Container, Row, Col } from 'react-bootstrap';
import ingredienteService from "../../../services/ingrediente.service";
import { ErrorText, InputForm, InputLabel, StyledNumericInput } from "../../../styles/components/FormComponents";
import Link from "next/link";
import { CancelButton } from "../../../components/CancelButton";
import { PrimaryButton } from "../../../components/PrimaryButton";
import { Title } from "../../../components/Title";
import ReactSelect from "react-select";
import { priceFormatter, revertPriceFormatter } from "../../../utils/formatter";
import { toast } from 'react-toastify';
import { queryClient } from '../../../lib/queryClient';
import { withSSRAuth } from '../../../utils/withSSRAuth';
import { setupAPIClient } from "../../../lib/api";
import { Typography } from "@mui/material";

export default function Ingrediente({ ingrediente }) {
    const UnidadeMedidasOptions = [
        { value: "Kg/L", label: "Kg / L" },
        { value: "g/mL", label: "g / mL" },
    ]

    const { register, handleSubmit, setValue, getValues, formState, control, reset } = useForm({
        mode: "onChange",
        defaultValues: {
            nome: ingrediente && ingrediente.nome,
            marca: ingrediente && ingrediente.marca,
            quantEmb: ingrediente && ingrediente.quantEmb,
            precoUnit: ingrediente && ingrediente.precoUnit,
            precoKg: ingrediente && ingrediente.precoKg,
            unidadeDeMedida: ingrediente ? UnidadeMedidasOptions.find(a => a.value === ingrediente.unidadeDeMedida) : UnidadeMedidasOptions[1],
        }
    });
    const { errors, isDirty, isValid } = formState;

    const onSubmit = data => {
        const submit = () => {
            if (!ingrediente) {
                return ingredienteService.create(
                    {
                        ...data,
                        unidadeDeMedida: data.unidadeDeMedida.value,
                        precoUnit: revertPriceFormatter(data.precoUnit)
                    }
                );
            } else {
                return ingredienteService.update(ingrediente.id,
                    {
                        ...data,
                        unidadeDeMedida: data.unidadeDeMedida.value,
                        precoUnit: typeof data.precoUnit === "number" ? data.precoUnit : revertPriceFormatter(data.precoUnit)
                    })
            }
        }

        const res = toast.promise(
            submit,
            {
                pending: 'Enviando ...',
                success: 'Ingrediente salvo com sucesso!',
                error: {
                    render({ data }) {
                        return `${data.response.data.message}`
                    }
                }
            }
        )
        res.then(() => {
            if (ingrediente) {
                reset({}, {
                    keepValues: true,
                });
            } else {
                reset({
                    quantEmb: '',
                    precoUnit: '',
                    precoKg: '',
                    nome: '',
                    marca: '',
                });
            }
            queryClient.invalidateQueries('ingredientes');//invalidar o query para atualizar a tabela
        }).catch((err) => {
            console.log(err);
        })
    }

    function calculoPrecoKg() {
        if (getValues("precoUnit") && getValues("quantEmb") && getValues("unidadeDeMedida")) {
            const precoUnit = revertPriceFormatter(getValues("precoUnit"));
            //  revertPriceFormatter(getValues("precoUnit"));
            //const precoUnitString = precoUnit?;
            const quantEmb = getValues("quantEmb");
            const unidadeDeMedida = getValues("unidadeDeMedida")?.value;

            if (unidadeDeMedida === "g/mL") {
                var precoKg = (precoUnit / parseFloat(quantEmb) * 1000).toFixed(2);
            } else {
                precoKg = (precoUnit / parseFloat(quantEmb)).toFixed(2);
            }
            setValue("precoKg", parseFloat(precoKg));
        }
    }

    const isSubmitButtonDisabled = !isDirty || !isValid;

    return (
        <Container style={{ maxWidth: '60%' }}>

            <Title title={ingrediente ? 'Editar Ingrediente' : 'Cadastrar Ingrediente'} />

            <form onSubmit={handleSubmit(onSubmit)} >
                <Row className="justify-content-center">
                    <Col >
                        <InputLabel color={errors.nome ? 'error' : 'normal'}>Nome</InputLabel>
                        <InputForm
                            color={errors.nome ? 'error' : 'normal'}
                            type="text"
                            name=" nome"
                            onChange={async (e, { name, value }) => {
                                setValue(name, value)
                                await triggerValidation({ name })
                            }}
                            {...register("nome",
                                { required: "Digite o nome do ingrediente" })
                            }
                        />
                        {errors.nome && <ErrorText>{errors.nome.message}</ErrorText>}
                    </Col>
                    <Col>
                        <InputLabel color={errors.marca ? 'error' : 'normal'}>Marca</InputLabel>

                        <InputForm
                            color={errors.marca ? 'error' : 'normal'}
                            type="text"
                            name=" marca"
                            onChange={async (e, { name, value }) => {
                                setValue(name, value)
                                await triggerValidation({ name })
                            }}
                            {...register("marca",
                                { required: "Digite a marca do ingrediente" })
                            }
                        />
                        {errors.marca && <ErrorText>{errors.marca.message}</ErrorText>}
                    </Col>
                </Row>
                <Row className="justify-content-center align-items-start">
                    <Col md>
                        <InputLabel color={errors.quantEmb ? 'error' : 'normal'}>Quantidade da embalagem </InputLabel>
                        <Controller
                            name="quantEmb"
                            control={control}
                            rules={{
                                required: "Informe a quantidade da embalagem",
                                onChange: calculoPrecoKg
                            }}
                            render={({ ref, field }) =>
                                <StyledNumericInput
                                    {...field} ref={ref}
                                    color={errors.quantEmb ? 'error' : 'normal'}
                                />}
                        />

                        {errors.quantEmb && <ErrorText>{errors.quantEmb.message}</ErrorText>}
                    </Col>
                    <Col>
                        <InputLabel>Unidade de medida</InputLabel>
                        <Controller
                            name="unidadeDeMedida"
                            control={control}
                            rules={{
                                onChange: calculoPrecoKg
                            }}
                            render={({ field }) =>
                                <ReactSelect
                                    {...field}
                                    instanceId={'unidadeDeMedida'}
                                    options={UnidadeMedidasOptions}
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
                        {errors.unidadeDeMedida && <ErrorText>{errors.unidadeDeMedida.message}</ErrorText>}

                    </Col>
                    <Col>
                        <InputLabel color={errors.precoUnit ? 'error' : 'normal'}>Preço unitário</InputLabel>
                        <Controller
                            name="precoUnit"
                            control={control}

                            rules={
                                {
                                    required: "Informe o preço unitario",
                                    onChange: calculoPrecoKg
                                }
                            }
                            render={({ ref, field }) => <StyledNumericInput
                                {...field} ref={ref}
                                decimalScale={2}
                                decimalSeparator=","
                                prefix={'R$ '}
                                color={errors.precoUnit ? 'error' : 'normal'}
                            />}
                        />
                        {errors.precoUnit && <ErrorText>{errors.precoUnit.message}</ErrorText>}
                    </Col>
                    <Col>
                        <InputLabel>Preço por Kg</InputLabel>
                        <Controller
                            name="precoKg"
                            control={control}
                            render={({ ref, field }) => <StyledNumericInput
                                {...field} ref={ref}
                                decimalScale={2}
                                decimalSeparator=","
                                prefix={'R$ '}
                                color={'normal'}
                                disabled
                            />}
                        />
                    </Col>

                </Row>

                <Row style={{ display: 'flex', justifyContent: 'end', marginTop: '1rem', alignItems: 'center' }}>
                    {/* <Col >
                        <Typography style={{ fontSize: 12, color: '#575757' }}>Já adicionou todos os ingredientes?
                            <Link href='/Admin/Form/Receita' style={{ fontWeight: 600, textDecoration: 'none', color: '#404040', paddingLeft: '0.5px' }}>
                                Ir para receitas
                            </Link>
                        </Typography>
                    </Col> */}
                    <Col sm={4} md={3} lg={2} >
                        {/* xs={{ order: 'last' }} */}
                        <Link href="/Admin/IngredientesCadastrados">
                            <CancelButton text={'Cancelar'} />
                        </Link>
                    </Col>
                    <Col sm={8} md={3} lg={2}>
                        <PrimaryButton
                            label={ingrediente ? 'Salvar' : 'Cadastrar'}
                            type="submit"
                            disabled={isSubmitButtonDisabled}
                        />
                    </Col>
                </Row>
                {!ingrediente &&
                    <Row style={{ display: 'flex', justifyContent: 'end', marginTop: '1rem' }}>
                        <Col sm={8} md={6} lg={4}>
                            <Typography style={{ fontSize: 12, color: '#575757' }}>Já adicionou todos os ingredientes?
                                <Link href='/Admin/Form/Receita' style={{ fontWeight: 600, textDecoration: 'none', color: '#505050', paddingLeft: '0.5px' }}>
                                    Ir para receita
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

    if (ctx.query.id) {
        const res = await api.get(`/ingredientes/${ctx.query.id}`);
        const ingrediente = res.data;
        return {
            props: {
                ingrediente,
            },

        }
    }
    return {
        props: {
            ingrediente: null,
        }
    }
}, {
    admin: true,
})