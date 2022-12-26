import { Typography } from "@mui/material";
import { useState } from "react";
import { Col, Row } from "react-bootstrap";
import { Controller, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useAuth } from "../../hooks/useAuth";
import { useEnderecos } from "../../hooks/useEnderecos";
import settingsService from "../../services/settings.service";
import { ErrorText, InputForm, InputLabel, StyledNumericInput } from "../../styles/components/FormComponents";
import { priceFormatter, revertPriceFormatter } from "../../utils/formatter";
import PopoverStyled from "../Popover";
import { PrimaryButton } from "../PrimaryButton";

export function Frete({ valorKm, enderecoOrigem, taxaEntrega }) {
    const { user } = useAuth();

    const { register, handleSubmit, setValue, getValues, control, formState, reset } = useForm({
        mode: "onChange",
        defaultValues: {
            inputValorKm: priceFormatter.format(valorKm.toFixed(2)),
            inputEnderecoOrigem: enderecoOrigem,
            inputTaxaEntrega: priceFormatter.format(taxaEntrega.toFixed(2))
        }
    });
    const { errors, isDirty, isValid } = formState;

    function editFrete(data) {

        const submit = async () => {
            return await settingsService.updateFrete(1, {
                valorKm: revertPriceFormatter(data.inputValorKm),
                enderecoOrigem: data.inputEnderecoOrigem,
                taxaEntrega: revertPriceFormatter(data.inputTaxaEntrega)
            });
        }
        const res = submit();

        toast.promise(
            res,
            {
                pending: 'Enviando ...',
                success: {
                    render({ data }) {
                        return data.data.message;
                    }
                },
                error: {
                    render({ data }) {
                        if (data.response) {
                            return `${data.response.data.message}`
                        } else {
                            return 'Ocorreu um erro!'
                        }
                    }
                }
            }
        )
        res.then(() => {

        }).catch(() => { })
    }

    const isButtonSubmitDisabled = !isDirty;

    return (
        <div style={{ display: 'flex', flexDirection: 'column', paddingRight: '16rem' }}>
            <form onSubmit={handleSubmit(editFrete)}>
                <Row style={{ display: 'flex', alignItems: 'end', marginBottom: '1rem' }}>
                    <Col lg={4}>
                        <div style={{ display: 'flex', alignItems: "end", gap: 4 }}>
                            <InputLabel style={{ width: 70 }}>Valor Km</InputLabel>
                            <PopoverStyled text="Valor cobrado por km rodados ao fazer o frete. Pode ser calculado dividindo o preço da gasolina pela média de litro gasto por km" />
                        </div>
                        <Controller
                            name="inputValorKm"
                            control={control}
                            rules={
                                {
                                    required: "Digite o valor/Km",
                                }
                            }
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
                        {errors.inputValorKm && <ErrorText>{errors.inputValorKm.message}</ErrorText>}
                    </Col>
                    <Col lg={4}>
                        <div style={{ display: 'flex', alignItems: "end", gap: 4 }}>
                            <InputLabel style={{ width: 115 }}>Taxa fixa entrega</InputLabel>
                            <PopoverStyled text="Esta taxa será sempre adicionada ao valor do frete" />
                        </div>
                        {/* <InputForm {...register('inputValorKm')} /> */}
                        <Controller
                            name="inputTaxaEntrega"
                            control={control}
                            rules={
                                {
                                    required: "Digite a taxa fixa de entrega",
                                }
                            }
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
                        {errors.inputTaxaEntrega && <ErrorText>{errors.inputTaxaEntrega.message}</ErrorText>}
                    </Col>
                </Row>

                <Row >
                    <Col lg={8}>
                        <InputLabel>Endereço da confeitaria - origem frete </InputLabel>
                        <InputForm color={"normal"}
                            {...register('inputEnderecoOrigem',
                                { required: "Digite o endereço" })} />
                    </Col>
                    {errors.inputEnderecoOrigem && <ErrorText>{errors.inputEnderecoOrigem.message}</ErrorText>}
                </Row>
                <Row lg={3} style={{ justifyContent: 'start', marginTop: '1rem' }}>
                    {!isButtonSubmitDisabled &&
                        <Col lg={2} style={{ transition: '.2s ease-in-out' }}>
                            <PrimaryButton label={'Salvar'} disabled={isButtonSubmitDisabled} />
                        </Col>
                    }
                </Row>
            </form>
        </div>
    )
}