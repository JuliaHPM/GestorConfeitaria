import { styled } from '../';

export const ImageContainer = styled('div', {
    width: '100%',
    maxWidth: 180,
    height: 180,
    // padding: '1rem',
    marginBottom: '1rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: '10rem',


    '& + &': {
        marginLeft: -75,
    }

})

export const ContainerInfo = styled('div', {
    display: 'flex',
    alignItems: 'center',
    gap: 10,
    marginBottom: '1.2rem'
})

export const Subtitle = styled('label', {
    lineHeight: 1.3,
    fontWeight: '$bold',
    color: '$gray400',
    fontFamily: '$roboto'
})

export const Info = styled('div', {
    display: 'flex',
    flexDirection: 'column'
})
