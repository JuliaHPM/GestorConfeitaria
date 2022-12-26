import * as React from 'react';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { StyledCard, StyledCardContent } from '../styles/components/CardHome';

export default function CardHome({ key, titulo, valor, imagem }) {

    return (

        <StyledCard sx={{ width: 200, height: 220 }} key={key}>
            <CardMedia
                component="img"
                height="160"
                // image={noImage}
                src={imagem !== null ? imagem : '/noImage.png'}
                alt={titulo}
                sx={{ padding: 2, borderRadius: 5 }}
            />
            <StyledCardContent>
                <Typography noWrap sx={{ color: "#424242", fontSize: 18, overflow: 'hidden', textOverflow: 'ellipsis', width: 150 }} >
                    <b>{titulo}</b>
                </Typography>
                <Typography variant="body2" sx={{ color: "#FF6AB9", fontWeight: "bold" }}>
                    {new Intl.NumberFormat('pt-BR', {
                        style: 'currency',
                        currency: 'BRL',
                    }).format(valor)}
                </Typography>
            </StyledCardContent>

        </StyledCard>

    );
}
