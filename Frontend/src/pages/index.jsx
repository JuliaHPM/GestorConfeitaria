import React from "react";
import Footer from "../components/Footer.jsx";
import { Container, Row, Col } from 'react-bootstrap';
import Image from "next/future/image";
// import { Link } from "react-router-dom";
// import Banner from "../../../public/"

import CardHome from '../components/CardHome'
import { BannerHome, BannerHome2, Button, ImageContainer, ProdutosRow, SubtitleHome, TextBanner, TitleHome } from "../styles/pages/Home";
import Link from "next/link";
import doceService from "../services/doce.service.js";
import noImage from "../img/noImage.png"
import categoriaService from "../services/categoria.service.js";


export default function Home({ maisVendidos, categorias }) {

  const mokiCategorias = [
    { id: 1, titulo: 'Brigadeiros', imagem: '/brigadeiro.jpg' },
    { id: 2, titulo: 'Bentos', imagem: '/bento.jpg' },
    { id: 3, titulo: 'Bolos', imagem: '/bolo.jpg' },
    { id: 4, titulo: 'Trufas', imagem: '/coracao.jpg' },
    { id: 5, titulo: 'Ovos de Páscoa', imagem: '/ovo.jpeg' }
  ]

  // console.log(maisVendidos)

  return (
    <>
      <BannerHome>
        <Row style={{ width: '100%', height: '100%', flexDirection: 'column', alignContent: 'center', alignItems: 'center', justifyContent: 'center' }}>
          <Col lg={6} style={{ marginBottom: '5px', textAlign: 'center', }} >
            <TitleHome >Mah Doces e Artes</TitleHome>
          </Col>
          <Col lg={5} style={{ textAlign: 'center', }}>

            <SubtitleHome>Doces produzidos com muito carinho para você</SubtitleHome>

          </Col>
        </Row>
      </BannerHome>


      {categorias.length > 0 &&
        <Container style={{ textAlign: 'center', marginBottom: '4rem', marginTop: '4rem' }}>
          <article>
            <h4 className="mb-5">
              Conheça nossos produtos
            </h4>
          </article>
          <ProdutosRow>
            {categorias.map((categoria) => {
              return (
                <Link href={`/produtos?categoria=${categoria.nomeCategoria}`} prefetch={false} key={categoria.id} style={{ textDecoration: 'none', color: '#343434' }}>
                  <div >
                    <ImageContainer>
                      <Image src={categoria.imagemCategoria ? categoria.imagemCategoria : noImage} alt={categoria.nomeCategoria} width={144} height={144} />
                    </ImageContainer>
                    <h5>{categoria.nomeCategoria}</h5>
                  </div>
                </Link>

              )
            })}
          </ProdutosRow>
        </Container>
      }
      <BannerHome2>
        <Row style={{ width: '100%', height: '100%', flexDirection: 'column', alignContent: 'end', alignItems: 'center', justifyContent: 'center' }}>
          <Col className="col-6 col-lg-4 " style={{ padding: 0, textAlign: 'center', }} >
            <TextBanner className="mt-4 p-2">Nossos Bento Cakes são uma ótima opção para presentear quem você ama ❤</TextBanner>

          </Col>
          <Col lg={2} md={4} sm={4} style={{ margin: '10px' }}>
            <Link href={'/produtos?categoria=Bento%20cake'} prefetch={false}>
              <Button> Ver opções </Button>
            </Link>
          </Col>

        </Row>
      </BannerHome2>


      {maisVendidos.length > 0 &&
        <Container style={{ textAlign: 'center', marginBottom: '4rem', marginTop: '4rem' }}>
          {/* className="mt-5 mb-5" */}
          <article>
            <h4 className="mb-5">
              Mais vendidos
            </h4>
          </article>

          <ProdutosRow className="mb-5">
            {maisVendidos.map((produto) => {
              return (
                <Link href={`/produto/${produto.id}`} prefetch={false} style={{ textDecoration: 'none', color: '#343434' }} key={produto.id} >
                  <CardHome imagem={produto.imagem} titulo={produto.nome} valor={produto.valor} />
                </Link>
              )
            })}
          </ProdutosRow>

        </Container>
      }

      <div style={{ paddingBottom: '100px' }}></div>
      <Footer />
    </>
  )
}

export const getServerSideProps = async () => {

  const categorias = (await categoriaService.getHome()).data;

  const res = await doceService.getMaisVendidos();
  const data = res.data;

  const maisVendidos = data.map(item => {
    return {
      id: item.doce.id,
      nome: item.doce.nomeDoce,
      peso: item.doce.peso,
      descricao: item.doce.descricao,
      valor: item.doce.valorTotalComMargem,
      imagem: item.doce.imagemDoce
    }
  })

  return {
    props: {
      maisVendidos,
      categorias
    }

  }
}