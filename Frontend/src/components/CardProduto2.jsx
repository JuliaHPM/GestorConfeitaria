import * as React from 'react';
import Typography from '@mui/material/Typography';
import { Content, Footer, ImageContainer, StyledCard, VerMaisButton } from '../styles/components/CardProduto2';
import Link from 'next/link';
import Image from 'next/future/image';

export default function CardProduto2({ titulo, valor, imagem, descricao, id }) {
    return (

        <StyledCard>
            <ImageContainer>
                <Image
                    width={180}
                    height={110}
                    src={imagem}
                    alt={titulo}
                />
            </ImageContainer>

            <Content >
                <Typography sx={{ color: "#424242", fontSize: 16, mb: 1 }} >
                    <b>{titulo}</b>
                </Typography>
                <div style={{ height: 40, overflow: 'hidden', width: 260 }}>
                    <Typography sx={{ color: "#5c5c5c", fontSize: 13 }}  >
                        {/* sx={{color:"#424242", fontSize:18}} */}
                        {descricao}
                    </Typography>
                </div>
                <Footer >
                    <Typography sx={{ color: "#000000", fontSize: 15 }}>
                        {new Intl.NumberFormat('pt-BR', {
                            style: 'currency',
                            currency: 'BRL',
                        }).format(valor)}
                    </Typography >
                    <Link href={`/produto/${id}`}>
                        <VerMaisButton type="button">Ver mais</VerMaisButton>
                    </Link>
                </Footer>



            </Content>

        </StyledCard>

    );
}
