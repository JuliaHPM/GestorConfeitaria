import React, { useEffect, useState } from "react";
import { useForm, Controller } from 'react-hook-form';
import { Container, Row, Col } from 'react-bootstrap';
import Link from "next/link";
import { ErrorText, InputForm, InputLabel, StyledInputMask, StyledNumericInput } from "../styles/components/FormComponents";
import { CancelButton } from "../components/CancelButton";
import { PrimaryButton } from "../components/PrimaryButton";
import { Title } from "../components/Title";
import { toast } from "react-toastify";
import horaService from "../services/hora.service";
import { revertPriceFormatter } from "../utils/formatter";
import EditIcon from '@mui/icons-material/Edit';
import { DatePicker } from "@mui/x-date-pickers";
import { Avatar, Box, FormControl, Grid, RadioGroup, TextField, Tooltip, Typography } from "@mui/material";
import { BtnExcluirConta, ColorButton, ContainerHeaderEnderecos, IconAdd, ImageContainer } from "../styles/pages/Perfil";
import { RadioButton } from "../components/RadioButton";
import userService from "../services/user.service";
import CardEndereço from "../components/CardEndereco";
import { useEnderecos } from "../hooks/useEnderecos";
import AddIcon from '@mui/icons-material/Add';
import ModalEndereco from "../components/ModalEndereco";
import { withSSRAuth } from '../utils/withSSRAuth';
import { setupAPIClient } from "../lib/api";
import { useCloudinary } from "../hooks/useCloudinary";
import ReactSelect from "react-select";
import MeuModal from "../components/Modal";
import { useAuth } from "../hooks/useAuth";

export default function Perfil({ usuario }) {

    const { logOut } = useAuth();
    const { data: enderecos } = useEnderecos(usuario.id);
    // const [radio, setRadio] = useState(usuario ? usuario.sexo : '');
    const [showModalEndereco, setShowModalEndereco] = useState(false);
    const [modalExcluirConta, setModalExcluirConta] = useState(false);
    const [loadingExcluir, setLoadingExcluir] = useState(false);
    const uploadImage = useCloudinary();

    const OptionsGenero = [
        { value: 'F', label: 'Feminino' },
        { value: 'M', label: 'Masculino' },
        { value: 'O', label: 'Outro' },
    ]

    const { register, handleSubmit, setValue, getValues, control, formState, reset } = useForm({
        mode: "onChange",
        defaultValues: {
            nome: usuario?.nome,
            email: usuario?.email,
            dataNasc: usuario?.dataNasc,
            sexo: usuario?.sexo ? OptionsGenero.find(a => a.value === usuario.sexo) : null,
            telefone: usuario?.telefone,
            senha: ""
        }
    });
    const { errors, isDirty, isValid } = formState;

    const handleCloseModalEndereco = () => setShowModalEndereco(false);

    const handleShowModalEndereco = () => setShowModalEndereco(true);

    function handleModalExluirConta() {
        setModalExcluirConta(old => !old)
    }

    async function excluirConta() {
        try {
            setLoadingExcluir(true);
            await userService.delete(usuario?.id);
            toast.success('Conta excluída com sucesso!');
            logOut();
        } catch (err) {
            toast.warn("Erro ao excluir conta!")
        } finally {
            setLoadingExcluir(false);
        }
    }

    const onSubmit = data => {
        const submit = async () => {
            let linkImage = urlImage;
            if (image) {
                if (usuario?.fotoPerfil !== urlImage) {
                    try {
                        const res = await uploadImage(image);
                        linkImage = res.data.secure_url;
                    } catch (err) {
                        throw err;
                    }
                }
            }
            return userService.updateCliente(usuario.id,
                {
                    ...data,
                    // senha: data.senha !== ,
                    fotoPerfil: linkImage,
                    sexo: data.sexo?.value ? data.sexo.value : null,
                    // telefone: null
                }
            )
        }

        const res = toast.promise(
            submit,
            {
                pending: 'Enviando ...',
                success: 'Usuário salvo com sucesso!',
                error: {
                    render({ data }) {
                        if (data.response) {
                            return `${data.response.data.message}`
                        } else {
                            return "Erro ao salvar alterações!"
                        }

                    }
                }
            }
        )
        res.then(() => {
            reset({}, {
                keepValues: true,
            });
            // setImage(null);
            // setUrlImage(linkImage);
        }).catch((err) => {
            console.log(err);
        })

    }

    const [image, setImage] = useState(null);
    const [urlImage, setUrlImage] = useState(null);

    function handleImageChange(e) {
        if (!e.target.files || e.target.files.length === 0) {
            setImage(null);
        } else {
            setImage(e.target.files[0]);
        }
    }

    useEffect(() => {
        if (!image) {
            setUrlImage(usuario ? usuario.fotoPerfil : null);
        } else {
            const objectUrl = URL.createObjectURL(image);
            setUrlImage(objectUrl);

            return () => URL.revokeObjectURL(objectUrl);
        }
    }, [image, usuario])

    const isSubmitButtonDisabled = (!image && !isDirty) || (!isValid && isDirty);

    return (
        <Container>
            {/* <Title title={'Perfil'} /> */}
            <div >
                {/* className="formBorder" */}
                <form onSubmit={handleSubmit(onSubmit)}>

                    <Grid container spacing={5} justifyContent="center" marginTop={2}>
                        <Grid item>
                            <input
                                type="file"
                                id='inputImage'
                                style={{ zIdex: -1, position: 'absolute', opacity: 0 }}
                                accept={'image/png, image/jpeg, image/jpg'}
                                onChange={handleImageChange}
                            />
                            <ImageContainer htmlFor='inputImage'>
                                <div >
                                    <Avatar src={urlImage} alt="" />
                                </div>
                                <span><EditIcon fontSize="small" style={{ color: 'gray' }} /></span>
                            </ImageContainer>
                        </Grid>
                        <Grid item xs={10} sm lg={6} md={5} container>
                            <Grid item xs >
                                <Row>
                                    <Col xsm={10} sm={6} md={6} lg={6}>
                                        <InputLabel color={errors.nome ? 'error' : 'normal'}>Nome</InputLabel>
                                        <InputForm
                                            color={errors.nome ? 'error' : 'normal'}
                                            type="text"
                                            name="nome"
                                            {...register("nome",
                                                { required: "Digite o seu nome" })
                                            }
                                        />
                                        {errors.nome && <ErrorText>{errors.nome.message}</ErrorText>}
                                    </Col>
                                    <Col xsm={10} sm={6} md={6} lg={6}>
                                        <InputLabel color={errors.email ? 'error' : 'normal'}>Email</InputLabel>
                                        <InputForm
                                            color={errors.email ? 'error' : 'normal'}
                                            type="text"
                                            name="email"
                                            {...register("email",
                                                { required: "Digite o seu email" })
                                            }
                                        />
                                        {errors.email && <ErrorText>{errors.email.message}</ErrorText>}
                                    </Col>
                                </Row>
                                <Row>
                                    <Col xsm={10} sm={6} md={6} lg={6}>
                                        <InputLabel color={'normal'}>Data Nascimento</InputLabel>
                                        <Controller
                                            name="dataNasc"
                                            control={control}
                                            render={({ field: { ref, ...rest } }) =>
                                                <DatePicker
                                                    // {...field}
                                                    label="Data Nascimento"
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
                                    <Col xsm={10} sm={6} md={6} lg={6}>
                                        <InputLabel color={'normal'}>Gênero</InputLabel>
                                        <Controller
                                            name="sexo"
                                            control={control}
                                            render={({ field }) =>
                                                <ReactSelect
                                                    {...field}
                                                    instanceId={'sexo'}
                                                    options={OptionsGenero}
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
                                </Row>
                                <Row style={{ alignItems: 'flex-start' }}>
                                    <Col>
                                        <InputLabel color={'normal'}>Número de contato WhatsApp</InputLabel>
                                        <Controller
                                            name="telefone"
                                            control={control}
                                            render={({ ref, field }) =>
                                                <StyledInputMask
                                                    format="(##) # ####-####"
                                                    {...field} ref={ref}
                                                    color={'normal'}
                                                />}
                                        />
                                    </Col>
                                    <Col xsm={10} sm={6} md={6} lg={6}>
                                        <InputLabel color={'normal'}>Nova senha</InputLabel>
                                        <InputForm
                                            color={'normal'}
                                            type="password"
                                            name="senha"
                                            {...register("senha",
                                                {
                                                    minLength: {
                                                        value: 8,
                                                        message: "A senha deve ter pelo menos 8 caracteres"
                                                    }
                                                }
                                            )}
                                        />
                                        <ErrorText>{errors?.senha?.message}</ErrorText>
                                    </Col>
                                </Row>
                                <Row style={{ justifyContent: 'space-between', marginTop: 15, alignItems: 'center' }}>
                                    <Col xsm={10} sm={6} md={6} lg={3}>
                                        <BtnExcluirConta onClick={handleModalExluirConta}>Excluir conta</BtnExcluirConta>
                                    </Col>
                                    <Col xsm={10} sm={6} md={6} lg={3} >
                                        <PrimaryButton label='Salvar' type="submit" disabled={isSubmitButtonDisabled} />
                                    </Col>
                                </Row>

                                <Grid>
                                    <ContainerHeaderEnderecos>
                                        <Typography sx={{ color: "#424242", fontSize: 19, fontWeight: 400 }}>Meus Endereços</Typography>
                                        <Tooltip title='Adicionar'>
                                            <ColorButton aria-label="Add" onClick={handleShowModalEndereco}>
                                                <AddIcon />
                                            </ColorButton>
                                        </Tooltip>
                                    </ContainerHeaderEnderecos>

                                    {enderecos?.length > 0 ?
                                        enderecos.map((endereco) => (
                                            <CardEndereço key={endereco.id} endereco={endereco} usuarioId={usuario.id} />
                                        ))
                                        :
                                        <p>Nenhum endereço cadastrado</p>
                                    }
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </form>
            </div>

            <ModalEndereco
                show={showModalEndereco}
                handleClose={handleCloseModalEndereco}
                usuarioId={usuario.id}
            // endereco={endereco}
            />

            <MeuModal
                show={modalExcluirConta}
                handleClose={handleModalExluirConta}
                handleOkButtonClick={excluirConta}
                title={"Atenção!"}
                textBtn2={"Excluir"}
                loading={loadingExcluir}
            >
                <div style={{ display: 'flex', flexDirection: "column", alignItems: 'center' }}>
                    <p style={{ fontSize: 18, paddingBottom: 0 }}>Deseja excluir sua conta permanentemente?</p>
                    <p style={{ fontSize: 15, marginTop: 0 }}>Esta ação não pode ser desfeita</p>
                </div>

            </MeuModal>

        </Container >
    )
}

export const getServerSideProps = withSSRAuth(async (ctx) => {
    const apiClient = setupAPIClient(ctx);
    const res = await apiClient.get('/me');

    return {
        props: {
            usuario: res.data,
        },

    }
})