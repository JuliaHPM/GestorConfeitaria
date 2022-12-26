import Image from "next/image";
import { Col, Row } from "react-bootstrap";
import imgConfeiteira from "../img/confeiteira.jpeg"

export default function Sobre() {
    return (
        <Row style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '50px 0px', margin: 0 }}>
            <Col lg={3} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', }}>
                <Image src={imgConfeiteira} width={250} height={330} alt='img' style={{ borderRadius: 10 }} />
            </Col>

            <Col lg={5}>
                <p style={{ fontSize: 18, lineHeight: 1.7 }}>
                    Olá! Deixa eu me apresentar: meu nome é Marcela, tenho 22 anos e meu signo é touro,
                    sempre gostei muito de fazer doces, desde pequena ajudava minha mãe a fazer o bolo e os brigadeiros de todas as festas de aniversário da família, ovos de páscoa e outros doces durante todo o ano, na pré adolescência criei gosto por cupcakes e comecei a fazer em casa, depois comecei a vender na escola durante o ensino médio, e quando entrei na arquitetura vendia trufas e cupcakes para os meus colegas.
                </p>
                <p style={{ fontSize: 18, lineHeight: 1.7 }}>
                    Quando chegou a pandemia minhas aulas ficaram meses suspensas e eu não tinha mais meus clientes desses produtos individuais, então comecei a me aventurar a fazer bolos decorados por encomenda, fazia os bolos nos fim de semana e colocava pra sorteio no Instagram pra divulgar e praticar essa arte que é confeitar bolos. Quando voltou as aulas online eu assistia enquanto fazia massa de bolo e recheio, rsrs no fim de 2021 os bento cakes chegaram no Brasil, e eu entrei na onda, quando a moda chegou em Erechim no começo de 2022 eu comecei a ter muitas encomendas, cada dia mais pessoas chegaram a minha página e pediram esses bolinhos divertidos e simpáticos, então dei um tempo no meu curso pra passar o ano fazendo bolo todos os dias, e é assim que cheguei aqui, prazer!
                    Espero poder te atender e tornar sua data mais doce e especial
                    ❤️
                </p>

            </Col>
        </Row >
    )
}