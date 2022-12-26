import React, { useEffect, useState } from "react";
import { useForm, Controller } from 'react-hook-form';
import { Container, Row, Col } from 'react-bootstrap';
import Link from "next/link";
import { withSSRAuth } from "../../utils/withSSRAuth";
import { priceFormatter, revertPriceFormatter } from "../../utils/formatter";
import horaService from "../../services/hora.service";
import { toast } from "react-toastify";
import { PrimaryButton } from "../PrimaryButton";
import { ErrorText, InputLabel, StyledNumericInput } from "../../styles/components/FormComponents";
import PopoverStyled from "../Popover";


export default function CadastroHora({ hora }) {
    const { register, handleSubmit, setValue, getValues, control, formState, reset } = useForm({
        mode: "onChange",
        defaultValues: {
            horasTrabMes: hora?.horasTrabMes,
            rendaDesejada: priceFormatter.format(hora?.rendaDesejada.toFixed(2)),
            valorHora: priceFormatter.format(hora?.valorHora.toFixed(2))
        }
    });
    const { errors, isDirty, isValid, isSubmitSuccessful } = formState;

    const onSubmit = data => {
        // console.log(data);

        const submit = () => {
            // if (!receita) {
            //     return receitaService.create(
            //         {
            //             ...data,
            //             ingredientes: ingredientesReceita,
            //             unidadeDeMedida: "g"
            //         }
            //     );
            // } else {

            return horaService.update(1, //sempre será update do id 1
                {
                    ...data,
                    rendaDesejada: revertPriceFormatter(data.rendaDesejada).toFixed(2),
                    valorHora: revertPriceFormatter(data.valorHora).toFixed(2)
                })
            // }
        }

        const res = toast.promise(
            submit,
            {
                pending: 'Enviando ...',
                success: 'Valor da hora salvo com sucesso!',
                error: 'Ocorreu um erro ao salvar o valor da hora!'
            }
        )
        res.then(() => {
            reset({}, {
                keepValues: true,
            });
        }).catch((err) => {
            console.log(err);
        })

    }

    function calculoValorHora() {
        if (getValues("horasTrabMes") && getValues("rendaDesejada")) {
            const horasTrabMes = getValues("horasTrabMes");
            const rendaDesejada = revertPriceFormatter(getValues("rendaDesejada")); //.replace(",", ".")
            const valorHora = (parseFloat(rendaDesejada) / parseFloat(horasTrabMes));

            setValue("valorHora", valorHora);
        }
    }

    const isSubmitButtonDisabled = !isDirty || !isValid;

    return (
        <Container>
            {/* <Title title={'Valor hora de trabalho'} /> */}
            <div >
                {/* className="formBorder" */}
                <form onSubmit={handleSubmit(onSubmit)}>

                    <Row >
                        <Col xs="6" lg="4">
                            <InputLabel color={errors.horasTrabMes ? 'error' : 'normal'}>Horas trabalhadas no mês</InputLabel>
                            <Controller
                                name="horasTrabMes"
                                control={control}
                                rules={{
                                    required: "Informe as horas trabalhadas no mês",
                                    onChange: calculoValorHora
                                }}
                                render={({ ref, field }) =>
                                    <StyledNumericInput
                                        {...field} ref={ref}
                                        color={errors.horasTrabMes ? 'error' : 'normal'}
                                    />}
                            />
                            {errors.horasTrabMes && <ErrorText>{errors.horasTrabMes.message}</ErrorText>}
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={6} lg={4}>
                            <InputLabel color={errors.horasTrabMes ? 'error' : 'normal'}>Renda desejada</InputLabel>
                            <Controller
                                name="rendaDesejada"
                                control={control}
                                rules={{
                                    required: "Digite a renda desejada",
                                    onChange: calculoValorHora
                                }}
                                render={({ ref, field }) =>
                                    <StyledNumericInput
                                        {...field} ref={ref}
                                        color={errors.rendaDesejada ? 'error' : 'normal'}
                                        decimalScale={2}
                                        decimalSeparator=","
                                        prefix={'R$ '}
                                    />}
                            />
                            {errors.rendaDesejada && <ErrorText>{errors.rendaDesejada.message}</ErrorText>}
                        </Col>
                    </Row>
                    <Row>
                        <Col xs="6" lg="4">
                            <div style={{ display: 'flex', alignItems: "end", gap: 4 }}>
                                <InputLabel color={errors.horasTrabMes ? 'error' : 'normal'} style={{ width: 70 }}>
                                    Valor hora
                                </InputLabel>
                                <PopoverStyled text="Este valor será utilizado no cálculo de custo do doce" />
                            </div>
                            <Controller
                                name="valorHora"
                                control={control}
                                rules={{
                                    required: "Digite o valor da hora"
                                }}
                                render={({ ref, field }) =>
                                    <StyledNumericInput
                                        {...field} ref={ref}
                                        color={errors.valorHora ? 'error' : 'normal'}
                                        decimalScale={2}
                                        decimalSeparator=","
                                        prefix={'R$ '}
                                    />}
                            />
                            {errors.valorHora && <ErrorText>{errors.valorHora.message}</ErrorText>}
                        </Col>
                    </Row>

                    {!isSubmitButtonDisabled &&
                        <Row style={{ marginTop: '1rem', transition: '.2s ease-in' }}>
                            <Col xs={3} md={4} lg={4}>
                                <PrimaryButton label='Salvar' type="submit" disabled={isSubmitButtonDisabled} />
                            </Col>
                        </Row>
                    }

                </form>
            </div>

        </Container>

    )
}


export const getServerSideProps = withSSRAuth(async (ctx) => {
    // const api = setupAPIClient(ctx);
    // // if (query.id) {
    // const res = await api.get(`/valorHora/1`);
    // const hora = res.data;
    // return {
    //     props: {
    //         hora,
    //     },

    // }

}, {
    admin: true,
})