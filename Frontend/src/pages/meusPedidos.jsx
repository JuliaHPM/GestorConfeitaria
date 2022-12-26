import React, { useEffect, useState } from "react";
// import { useFetch } from "../../hooks/useFetch";
import { Container, Row, Col } from "react-bootstrap";
import { Typography, Accordion, AccordionSummary, AccordionDetails, Divider, AccordionActions, Button, Avatar } from "@mui/material";
import { Box } from "@mui/system";
import { Title } from "../components/Title";
import { Chip, IconStatusPedido, PedidoCard, PedidosContainer, PinkLink } from "../styles/pages/MeusPedidos";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { EnderecoEntrega } from "../components/EnderecoEntrega";
import { usePedidosCliente } from "../hooks/usePedidosCliente";
import { withSSRAuth } from "../utils/withSSRAuth";
import { ItensPedido } from "../components/ItensPedido";
import { setupAPIClient } from "../lib/api";
import Spinner from "../components/Spinner";

export default function MeusPedidos({ usuario }) {

    const { data: pedidos, isLoading, isFetching } = usePedidosCliente(usuario.id);

    const options = { style: 'currency', currency: 'BRL', minimumFractionDigits: 2, maximumFractionDigits: 3 }
    const formatNumber = new Intl.NumberFormat('pt-BR', options)

    return (
        <>
            <div >
                <Container >
                    <Title title={'Meus pedidos'} />
                    <PedidosContainer >

                        {/* card filtros */}
                        {pedidos?.length > 0 ? pedidos.map(pedido => (
                            <Accordion key={pedido.id} sx={{
                                marginBottom: '1rem', boxShadow: '0px 2px 8px 1px rgba(0,0,0,0.125)', padding: '1rem', '&:before': { display: 'none' }
                            }}>
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls="panel1c-content"
                                    id="panel1c-header"
                                >
                                    <div style={{ display: 'flex', flexDirection: 'column', marginRight: '2rem', width: 100 }}>
                                        <Typography style={{ fontSize: 20 }}>Pedido {pedido.id}</Typography>
                                        <div>
                                            <IconStatusPedido status={pedido.status} />
                                            <Typography variant="caption">{pedido.status}</Typography>
                                        </div>
                                    </div>

                                    <div style={{ display: 'flex', alignItems: 'center', marginRight: '0.5rem', width: 200 }}>
                                        <ItensPedido itens={pedido.itensPedido} />
                                    </div>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', justifyContent: 'end', marginRight: '0.5rem' }}>
                                        <div style={{ width: 120, display: 'flex', justifyContent: 'center' }}>

                                            {pedido.pago ?
                                                <Chip label="Pago" variant="outlined" color="success" />

                                                :
                                                <Chip label="Não pago" variant="outlined" color="error" />
                                            }
                                        </div>
                                        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                                            <Typography sx={{ fontSize: 15 }}>{pedido.tipoEntrega} em </Typography>
                                            <Typography sx={{ fontSize: 17 }}>{pedido.dataEntrega} </Typography>
                                        </div>
                                    </div>

                                </AccordionSummary>
                                <Divider color="gray" />
                                <AccordionDetails style={{ padding: '1rem 2rem' }}>

                                    <div >
                                        {/* <Typography style={{ fontWeight: 'bold' }}>Doces</Typography> */}
                                        {pedido.itensPedido.map(item => (
                                            <Row key={item.id} style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
                                                <Col sm={5} md={2} lg={7}> <Typography variant="subtitle2">{item.quantidade}x {item.doce.nomeDoce}</Typography></Col>
                                                <Col sm={1} md={2} lg={3}><Typography variant="subtitle2"> {formatNumber.format(item.valorTotal)}</Typography></Col>
                                            </Row>

                                        ))}
                                    </div>

                                    <Divider color="gray" style={{ margin: '1rem 0' }} />

                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.2rem' }}>
                                        <Row style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
                                            <Col sm={1} md={2} lg={4}>  <Typography style={{ fontWeight: 'bold' }}>Subtotal</Typography></Col>
                                            <Col sm={1} md={2} lg={3}><Typography style={{ fontWeight: 'bold' }}> {pedido.subtotal}</Typography></Col>
                                        </Row>
                                        <Row style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
                                            <Col sm={1} md={2} lg={4}>  <Typography style={{ color: 'gray' }}>Taxa de entrega</Typography></Col>
                                            <Col sm={1} md={2} lg={3}><Typography style={{ color: 'gray' }}>{pedido.valorEntrega}</Typography></Col>
                                        </Row>
                                        <Row style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
                                            <Col sm={1} md={2} lg={4}>  <Typography style={{ fontWeight: 'bold' }}>Total</Typography></Col>
                                            <Col sm={1} md={2} lg={3}><Typography style={{ fontWeight: 'bold' }}> {pedido.total}</Typography></Col>
                                        </Row>
                                    </div>

                                    <Divider color="gray" style={{ margin: '1rem 0' }} />

                                    <div>
                                        <Typography style={{ color: "gray", fontSize: 14 }}>Endereço de {pedido.tipoEntrega}:</Typography>
                                        {pedido.tipoEntrega === 'retirada' ?
                                            <EnderecoEntrega
                                                rua="Reinaldo Kuka"
                                                bairro="Victoria I"
                                                cidade="Erechim"
                                                numero="185"
                                                retirada
                                            />
                                            :
                                            <EnderecoEntrega
                                                rua={pedido.endereco?.rua}
                                                bairro={pedido.endereco?.bairro}
                                                cidade={pedido.endereco?.cidade}
                                                numero={pedido.endereco?.numero}
                                            />
                                        }

                                        {pedido.endereco?.pontoReferencia &&
                                            <div>
                                                <Typography style={{ color: 'gray' }}>Ponto de referência:  {pedido.endereco.pontoReferencia}</Typography>

                                            </div>
                                        }
                                    </div>

                                </AccordionDetails>
                            </Accordion>
                        ))
                            :
                            !isFetching && !isLoading ?
                                <div style={{ display: 'flex', justifyContent: 'center' }}>
                                    <p style={{ fontSize: 15, color: '#595959' }}>Nenhum pedido registrado</p>
                                </div>
                                :
                                <div style={{ display: 'flex', justifyContent: 'center' }}>
                                    <Spinner size={20} />
                                </div>
                        }
                    </PedidosContainer>
                </Container>
            </div>
        </>
    )
}

export const getServerSideProps = withSSRAuth(async (ctx) => {
    const apiClient = setupAPIClient(ctx);
    const res = await apiClient.get('/me');

    return {
        props: {
            usuario: res.data,
        },

    }
})