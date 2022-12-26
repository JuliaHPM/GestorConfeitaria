import React, { useState, useEffect } from "react";
import { Container, Row, Col } from 'react-bootstrap';
import MeuModal from "../../components/Modal";
import CardProduto2 from "../../components/CardProduto2";
import Animation from "../../components/Animation";
// import iconCheck from "../../img/animation/icons8-selecionado.json";
import Image from "next/future/image";
import { ImageContainer, SubTitle } from "../../styles/pages/produto";
import Link from "next/link";
import { Title } from "../../components/Title";
import { CancelButton } from "../../components/CancelButton";
import { PrimaryButton } from "../../components/PrimaryButton";
import doceService from "../../services/doce.service";
import carrinhoService from "../../services/carrinho.service";
import { queryClient } from "../../lib/queryClient";
import { toast } from "react-toastify";
import { getPlaiceholder } from "plaiceholder";
import noImage from '../../img/noImage.png'
import { useAuth } from '../../hooks/useAuth';
import { Grid } from "@mui/material";
import loginComputer from "../../img/login-pana.svg"

export default function Produto({ doce, imagePlaceholder, maisProdutos }) {
    const dados = doce;
    // console.log(dados)
    //const { res } = useFetch(id && "/doces/" + id);
    //const [dados, setDados] = useState([]);
    const { user, isAuthenticated } = useAuth();

    //modal
    const [show, setShow] = useState(false);
    const [showModalLogin, setShowModalLogin] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleCloseModalLogin = () => setShowModalLogin(false);
    const handleShowModalLogin = () => setShowModalLogin(true);

    async function addCart() {
        if (isAuthenticated) {
            //adicionar produto ao carrinho
            const submit = () => {
                return carrinhoService.createItemCarrinho(dados.id, user.carrinho.id, //idDoce, idCarrinho,
                    {
                        quantidadeItem: 1,
                        valorItem: dados.valorTotalComMargem,
                        valorTotalItem: dados.valorTotalComMargem
                    })
            }

            const res = toast.promise(
                submit,
                {
                    // pending: 'Enviando ...',
                    // success: 'Doce adicionado ao carrinho!',
                    error: //'Ocorreu um erro ao adicionar ao carrinho!'
                    {
                        render({ data }) {
                            if (data.response) {
                                return `${data.response.data.message}`
                            }
                            return 'Ocorreu um erro!'
                        }
                    }
                }
            )
            res.then(() => {
                queryClient.invalidateQueries('carrinho');//invalidar o query para atualizar o carrinho
                handleShow(); //chamar modal
            }).catch((err) => {
                console.log(err);
            })
        } else {
            // console.log('modal')
            // toast.warn("Faça login para adicionar produtos ao carrinho!")
            //MODAL
            handleShowModalLogin()
        }
    }

    return (
        <>
            <Container >
                {/* className="w-75" */}
                <Title title={dados.nomeDoce} />

                <Row >
                    <Col style={{ display: 'flex', justifyContent: 'center' }}>
                        <ImageContainer>
                            <div style={{ borderRadius: 10 }}>
                                <Image
                                    src={doce.imagemDoce ? doce.imagemDoce : noImage}
                                    alt=""
                                    fill
                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                    style={{ objectFit: 'cover' }}
                                    placeholder="blur"
                                    blurDataURL={imagePlaceholder}
                                />
                            </div>

                        </ImageContainer>
                    </Col>
                    <Col style={{ textAlign: 'left', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                        <SubTitle>
                            {dados?.descricao}
                        </SubTitle>
                        <div>
                            <p style={{ marginBottom: 1, fontSize: 18 }}>{dados.peso.toString().length < 4 ? `${dados.peso} g` : `${dados.peso / 1000} Kg`}</p>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                                <div>
                                    <p style={{ fontSize: 23, marginRight: 15, margin: 0 }}>
                                        {new Intl.NumberFormat('pt-BR', {
                                            style: 'currency',
                                            currency: 'BRL',
                                        }).format(dados.valorTotalComMargem)}
                                    </p>
                                    {/* {totalProduto ?
                                    <p style={{ fontSize: 21, padding:0 }}>
                                        {new Intl.NumberFormat('pt-BR', {
                                            style: 'currency',
                                            currency: 'BRL',
                                        }).format(totalProduto)}
                                    </p>
                                    :
                                    <></>} */}
                                </div>

                                {/* <QuantityButton quantidade={quantidade} setQuantidade={setQuantidade}/> */}
                            </div>
                        </div>
                    </Col>
                </Row>



                <Row className="justify-content-end">
                    <Col sm={4} md={3} lg={2} >
                        {/* xs={{ order: 'last' }} */}
                        <Link href={'/produtos'}>
                            <CancelButton text="Ver mais doces" />
                        </Link>
                    </Col>
                    <Col sm={8} md={3} lg={2}>
                        <PrimaryButton type="button" onClick={addCart} label={'Adicionar ao carrinho'} />
                    </Col>
                </Row>

                <Row className="justify-content-center">
                    <hr style={{ width: '100%', align: 'center', margin: '2rem' }} />
                </Row>

                <Row className="justify-content-start" style={{ textAlign: 'start', paddingLeft: '2rem' }}>
                    <h4 className="mb-4" style={{ fontWeight: 400 }}>
                        Mais produtos
                    </h4>
                </Row>

                <Grid container style={{ marginBottom: '3rem', gap: '1.5rem' }}>
                    {maisProdutos && maisProdutos.map(produto => (
                        // <Col sm key={produto.id} >
                        <CardProduto2
                            key={produto.id}
                            titulo={produto.nomeDoce}
                            valor={produto.valorTotalComMargem}
                            imagem={produto.imagemDoce}
                            descricao={produto.descricao}
                            id={produto.id}
                        />
                        // </Col>
                    ))}

                    {/* <CardProduto2 key={2} titulo={'Bolo ChocoNinho'} valor={25} imagem={'brigadeiro.jpg'} descricao={'Bolo de chocolate com recheio super cremoso de Ninho com chantilly'} /> */}

                </Grid>

                {show &&
                    <MeuModal
                        title={'Produto adicionado ao carrinho!'}
                        show={show}
                        handleClose={handleClose}
                        textBtn2={'Ver meu carrinho'}
                        acao2={"/carrinho"}
                        textBtn1={'Continuar comprando'}
                        acao1={"/produtos"}
                    >
                        {/* <p>img</p> */}
                        <Animation />
                    </MeuModal>
                }
                {showModalLogin &&
                    <MeuModal
                        title={'Faça login para continuar'}
                        show={showModalLogin}
                        handleClose={handleCloseModalLogin}
                        textBtn2={'Fazer login'}
                        acao2={"/login"}
                        textBtn1={'Cancelar'}
                    >
                        {/* <p>img</p> */}
                        {/* <Animation /> */}
                        {/* <p>Logue para adicionar produtos ao carrinho</p> */}
                        <Image src={loginComputer} width={220} height={250} style={{ margin: '-20px' }} />
                    </MeuModal>
                }
            </Container>
            {/* } */}


            {/* <div style={{ paddingBottom: '170px' }}></div>
            <Footer /> */}
        </>
    )
}

export const getServerSideProps = async ({ query }) => {
    // if (query.id) {
    // const dataQuery = { "idDoce": query.id };
    const maisProdutos = (await doceService.getMaisProdutos(query.id)).data;

    const res = await doceService.getDoce(query.id);
    const doce = res.data;
    let placeholder = null;
    try {
        placeholder = (await getPlaiceholder(doce.imagemDoce)).base64;
    } catch (err) {
        console.log(err)
        placeholder = (await getPlaiceholder('https://e-traelasten.dk/wp-content/uploads/2016/12/safe_image.png')).base64;
    }

    return {
        props: {
            doce,
            imagePlaceholder: placeholder,
            maisProdutos
        },

    }
    // }
    // return {
    //     props: {
    //         doce: null,
    //     }
    // }
}