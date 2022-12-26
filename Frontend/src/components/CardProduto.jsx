import * as React from 'react';
import Box from '@mui/material/Box';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { ContainerDescricao, ImageContainer, StyledCard } from '../styles/components/CardProduto';
import Image from 'next/future/image';
import noImage from '../img/noImage.png'
// import { getPlaiceholder } from 'plaiceholder';

export default function CardProduto({ titulo, descricao, valor, peso, imagem }) {
    // const { base64 } = getPlaiceholder(imagem ? imagem : 'https://e-traelasten.dk/wp-content/uploads/2016/12/safe_image.png');


    return (
        <StyledCard>
            <ImageContainer>
                <Image
                    fill
                    src={imagem ? imagem : noImage}
                    alt="brigadeiro"
                    style={{ objectFit: 'cover' }}
                    placeholder="blur"
                    blurDataURL={'https://e-traelasten.dk/wp-content/uploads/2016/12/safe_image.png'}
                />
            </ImageContainer>
            <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
                <CardContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'start', height: 130 }}>
                    <Typography component="div" sx={{ paddingBottom: 8, fontSize: 17, fontWeight: 600, color: '#4D4D4D', pb: 1 }}>
                        {/* , lineHeight: 1.2, maxHeight: 45 */}
                        {titulo}
                    </Typography>

                    {/* <div style={{ overflow: 'hidden', textOverflow: 'ellipsis', width: '90%' }}>
                        <Typography style={{ textAlign: 'start', lineHeight: 1.2, fontSize: 14 }} variant="subtitle1" color="text.secondary" component="div">
                            {descricao}
                        </Typography>
                    </div> */}

                    <ContainerDescricao>
                        {descricao}
                    </ContainerDescricao>


                </CardContent>
                <Box sx={{ pr: 2, pb: 2, pl: 2, justifyContent: 'space-between', display: 'flex', alignItems: 'center' }}>
                    {/* textAlign: 'end' */}
                    <Typography style={{ textAlign: 'start' }} variant="subtitle2" color="text.secondary" component="div">
                        {peso.toString().length < 4 ? `${peso} g` : `${peso / 1000} Kg`}
                    </Typography>

                    <Typography sx={{ color: '#f85db0', fontWeight: 500 }} >
                        {new Intl.NumberFormat('pt-BR', {
                            style: 'currency',
                            currency: 'BRL',
                        }).format(valor)}
                    </Typography>
                </Box>
            </Box>
        </StyledCard >

    );
}
