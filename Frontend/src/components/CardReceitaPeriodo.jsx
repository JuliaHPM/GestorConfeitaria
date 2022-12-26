import * as React from 'react';
import Typography from '@mui/material/Typography';
import { Content, Footer, ImageContainer, StyledCard, VerMaisButton } from '../styles/components/CardDocePeriodo';
import Link from 'next/link';
import Image from 'next/future/image';
import { Avatar } from '@mui/material';
import { Col } from 'react-bootstrap';

export default function CardReceitaPeriodo({ receitas, quantidade }) {
    return (
        <>
            {receitas.map(receita => (

                <Col lg={4} key={receita.id} style={{ display: 'flex', alignItems: 'center', width: 300 }}>
                    <div style={{ color: "#424242", fontSize: 28, display: 'flex', alignItems: 'center', textAlign: 'center', padding: 1 }} >
                        <b>{quantidade}</b>
                    </div>

                    <Content >
                        <Typography sx={{ color: "#424242", fontSize: 16, mb: 1 }} >
                            <b>{receita.nome}</b>
                        </Typography>
                        <div>
                            <Typography sx={{ color: "#5c5c5c", fontSize: 13 }}  >
                                {/* sx={{color:"#424242", fontSize:18}} */}
                                peso total:
                                {receita.Receitas_doce.unidadeDeMedida === 'g/mL' ? `${receita.Receitas_doce.quantReceita * quantidade} g` : `${receita.Receitas_doce.quantReceita * quantidade} Kg`}
                            </Typography>
                        </div>
                    </Content>
                </Col>
            ))
            }
        </>
    );
}
