import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { styled } from '..';

export const StyledCard = styled(Card, {
    boxShadow: '0px 1px 10px 1px rgba(0,0,0,0.125)',
    transition: '.2s all',
    transitionTimingFunction: 'ease-in-out',

    '&:hover': {
        cursor: 'pointer',
        transform: 'scale(1.01)',
        '-webkit-transform': 'scale(1.01)',
        '-o-transform': 'scale(1.01)',
        boxShadow: '0px 8px 15px 1px rgba(0,0,0,0.125), 0px 1px 10px 1px rgba(99, 99, 99, 0.125)',
        flexGrow: 0,
        flexShrink: 1,
        flexBasis: 'auto',
    }
})

export const StyledCardContent = styled(CardContent, {
    paddingTop: 0,
    display: 'flex',
    flexDirection: "column",
    alignItems: 'start',
    justifyContent: 'start'
})