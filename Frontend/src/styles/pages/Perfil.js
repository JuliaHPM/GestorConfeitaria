import { IconButton } from "@mui/material";
import { styled } from "../";

export const ImageContainer = styled('label', {
    position: 'relative',
    marginBottom: '1rem',

    '&:hover': {
        cursor: 'pointer',
        opacity: 0.8,
    },

    div: {
        overflow: 'hidden',
        width: 180,
        height: 180,

        // borderRadius: 50
        // position: 'relative',
    },

    span: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 99,
        padding: '0.5rem',
        position: 'absolute',
        bottom: 2,
        right: 4,
        border: 'solid 1px $gray100',
        background: 'white',
    }
})


export const ContainerHeaderEnderecos = styled('div', {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
    marginTop: '2rem',
    // width: '91%'
})

export const ColorButton = styled(IconButton, {
    color: '$pink300',
    backgroundColor: '$white',
    border: '1px solid',
    borderColor: '$pink300',
    transition: ".5s all",
    '&:hover': {
        backgroundColor: '$pink500',
        color: '#ffffff',
    },
})

export const BtnExcluirConta = styled('label', {
    color: 'red',
    paddingLeft: 5,
    cursor: 'pointer',

    '&:hover': {
        color: 'IndianRed'
    }
})