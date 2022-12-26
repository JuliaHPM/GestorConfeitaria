import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import { styled } from '..';

export const StyledCard = styled(Card, {
    width: 416,
    height: 140,
    display: 'flex',
    alignItems: 'center',
    marginBottom: 2,
    boxShadow: '0px 2px 8px 1px rgba(0,0,0,0.125)',

    button: {
        transform: 'translateX(110%)',
        opacity: 0,
        transition: "all 0.2s ease-in-out"
        //transition: '0.5s ease-in-out',
    },

    '&:hover': {

        cursor: 'pointer',
        transform: 'scale(1.01)',
        '-webkit-transform': 'scale(1.01)',
        '-o-transform': 'scale(1.01)',
        boxShadow: '0px 8px 15px 1px rgba(0,0,0,0.125)',
        flexGrow: 0,
        flexShrink: 1,
        flexBasis: 'auto',

        button: {
            transform: 'translateY(0%)',
            opacity: 1,
            //transition: '0.5s ease-in-out',
        }
    }

})

export const Content = styled(CardContent, {
    padding: '20px',
    paddingLeft: 0,
    display: 'flex',
    flexDirection: "column",
    textAlign: "start",
    alignItems: 'start',
    justifyContent: 'start'
})

export const VerMaisButton = styled('button', {
    background: '$pink300',
    border: '0px solid',
    boxSizing: 'border-box',
    borderRadius: 7,
    padding: 8,
    fontSize: '$small',
    color: '$white',
    width: '100%',


    '&:not(:disabled):hover': {
        backgroundColor: '$pink500'
    },

    '&:disabled': {
        opacity: 0.3
    }
})

export const ImageContainer = styled('div', {
    overflow: 'hidden',
    maxWidth: 140,
    margin: '0 1rem',
    borderRadius: 4,
    display: 'flex',
    justifyContent: 'center'
})

export const Footer = styled('footer', {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'baseline',
    justifyContent: 'space-between'
})