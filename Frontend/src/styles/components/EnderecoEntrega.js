import { styled } from "..";

export const PinkLink = styled('a', {
    textDecoration: 'none',
    color: '$pink300',
    cursor: 'pointer',

    '&:hover': {
        color: '$pink500',
    }
})