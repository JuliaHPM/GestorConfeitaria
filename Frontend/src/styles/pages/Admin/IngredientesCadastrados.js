import { styled } from "../..";
import { IconButton } from "@mui/material";


export const IconAdd = styled('div', {
    display: 'flex',
    justifyContent: 'end',
    alignContent: 'center',
    marginBottom: 10,
    marginTop: -30,
    width: '91%'
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

export const ActionButton = styled(IconButton, {
    textDecoration: 'none',
    color: '$pink200',
    cursor: 'pointer',

    svg: {
        color: '$pink200',

        '&:hover': {
            color: '$pink300'
        },
    }
})