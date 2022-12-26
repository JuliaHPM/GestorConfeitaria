import { styled } from "..";

export const ButtonQuantity = styled('button', {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    background: '$pink300',
    border: '0px solid',
    boxSizing: 'border-box',
    borderRadius: 7,
    padding: 8,
    color: '$white',
    //width: '100%',
    marginTop: 15,
    marginBottom: 15,
    width: '30px',
    height: '30px',
    textAlign: 'center',
    transition: '0.2s',
    //padding: 0

    '&:not(:disabled):hover': {
        backgroundColor: '$pink500'
    },

    '&:disabled': {
        /* background-color: #e6e6e6; */
        opacity: 0.3
    }
})

export const Container = styled('div', {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
})

export const Value = styled('p', {
    textAlign: 'center',
    margin: "0.5rem",
    padding: 0,
})
