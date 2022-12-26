import { styled } from "..";

export const Button = styled('button', {
    background: '$pink300',
    border: '1px solid $pink300',
    boxSizing: 'border-box',
    borderRadius: 7,
    padding: 8,
    fontSize: '$small',
    color: '$white',
    width: '100%',
    transition: '0.2s',
    textAlign: 'center',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    // marginBottom: 15,
    // marginTop: 15,
    a: {
        textDecoration: 'none'
    },


    '&:not(:disabled):hover': {
        backgroundColor: '$pink500',
        borderColor: '$pink500',
    },

    '&:disabled': {
        /* background-color: #e6e6e6; */
        opacity: 0.3
    }
})