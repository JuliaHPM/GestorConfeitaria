import { Grid } from "@mui/material";
import { useEffect, useState } from "react";
import { Col, Modal, Row } from "react-bootstrap";
import { Controller, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { ErrorText, InputForm, InputLabel, StyledInputMask, StyledNumericInput } from "../styles/components/FormComponents";
import { CancelButton } from "./CancelButton";
import { PrimaryButton } from "./PrimaryButton";
import enderecoService from "../services/endereco.service";
import { queryClient } from "../lib/queryClient";
import axios from "axios";
import Spinner from "./Spinner";

export default function ModalEndereco({ endereco, show, handleClose, usuarioId }) {

    const { register, handleSubmit, setValue, getValues, control, formState, reset } = useForm({
        mode: "onChange",
        defaultValues: {
            nome: endereco?.nome,
            cep: endereco?.cep,
            cidade: endereco?.cidade,
            bairro: endereco?.bairro,
            rua: endereco?.rua,
            numero: endereco?.numero,
            complemento: endereco?.complemento,
            pontoReferencia: endereco?.pontoReferencia
        }
    });
    const { errors, isDirty, isValid } = formState;
    const [isLoadingCep, setIsLoadingCep] = useState(false);

    // useEffect(() => {
    //     setValue("cep", endereco?.cep);
    //     setValue("cidade", endereco?.cidade);
    //     setValue("bairro", endereco?.bairro);
    //     setValue("rua", endereco?.rua);
    //     setValue("numero", endereco?.numero);
    //     setValue("complemento", endereco?.complemento);
    //     setValue("pontoReferencia", endereco?.pontoReferencia);
    // }, [endereco, setValue])

    const onSubmit = data => {
        console.log(data);
        const submit = () => {
            if (endereco) {
                return enderecoService.update(endereco.id, usuarioId, data); //idCliente //idEndereco
            } else {
                return enderecoService.create(usuarioId, data); //idCliente
            }
        }
        const res = submit();
        toast.promise(
            res,
            {
                pending: 'Salvando...',
                success: 'Endereco salvo com sucesso!',
                error: 'Erro ao salvar endereço!'
            }
        )
        res.then((res) => {
            console.log(res);
            queryClient.invalidateQueries('enderecos');//invalidar o query para atualizar a tabela
        }).catch(() => { })
        handleClose();
    }

    async function buscaCep() {
        const txt = String(getValues('cep'));
        const cep = txt.indexOf('-') === -1 ? txt : txt.replace('-', '');

        if (cep.trim().length === 8) {
            console.log('entrou no busca cep')
            setIsLoadingCep(true);
            await axios.get(`https://viacep.com.br/ws/${cep}/json/`)
                .then(({ data }) => {
                    setValue("cidade", data?.localidade);
                    setValue("bairro", data?.bairro);
                    setValue("rua", data?.logradouro);
                }).catch(err => {
                    console.log(err)
                }).finally(() => {
                    setIsLoadingCep(false);
                })
        }
    }

    return (
        <>
            <Modal show={show} onHide={handleClose} centered>
                <Modal.Header style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                    <Modal.Title>{endereco ? 'Editar' : 'Cadastrar'} endereço</Modal.Title>
                </Modal.Header>
                <Modal.Body style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    // margin:'1rem'
                }}>

                    <form onSubmit={handleSubmit(onSubmit)}>
                        <Grid container spacing={5} justifyContent="center">
                            <Grid item container>
                                <Grid item xs >

                                    <Row >
                                        <Col>
                                            <InputLabel color={'normal'}>Nome do endereço</InputLabel>
                                            <InputForm
                                                color={'normal'}
                                                type="text"
                                                name="nome"
                                                {...register("nome")
                                                }
                                            />
                                        </Col>

                                        <Col >
                                            <InputLabel color={errors.cep ? 'error' : 'normal'} >
                                                CEP{isLoadingCep && <Spinner size={12} style={{ marginLeft: '0.5rem' }} />}
                                            </InputLabel>
                                            <Controller
                                                name="cep"
                                                control={control}
                                                rules={
                                                    {
                                                        required: "Informe o cep",
                                                        onChange: buscaCep
                                                    }
                                                }
                                                render={({ ref, field }) =>
                                                    <StyledInputMask
                                                        {...field} ref={ref}
                                                        // decimalScale={2}
                                                        // decimalSeparator="-"
                                                        format="#####-###"
                                                        // allowEmptyFormatting mask="_" 
                                                        color={errors.cep ? 'error' : 'normal'}
                                                    />}
                                            />
                                            {errors.cep && <ErrorText>{errors.cep.message}</ErrorText>}
                                        </Col>

                                        {/* <Col lg={2} sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                                            <CancelButton type='button' onClick={buscaCep} text="🔎" />
                                          
                                        </Col> */}

                                    </Row>
                                    <Row>
                                        <Col>
                                            <InputLabel color={errors.cidade ? 'error' : 'normal'}>Cidade</InputLabel>
                                            <InputForm
                                                color={errors.cidade ? 'error' : 'normal'}
                                                type="text"
                                                name="cidade"
                                                {...register("cidade",
                                                    { required: "Digite a cidade" })
                                                }
                                            />
                                            {errors.cidade && <ErrorText>{errors.cidade.message}</ErrorText>}
                                        </Col>
                                        <Col>
                                            <InputLabel color={errors.bairro ? 'error' : 'normal'}>Bairro</InputLabel>
                                            <InputForm
                                                color={errors.bairro ? 'error' : 'normal'}
                                                type="text"
                                                name="bairro"
                                                {...register("bairro",
                                                    { required: "Digite o bairro" })
                                                }
                                            />
                                            {errors.bairro && <ErrorText>{errors.bairro.message}</ErrorText>}
                                        </Col>

                                    </Row>
                                    <Row>
                                        <Col>
                                            <InputLabel color={errors.rua ? 'error' : 'normal'}>Rua</InputLabel>
                                            <InputForm
                                                color={errors.rua ? 'error' : 'normal'}
                                                type="text"
                                                name="rua"
                                                {...register("rua",
                                                    { required: "Digite a rua" })
                                                }
                                            />
                                            {errors.rua && <ErrorText>{errors.rua.message}</ErrorText>}
                                        </Col>
                                        <Col xsm={2} sm={4} md={3} lg={3}>
                                            <InputLabel color={errors.numero ? 'error' : 'normal'}>N°</InputLabel>
                                            <Controller
                                                name="numero"
                                                control={control}
                                                rules={
                                                    {
                                                        required: "Digite o número",
                                                    }
                                                }
                                                render={({ ref, field }) =>
                                                    <StyledNumericInput
                                                        {...field} ref={ref}
                                                        decimalScale={2}
                                                        color={errors.numero ? 'error' : 'normal'}
                                                    />}
                                            />
                                            {errors.numero && <ErrorText>{errors.numero.message}</ErrorText>}
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col xsm={6} sm={4} md={3} lg={4}>
                                            <InputLabel color={'normal'}>Complemento</InputLabel>
                                            <InputForm
                                                color={'normal'}
                                                type="text"
                                                name="complemento"
                                                {...register("complemento")
                                                }
                                            />
                                        </Col>

                                        <Col >
                                            <InputLabel color={'normal'}>Ponto de referência</InputLabel>
                                            <InputForm
                                                color={'normal'}
                                                type="text"
                                                name="pontoReferencia"
                                                {...register("pontoReferencia")
                                                }
                                            />
                                        </Col>
                                    </Row>

                                </Grid>
                            </Grid>
                        </Grid>
                    </form>
                </Modal.Body>
                <Modal.Footer style={{ display: "flex", flexDirection: 'column', justifyContent: "center", alignItems: "center" }}>
                    <Row style={{ width: "100%" }}>
                        <Col md={6} lg={6} style={{ marginBottom: '0.5rem' }}>
                            <CancelButton onClick={handleClose} text={"Cancelar"} />
                        </Col>

                        <Col md={6} lg={6}>
                            <PrimaryButton label='Salvar' type="button" onClick={handleSubmit(onSubmit)} />
                            {/* disabled={isSubmitButtonDisabled}  */}
                        </Col>
                    </Row>

                </Modal.Footer>
            </Modal>

        </>

    )
}