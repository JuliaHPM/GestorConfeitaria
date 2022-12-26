import Card from '@mui/material/Card';
import { styled } from '..';

export const StyledCard = styled(Card, {
    transition: '.2s all',
    transitionTimingFunction: 'ease-in-out',
    width: 350,
    height: 170,
    display: 'flex',
    boxShadow: '0px 2px 8px 1px rgba(0,0,0,0.125)',

    '&:hover': {
        cursor: 'pointer',
        transform: 'scale(1.01)',
        '-webkit-transform': 'scale(1.01)',
        '-o-transform': 'scale(1.01)',
        boxShadow: '0px 8px 15px 1px rgba(0,0,0,0.125)',
        flexGrow: 0,
        flexShrink: 1,
        flexBasis: 'auto',
    }
})

export const ImageContainer = styled('div', {
    position: 'relative',
    width: 250,
    height: 170,
    overflow: 'hidden'
})

export const ContainerDescricao = styled('div', {
    display: '-webkit-box',
    maxWidth: '400px',
    height: 16 * 1.15 * 3, //$font-size*$line-height*$lines-to-show;
    '-webkit-line-clamp': 3,
    '-webkit-box-orient': 'vertical',
    overflow: 'hidden',
    textOverflow: "ellipsis",
    lineHeight: 1.15,
})