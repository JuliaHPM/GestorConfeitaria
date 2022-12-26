import React from "react";
import { useForm } from 'react-hook-form';
import { Container, Row, Col } from 'react-bootstrap';
import userService from "../services/user.service";
import Link from "next/link";
import { Title } from "../components/Title";
import { ErrorText, InputForm, InputLabel, SmallOptionMessage } from "../styles/components/FormComponents";
import { PrimaryButton } from "../components/PrimaryButton";
import { withSSRGuest } from "../utils/withSSRGuest";
import { toast } from "react-toastify";
import { useAuth } from "../hooks/useAuth";

export default function Registro() {
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const { getMe, setAuth } = useAuth();

    const onSubmit = data => {
        const submit = () => {
            return userService.create(data)
        }

        const res = toast.promise(
            submit,
            {
                pending: 'Enviando ...',
                success: 'Cadastro realizado com sucesso!',
                error: {
                    render({ data }) {
                        return `${data.response.data.message}`
                    }
                }
            }
        )
        res.then((response) => {
            const { token } = response.data;
            setAuth(token);
            getMe();

        }).catch((err) => {
            console.log(err);
        })
    }

    return (
        <Container style={{ marginTop: '70px' }}>
            <Title title={'Cadastro'} />
            <form onSubmit={handleSubmit(onSubmit)}>
                <Row className="justify-content-center">
                    <Col xs={8} sm={10} md={5} xl={3}>
                        <InputLabel color={errors?.nome ? "error" : "normal"}>Nome</InputLabel>
                        <InputForm color={errors?.nome ? "error" : "normal"} type="text" {...register("nome", { required: "Digite o nome" })} />
                        <ErrorText>{errors?.nome?.message}</ErrorText>
                    </Col>
                </Row>
                <Row className="justify-content-center">
                    <Col xs={8} sm={10} md={5} xl={3}>
                        <InputLabel color={errors?.telefone ? "error" : "normal"}>Telefone contato WhatsApp</InputLabel>
                        <InputForm color={errors?.telefone ? "error" : "normal"} type="text" {...register("telefone", { required: "Digite o telefone de contato" })} />
                        <ErrorText>{errors?.telefone?.message}</ErrorText>
                    </Col>
                </Row>
                <Row className="justify-content-center">
                    <Col xs={8} sm={10} md={5} xl={3}>
                        <InputLabel color={errors?.email ? "error" : "normal"}>Email</InputLabel>
                        <InputForm color={errors?.email ? "error" : "normal"} type="text" {...register("email", { required: "Digite o email" })} />
                        <ErrorText>{errors?.email?.message}</ErrorText>
                    </Col>
                </Row>
                {/* <Row className="justify-content-center">
                    <Col xs={8} sm={10} md={5} xl={3}>
                        <InputLabel color={errors?.username ? "error" : "normal"}>Username</InputLabel>
                        <InputForm color={errors?.username ? "error" : "normal"} type="text" {...register("username", { required: "Digite o username" })} />
                        <ErrorText>{errors?.username?.message}</ErrorText>
                    </Col>
                </Row> */}
                <Row className="justify-content-center">
                    <Col xs={8} sm={10} md={5} xl={3}>
                        <InputLabel color={errors?.senha ? "error" : "normal"}>Senha</InputLabel>
                        <InputForm color={errors?.senha ? "error" : "normal"} type="password"
                            {...register("senha",
                                {
                                    required: "Digite a senha",
                                    minLength: {
                                        value: 8,
                                        message: "A senha deve ter pelo menos 8 caracteres"
                                    }
                                })}
                        />
                        <ErrorText>{errors?.senha?.message}</ErrorText>
                    </Col>
                </Row>
                <Row className="justify-content-center mt-3">
                    <Col xs={8} sm={10} md={5} xl={3}>
                        <PrimaryButton label={'Cadastrar'} type="submit" />
                    </Col>
                </Row>
                <Row className="justify-content-center">
                    <Col xs={8} sm={10} md={5} xl={3}>
                        <SmallOptionMessage>
                            <span>
                                {' Já tem uma conta? '}
                                <Link href="/login" replace>
                                    <b>Fazer login</b>
                                </Link>.
                            </span>

                        </SmallOptionMessage>
                    </Col>
                </Row>
            </form >
        </Container >
    )
}

export const getServerSideProps = withSSRGuest(async (ctx) => {
    return {
        props: {}
    }
})