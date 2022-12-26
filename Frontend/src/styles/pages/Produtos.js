import { styled } from "..";
import { Card, CardContent } from "@mui/material";
import { Container } from 'react-bootstrap';

export const ConteudoView = styled('div', {
    backgroundColor: "#ffeff9", //faf2f7 ffebf8
    minHeight: '89.9vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'left',
    paddingLeft: '7rem',
    paddingRight: '4rem',
})

export const InputPesquisa = styled('input', {
    background: '$white',
    border: '1px solid rgba(87, 87, 87, 0.19)',
    boxSizing: 'border-box',
    borderRadius: 5,
    padding: 9,
    fontSize: '$small',
    paddingLeft: 10,
    width: 200,

    '&:focus': {
        outlineOffset: 0,
        outline: '1px solid rgb(182, 182, 182)',
    }
})

export const CardFiltro = styled(Card, {
    backgroundColor: "$white",
    maxHeight: 700,
    minWidth: 170,
    maxWidth: 200,
    position: 'sticky',
    top: 10,
    //marginRight: '1rem',
})

export const Content = styled(CardContent, {
    alignItems: 'start',
    textAlign: 'start'
})

export const ProdutosList = styled('div', {
    display: 'flex',
    // justifyContent: 'space-between',
    gap: '1.5rem',
    flexWrap: 'wrap',
    paddingLeft: '3rem',
    maxHeight: 170
    //maxWidth: '60%',
})