import React, { useEffect, useState } from "react";
import Logo from "../img/logo1.svg";
import { Navbar, Container, Nav, NavDropdown } from 'react-bootstrap';
import Link from 'next/link';
import IconIngredientes from "../img/icons/ingredientes.png"
import IconReceita from "../img/icons/receita.png"
import IconDoce from "../img/icons/doce.png"
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Badge from '@mui/material/Badge';
import EventAvailableOutlinedIcon from '@mui/icons-material/EventAvailableOutlined';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import ReceiptLongOutlinedIcon from '@mui/icons-material/ReceiptLongOutlined';
import HelpOutlineOutlinedIcon from '@mui/icons-material/HelpOutlineOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import Image from "next/future/image";
import BookmarkBorderOutlinedIcon from '@mui/icons-material/BookmarkBorderOutlined';
import { useCarrinho } from "../hooks/useCarrinho";
import { Avatar, Tooltip } from "@mui/material";
import { useAuth } from "../hooks/useAuth";
import { Can } from "./Can";

export default function Header() {
    const { user, logOut } = useAuth();

    const { data: itens } = useCarrinho(user?.carrinho.id);


    const quantidadeItensCarrinho = itens?.length;

    //se for adm alterar o menu para lateral?

    return (
        <>
            <Navbar collapseOnSelect expand="lg" bg="white" className="shadow-sm p-1 py-2 mb-0 bg-white sticky-top" >
                <Container>
                    <Navbar.Brand href="/">
                        <Image src={Logo} alt="Logo" layout="fixed" quality={100} width={280} />
                        {/* MeuDocinho */}
                    </Navbar.Brand>

                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="me-auto align-items-center ">
                            <Can cliente notAuthenticated>
                                <Nav.Link href="/"> Home </Nav.Link>
                            </Can>

                            <Nav.Link as={Link} href="/produtos"> Doces </Nav.Link>
                            <Can>
                                <Nav.Link as={Link} href="/meusPedidos"> Meus Pedidos </Nav.Link>
                            </Can>
                            <Can cliente notAuthenticated>
                                <Nav.Link as={Link} href="/sobre"> Sobre </Nav.Link>
                            </Can>


                            <Can admin>
                                <NavDropdown title="Cadastros" id="collasible-nav-dropdown">
                                    <NavDropdown.Item as={Link} href="/Admin/IngredientesCadastrados"><Image src={IconIngredientes} alt="icon" width={21} height={21} /> Ingrediente</NavDropdown.Item>
                                    <NavDropdown.Item as={Link} href="/Admin/ReceitasCadastradas"><Image src={IconReceita} alt="icon" width={21} height={21} /> Receita</NavDropdown.Item>
                                    <NavDropdown.Item as={Link} href="/Admin/DocesCadastrados"><Image src={IconDoce} alt="icon" width={21} height={21} /> Doce</NavDropdown.Item>
                                    <NavDropdown.Divider />
                                    <NavDropdown.Item as={Link} href="/Admin/CategoriasCadastradas"> <BookmarkBorderOutlinedIcon /> Categorias</NavDropdown.Item>
                                    {/* <NavDropdown.Item> <EventAvailableOutlinedIcon />  Pedidos por dia</NavDropdown.Item> */}
                                </NavDropdown>

                                <Nav.Link as={Link} href="/Admin/painel"> Painel </Nav.Link>
                                <Nav.Link as={Link} href="/Admin/pedidos"> Pedidos </Nav.Link>
                                <Nav.Link as={Link} href="/Admin/relatorios"> Relatórios </Nav.Link>
                                {/* <Nav.Link as={Link} href="#"> Calendário </Nav.Link> */}
                            </Can>


                        </Nav>
                        <Nav className="align-items-center">
                            <Can notAuthenticated>
                                <Nav.Link as={Link} href="/login"> Login</Nav.Link>
                                <Nav.Link as={Link} href="/cadastro"> Cadastre-se </Nav.Link>
                            </Can>

                            <Nav.Link as={Link} href="/carrinho" className="me-1">
                                <Badge
                                    badgeContent={quantidadeItensCarrinho}
                                    sx={{
                                        "& .MuiBadge-badge": {
                                            color: "white",
                                            backgroundColor: "#FF6AB9"
                                        }
                                    }}>
                                    <ShoppingCartIcon
                                        fontSize="medium"
                                    />
                                </Badge>
                            </Nav.Link>

                            <Can >
                                <NavDropdown title={
                                    <Tooltip title={user?.email}>
                                        <Avatar src={user?.fotoPerfil} alt="" sx={{ display: 'inline-flex', width: 35, height: 35, }} />
                                    </Tooltip>
                                } id="collasible-nav-dropdown">
                                    <NavDropdown.Item as={Link} href="/perfil" >
                                        <PersonOutlineOutlinedIcon /> Perfil
                                    </NavDropdown.Item>
                                    <NavDropdown.Item as={Link} href="/meusPedidos" >
                                        <ReceiptLongOutlinedIcon /> Meus Pedidos
                                    </NavDropdown.Item>
                                    {/* <NavDropdown.Item disabled as={Link} href="#action/3.2">
                                        <HelpOutlineOutlinedIcon /> Ajuda
                                    </NavDropdown.Item> */}
                                    <Can admin>
                                        <NavDropdown.Item as={Link} href="/Admin/settings">
                                            <SettingsOutlinedIcon /> Configurações
                                        </NavDropdown.Item>
                                    </Can>
                                    <NavDropdown.Divider />
                                    <NavDropdown.Item onClick={logOut}>
                                        <LogoutOutlinedIcon /> Logout
                                    </NavDropdown.Item>
                                </NavDropdown>
                            </Can>

                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    )
}