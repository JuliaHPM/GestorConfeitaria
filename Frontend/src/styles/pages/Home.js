import { styled } from "..";
import bg1 from '../../img/DSC_2456.jpg';
import bg2 from '../../img/banner2.svg';

export const BannerHome = styled('div', {
    backgroundImage: `url(${bg1.src})`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    width: '100%',
    height: 330,
})

export const BannerHome2 = styled('div', {
    backgroundImage: `url(${bg2.src})`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    width: '100%',
    height: 400,
})

export const TitleHome = styled('h3', {
    fontFamily: "$raleway",
    fontWeight: "$xBold",
    fontSize: '$xLarge',
    color: '$white',
    margin: 'auto',
    paddingTop: 0,
    width: 450,
    backgroundColor: 'rgb(	255,	106,	185, 0.8)',//"$pink300",
    display: 'flex',
    justifyContent: 'center',
    borderRadius: 10,
})

export const SubtitleHome = styled('h4', {
    fontWeight: "$medium",
    fontSize: "$big",
    color: '$white',
    margin: 'auto',
    marginTop: '0.5rem',
    backgroundColor: 'rgb(247, 160,	206, 0.8)',//"$pink200",
    width: 550,
    borderRadius: 6,
    padding: 2
})

export const TextBanner = styled('h4', {
    fontWeight: "$medium",
    fontSize: "$big",
    color: '$white',
    margin: 'auto',
    marginTop: '0.5rem',
})



export const ProdutosRow = styled('div', {
    width: '90%',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 40,
    // marginBottom: '2rem',
    // marginTop: '0.5rem',
})

export const Button = styled('button', {
    background: '$pink300',
    fontWeight: '$bold',
    border: '0px solid',
    boxSizing: 'border-box',
    borderRadius: 7,
    padding: 8,
    fontSize: '$small',
    color: '$white',
    width: '100%',
    marginTop: 15,
    marginBottom: 15,

    '&:hover': {
        background: '$pink500',
    }
})

export const ImageContainer = styled('div', {
    img: {
        objectFit: 'cover',
        borderRadius: '50%',
        transition: '.2s all',
        transitionTimingFunction: 'ease-in-out',
        marginBottom: '1rem',

        '&:hover': {
            cursor: 'pointer',
            transform: 'scale(1.08)',
            ' -webkit-transform': 'scale(1.08)',
            ' -o-transform': 'scale(1.08)',
            boxShadow: ' 0px 8px 15px 1px rgba(0, 0, 0, 0.125)',
        }
    }
})