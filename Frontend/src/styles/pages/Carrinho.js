import { Card } from "@mui/material";
import { styled } from "..";
import { IconButton } from "@mui/material";


export const StyledCard = styled(Card, {
    boxShadow: '0px 1px 10px 1px rgba(97, 97, 97, 0.125)',
    backgroundColor: "$white",
    maxHeight: 1000,
    width: 800,
    padding: "1rem"

})

export const ImageContainer = styled('div', {
    position: 'relative',
})

export const DivImage = styled('div', {
    overflow: 'hidden',
    width: 80,
    height: 70,
    position: 'relative',
    borderRadius: 4,
})

export const PinkLink = styled('a', {
    textDecoration: 'none',
    color: '$pink300',
    cursor: 'pointer',

    '&:hover': {
        color: '$pink500',
    }
})

export const TabelaCarrinho = styled('table', {
    width: '100%',
    td: {
        borderBottom: '1px solid',
        borderColor: '$gray100',
        padding: '0.5rem 0'
    }
})

export const InputLabel = styled('label', {
    textAlign: 'left',
    color: '$gray300',
    fontSize: "$small",
    marginBottom: 0,
    width: '100%',
    paddingLeft: 5,
    marginTop: 10,
})

export const InputForm = styled('input', {
    background: '$white',
    border: '1px solid rgba(87, 87, 87, 0.19)',
    boxSizing: 'border-box',
    borderRadius: 7,
    padding: 9,
    fontSize: '$small',
    paddingLeft: 10,
    width: '100%',
})

export const TextareaForm = styled('textarea', {
    background: '$white',
    border: '1px solid rgba(87, 87, 87, 0.19)',
    boxSizing: 'border-box',
    borderRadius: 7,
    padding: 9,
    fontSize: '$small',
    paddingLeft: 10,
    width: '100%',
    height: 100,

    resize: 'none',

    '&:focus': {
        outline: 'none !important',
        borderColor: '$pink200',
    },

    '&:hover': {
        borderColor: '$pink500',
    },

})

export const ButtonRemove = styled(IconButton, {
    color: '$pink200',
    backgroundColor: '$white',
    // border: '1px solid',
    // borderColor: '$pink300',
    transition: ".5s all",
    '&:hover': {
        // backgroundColor: '$pink500',
        color: '$pink500',
    },
})


export const ContainerEndereco = styled('div', {
    padding: '10px 20px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    border: '2px solid',
    borderColor: '#FFF',
    borderRadius: 5,
    marginBottom: 5,
    // color: '$gray200',
    cursor: 'pointer',
    transition: '0.4s',

    '&:hover': {
        // backgroundColor: '#ffebf8'
        borderColor: '$pink100',
    },

    variants: {
        selected: {
            true: {
                borderColor: '$pink200',
                backgroundColor: '#ffebf8', //faf2f7
                color: 'Black'
            }

        }
    }
})

export const ContainerImage = styled('div', {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column'
})
