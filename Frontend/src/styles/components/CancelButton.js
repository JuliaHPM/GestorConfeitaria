import { styled } from "..";

export const Button = styled('button', {
    border: '1px solid',
    borderColor: '$pink300',//'#b5b5b5',
    boxSizing: 'border-box',
    borderRadius: 7,
    padding: 8,
    fontSize: '$small',
    color: '$pink300',
    width: '100%',
    // marginTop: 15,
    // marginBottom: 15,
    backgroundColor: '$white',
    fontWeight: 'bold',
    transition: '0.2s',

    '&:hover': {
        borderColor: '$pink200',
        color: '$pink200',
        /* border: none; */
    }
})