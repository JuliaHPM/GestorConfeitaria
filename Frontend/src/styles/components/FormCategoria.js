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
        width: 120,
        height: 120,
        
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
        bottom: -4,
        right: -5,
        border: 'solid 1px $gray100',
        background: 'white',
    }
})