import { Box } from "@mui/system";
import Image from "next/future/image";
import { Container } from "react-bootstrap";
import { setupAPIClient } from "../lib/api";
import { withSSRAuth } from "../utils/withSSRAuth";
// import img from "../../img/mensagem.svg";
// import img from "../../img/finalcompra.svg";

import { Avatar, Grid, Typography } from "@mui/material";
import { dateFormatter, priceFormatter } from "../utils/formatter";
import { PrimaryButton } from "../components/PrimaryButton";
import { ContainerInfo, ImageContainer, Info, Subtitle } from "../styles/pages/Pedido";
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import PlaceIcon from '@mui/icons-material/Place';
import EventIcon from '@mui/icons-material/Event';
import { useEffect, useState } from "react";
import { queryClient } from "../lib/queryClient";
import AccessTimeFilledIcon from '@mui/icons-material/AccessTimeFilled';
import { differenceInSeconds } from "date-fns";
import Router from "next/router";

export default function Pedido({ pedido, user, settings }) {
    const [countDown, setCountDown] = useState(25);
    const [buttonClick, setButtonClick] = useState(false);

    useEffect(() => {
        queryClient.invalidateQueries('carrinho');
    }, [])

    useEffect(() => {
        if (countDown > 0) {
            setTimeout(() => setCountDown(countDown - 1), 1000);
        } else if (!buttonClick) {
            sendWhatsAppMessage();
            Router.push('/')
        }
    }, [countDown, buttonClick])

    function sendWhatsAppMessage() {
        setButtonClick(true);
        const tel = settings.telefoneConfeitaria.replace(/\D/g, '');
        window.open(
            `https://wa.me/${tel}?text=Oi%2C%20fiz%20um%20pedido%20no%20site%20e%20gostaria%20de%20definir%20mais%20alguns%20detalhes%20%3A%29%0A%0AInforma%C3%A7%C3%B5es%20do%20pedido%3A%0AID%3A%20${pedido.id}%0ACliente%3A%20${user.nome}%0ATotal%3A%20${priceFormatter.format(pedido.valorFinal)}%0ATipo%20de%20entrega%3A%20${pedido.tipoEntrega}`,
            '_blank');
    }

    return (
        <div style={{ width: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', height: '90vh', textAlign: 'center', flexDirection: 'column', margin: 'auto' }}>

            <div style={{ maxWidth: '100%' }}>


                {/* <Typography>Agora é só entrar em contato com a confeiteira para definir mais detalhes do pedido</Typography> */}
            </div>
            <Grid container style={{ width: '100%', justifyContent: 'center' }}>

                {/* <Typography>Tipo entrega: {pedido.tipoEntrega}</Typography> */}

                <Grid item style={{ textAlign: 'left', display: 'flex', justifyContent: 'center' }}>

                    <div>
                        <Typography style={{ fontSize: 32, color: "#ffa9c7", marginBottom: '2rem', fontWeight: 600 }}>
                            Uhu! Pedido enviado
                        </Typography>
                        <ContainerInfo>
                            <Avatar sx={{ bgcolor: '#b2a0f7', width: 38, height: 38 }}>
                                <EventIcon fontSize="small" />
                            </Avatar>
                            <Info>
                                <Subtitle >{pedido.tipoEntrega.charAt(0).toUpperCase() + pedido.tipoEntrega.slice(1)}</Subtitle>
                                <Typography>{dateFormatter.format(new Date(pedido.dataEntrega))}</Typography>
                            </Info>
                        </ContainerInfo>

                        <ContainerInfo>
                            <Avatar sx={{ bgcolor: '#fe3fcb', width: 38, height: 38 }}>
                                <PlaceIcon fontSize="small" />
                            </Avatar>
                            <Info>
                                <Subtitle>Endereço</Subtitle>
                                <Typography>
                                    {pedido.endereco ?
                                        ` ${pedido.endereco.rua}, ${pedido.endereco.numero} - ${pedido.endereco.bairro} - ${pedido.endereco.cidade}`
                                        :
                                        settings.enderecoOrigem
                                    }
                                </Typography>
                            </Info>
                        </ContainerInfo>

                        <ContainerInfo>
                            <Avatar sx={{ bgcolor: '#51d258', width: 38, height: 38 }}>
                                <AttachMoneyIcon fontSize="small" />
                            </Avatar>
                            <Info>
                                <Subtitle>Total</Subtitle>
                                <Typography>{priceFormatter.format(pedido.valorFinal)}</Typography>
                            </Info>
                        </ContainerInfo>

                        <ContainerInfo>
                            <Avatar sx={{ bgcolor: '#e5e80c', width: 38, height: 38 }}>
                                <AccessTimeFilledIcon fontSize="small" />
                            </Avatar>
                            <Info>
                                <Subtitle>Status</Subtitle>
                                <Typography>Em análise</Typography>
                            </Info>
                        </ContainerInfo>

                        <div>

                            <div style={{ margin: '1rem 0', maxWidth: '340px', lineHeight: 1.2, color: '#9b9b9b', }}>
                                <Typography variant="secondary" sx={{ fontSize: 14 }}>
                                    Para finalizar, nos envie uma mensagem no WhatsApp com as informações do pedido e forma de pagamento
                                </Typography>
                            </div>
                            <div style={{}}>
                                <div style={{ width: 250 }}>
                                    <PrimaryButton
                                        type='button'
                                        label={`Enviar mensagem ${countDown}`}
                                        icon={<WhatsAppIcon sx={{ marginRight: 1 }} />}
                                        onClick={sendWhatsAppMessage}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </Grid>
                <Grid item style={{ display: "flex", justifyContent: 'center', alignItems: 'center', width: '40%' }}>
                    {pedido.itensPedido.map((item, index) => {
                        if (index < 3)
                            return (
                                <ImageContainer key={item.id}>
                                    <Avatar
                                        src={item.doce.imagemDoce}
                                        alt=''
                                        sx={{
                                            width: 180,
                                            height: 180,
                                            boxShadow: '-6px 0px 11px rgba(17, 17, 17, 0.7)'
                                        }} />
                                </ImageContainer>
                            )
                    })}
                </Grid>
            </Grid>
        </div>
    )
}

export const getServerSideProps = withSSRAuth(async (ctx) => {
    const api = setupAPIClient(ctx);

    const user = (await api.get('/me')).data;

    if (ctx.query.id) {
        const res = await api.get(`/pedido/${ctx.query.id}`);
        const data = res.data;
        const settings = (await api.get('/settings/1')).data;

        // const endereco = await api.get(`/endereco/${data.idEnderecoEntrega}`)

        // const ingredientes = data.ingredientes.map(ingrediente => {
        //     return {
        //         nome: ingrediente.nome,
        //         marca: ingrediente.marca,
        //         idIngrediente: ingrediente.id,
        //         quantIngrediente: ingrediente.Ingredientes_receita.quantIngrediente,
        //         unidadeDeMedida: ingrediente.Ingredientes_receita.unidadeDeMedida,
        //     }
        // });

        // const receita = {
        //     ...data,
        //     ingredientes,
        // }

        return {
            props: {
                pedido: data,
                user,
                settings
            },

        }
    } else {
        //redirect
    }

}, {
    admin: false,
})