import Image from "next/future/image";
import React from "react";
import { ActionButton, ColorButton, FooterClean, FooterContainer, LinkFooter } from "../styles/components/Footer";
import Logo from "../img/logo1.svg";
import { Col, Row } from "react-bootstrap";
import { Tooltip } from "@mui/material";
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import InstaIcon from '../img/icons/insta.svg'
import Link from "next/link";

export default function Footer() {

    // function callWhats(){
    //     const tel = telefone.replace(/\D/g, '');

    //     window.open(
    //         `https://wa.me/${tel}`,
    //         '_blank');
    // }

    return (
        <>
            <FooterClean>
                <FooterContainer>

                    <Row style={{ display: 'flex', justifyContent: 'center' }}>
                        {/* <div className="col-sm-4 col-md-3 item">
                                <h4>Serviços</h4>
                                <ul>
                                    <li><a href="#">Web design</a></li>
                                    <li><a href="#">Development</a></li>
                                    <li><a href="#">Hosting</a></li>
                                </ul>
                            </div> */}
                        <Col sm={4} lg={4}>
                            <h5>Links</h5>
                            <div style={{ display: 'flex', flexDirection: 'column' }}>
                                <LinkFooter href={'/produtos'} >Doces</LinkFooter>
                                <LinkFooter href={'/sobre'} >Sobre</LinkFooter>
                            </div>
                        </Col>

                        <Col sm={4} lg={4}>
                            <Image src={Logo} alt="Logo" layout="fixed" quality={100} width={280} />
                            <div style={{ marginTop: 20, display: 'flex', alignContent: 'start', gap: 10 }}>
                                <ActionButton onClick={() => window.open(`https://wa.me/5496878198`, '_blank')}>
                                    <ColorButton color="green" aria-label="WhatsApp" type="button" >
                                        <WhatsAppIcon />
                                    </ColorButton>
                                </ActionButton>
                                <ActionButton onClick={() => window.open(`https://www.instagram.com/mah.doces.e.artes/`, '_blank')}>
                                    <ColorButton style={{ padding: 2 }} color="pink" aria-label="WhatsApp" type="button" onClick={() => callWhats(pedido.cliente.telefone)}>
                                        <Image src={InstaIcon} alt="instaIcon" width={35} height={35} />
                                    </ColorButton>
                                </ActionButton>
                            </div>
                        </Col>

                    </Row>
                    <Row style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', textAlign: 'center' }}>
                        <Col sm={4} lg={4}>
                            <p style={{ margin: 0, marginTop: 30, fontSize: 15, color: '#727272' }}>
                                <a href="https://github.com/JuliaHPM" style={{ color: '#7e7e7e' }}>JuliaHPM</a> 2022
                            </p>
                        </Col>
                    </Row>

                </FooterContainer>
            </FooterClean>
        </>
    )
}