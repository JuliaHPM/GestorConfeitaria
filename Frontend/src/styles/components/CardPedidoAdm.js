import Card from '@mui/material/Card';
import { styled } from '..';
import { IconButton } from "@mui/material";

export const StyledCard = styled(Card, {
    transition: '.2s all',
    transitionTimingFunction: 'ease-in-out',
    width: '100%',
    height: 380,
    display: 'flex',
    boxShadow: '0px 2px 8px 1px rgba(0,0,0,0.125)',
    margin: '1rem 0',
    padding: '2rem',
    borderRadius: 8,
    borderLeft: '15px solid',
    borderColor: '$pink100',
    flexDirection: 'column',
    overflow: 'visible',
    // opacity: 0.5,
    // border: '1px solid green',

    variants: {
        borderColor: {
            pendente: {
                borderColor: '$pendente',
            },
            confirmado: {
                borderColor: '$confirmado',
            },
            finalizado: {
                borderColor: '$finalizado',
                opacity: 0.5,
            },
            cancelado: {
                borderColor: '$cancelado',
                opacity: 0.5,
            }
        }
    }
})

export const ContainerItens = styled('div', {
    height: '90px',
    overflow: 'auto',

})

export const ActionButton = styled('div', {
    display: 'flex',
    justifyContent: 'end',
    alignContent: 'center',
    // marginBottom: 2,
    margin: 'auto',
    // marginTop:"2rem",
    width: '40px'
})

export const ColorButton = styled(IconButton, {
    color: '#25D366',
    backgroundColor: '$white',
    border: '1px solid',
    borderColor: '#25D366',
    transition: ".5s all",
    '&:hover': {
        backgroundColor: '#25D366',
        color: '#ffffff',
        svg: {
            color: '#fff',
        }
    },

    '&:disabled': {
        borderColor: '$gray100',
    }
})