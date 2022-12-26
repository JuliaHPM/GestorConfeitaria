import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import { styled } from '..';

export const StyledCard = styled(Card, {
    // width: 416,
    // height: 140,
    // display: 'flex',
    // alignItems: 'center',
    // marginBottom: 2,
    // boxShadow: '0px 2px 8px 1px rgba(0,0,0,0.125)',
    transition: '.2s all',
    transitionTimingFunction: 'ease-in-out',
    // flexDirection: 'column',
    padding: '15px 20px',
    // backgroundColor: '#FFF',
    margin: '20px 5px',
    // maxHeight: 400,
    // border: '2px solid',

    /* From https://css.glass */
    background: 'rgba(255, 255, 255, 0.6)',
    borderRadius: 16,
    boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
    // backdropFilter: 'blur(7.2px)',
    '-webkit-backdrop-filter': 'blur(7.2px)',
    border: '1px solid rgba(255, 255, 255, 0.18)',

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