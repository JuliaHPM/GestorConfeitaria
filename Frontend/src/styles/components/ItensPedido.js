import { styled } from "..";

export const ImageContainer = styled('div', {
    width: '100%',
    display: 'flex',
    //alignItems: 'center',
    '& + &': {
        marginLeft: '-55%',
    }
})