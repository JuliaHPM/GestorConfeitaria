import React, { useState } from "react";
import { Container, Row, Col } from 'react-bootstrap';
import { useForm } from "react-hook-form";
import { Title } from '../components/Title';
import Link from "next/link";
import { ErrorText, InputForm, InputLabel, SmallOptionMessage } from "../styles/components/FormComponents";
import { PrimaryButton } from "../components/PrimaryButton";
import { useAuth } from "../hooks/useAuth";
import { withSSRGuest } from "../utils/withSSRGuest";
import { toast } from "react-toastify";
import { Alert } from "@mui/material";


export default function Login() {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { signIn, isAuthenticated } = useAuth();
    const [messageError, setMessageError] = useState();

    async function onSubmit(data) {
        try {
            await signIn(data.email, data.senha);
            setMessageError('');
        } catch (err) {
            setMessageError(err.response.data.message);
        }
    }

    return (
        <>
            <Container style={{ marginTop: '80px' }}>
                {/* className="w-75" */}
                <Title title={'Login'}></Title>
                <form onSubmit={handleSubmit(onSubmit)}>

                    {messageError &&
                        <Row className="justify-content-center">
                            <Col xs={8} sm={6} md={4} lg={4} xl={4} xxl={3}>
                                <Alert severity="error">{messageError}</Alert>
                            </Col>
                        </Row>
                    }
                    <Row className="justify-content-center">
                        <Col xs={8} sm={6} md={4} lg={4} xl={4} xxl={3}>
                            <InputLabel color={errors?.email ? "error" : "normal"} >Email</InputLabel>
                            <InputForm color={errors?.email ? "error" : "normal"} type="text" {...register("email",
                                { required: "Digite seu email" })} />
                            <ErrorText>{errors?.email?.message}</ErrorText>
                        </Col>
                    </Row>
                    <Row className="justify-content-center ">
                        <Col xs={8} sm={6} md={4} lg={4} xl={4} xxl={3}>
                            <InputLabel color={errors?.senha ? "error" : "normal"} >Senha</InputLabel>
                            <InputForm color={errors?.senha ? "error" : "normal"} type="password" {...register("senha",
                                { required: "Digite a senha" })} />
                            <ErrorText>{errors?.senha?.message}</ErrorText>

                        </Col>

                    </Row>
                    <Row className="justify-content-center mt-3">
                        <Col xs={8} sm={6} md={4} lg={4} xl={4} xxl={3}>
                            <PrimaryButton type="submit" label={'Entrar'} />
                        </Col>
                    </Row>

                    <SmallOptionMessage>
                        <span>
                            {' Não tem uma conta? '}
                            <Link href="/cadastro" replace>
                                <b>Cadastre-se</b>
                            </Link>.
                        </span>
                    </SmallOptionMessage>

                </form>
            </Container>

        </>
    )
}

export const getServerSideProps = withSSRGuest(async (ctx) => {
    return {
        props: {}
    }
})