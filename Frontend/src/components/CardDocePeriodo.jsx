import * as React from 'react';
import Typography from '@mui/material/Typography';
import { Content, Footer, ImageContainer, StyledCard, VerMaisButton } from '../styles/components/CardDocePeriodo';
import Link from 'next/link';
import Image from 'next/future/image';
import { Avatar } from '@mui/material';
import { Col } from 'react-bootstrap';

export default function CardDocePeriodo({ item }) {
    return (

        <Col lg={4} style={{ display: 'flex', alignItems: 'center', width: 400 }}>
            <div style={{ color: "#424242", fontSize: 28, display: 'flex', alignItems: 'center', textAlign: 'center', padding: 1 }} >
                <b>{item.totalQuantity}</b>
            </div>
            {/* <ImageContainer>
                <Image
                    width={180}
                    height={110}
                    src={item.doce.imagemDoce}
                    alt={item.doce.nomeDoce}
                />
            </ImageContainer> */}
            <Avatar src={item.doce.imagemDoce} sx={{ width: 60, height: 60, margin: 2, }} />

            <Content >
                <Typography sx={{ color: "#424242", fontSize: 16, mb: 1 }} >
                    <b>{item.doce.nomeDoce}</b>
                </Typography>
                <div>
                    <Typography sx={{ color: "#5c5c5c", fontSize: 13 }}  >
                        {/* sx={{color:"#424242", fontSize:18}} */}
                        {item.doce.peso.toString().length < 4 ? `${item.doce.peso} g` : `${item.doce.peso / 1000} Kg`}
                    </Typography>
                </div>
            </Content>
        </Col>

    );
}
