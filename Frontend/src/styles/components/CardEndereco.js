import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { styled } from '..';

export const StyledCard = styled(Card, {
    boxShadow: '0px 0px 0px 0px rgba(0,0,0,0.125)',
    transition: '.2s all',
    transitionTimingFunction: 'ease-in-out',
    border: '1px solid',
    borderColor: 'rgba(87, 87, 87, 0.19)',
    borderRadius: 5,
    padding:'auto',

    button: {
        transform: 'translateX(110%)',
        opacity: 0,
        transition: "all 0.2s ease-in-out",
        //transition: '0.5s ease-in-out',
    },

    '&:hover': {
        // cursor: 'pointer',
        // transform: 'scale(1.01)',
        // '-webkit-transform': 'scale(1.01)',
        // '-o-transform': 'scale(1.01)',
        // boxShadow: '0px 8px 15px 1px rgba(0,0,0,0.125), 0px 1px 10px 1px rgba(99, 99, 99, 0.125)',
        // flexGrow: 0,
        // flexShrink: 1,
        // flexBasis: 'auto',

        button: {
            transform: 'translateY(0%)',
            opacity: 1,
            //transition: '0.5s ease-in-out',
        }
    }
})

export const StyledCardContent = styled(CardContent, {
    // padding: 'auto',
    paddingTop: 24,
    display: 'flex',
    flexDirection: "column",
    // alignItems: 'start',
    margin:'auto',
    justifyContent: 'center',
    width: "100%", 
    height: 120, 
})