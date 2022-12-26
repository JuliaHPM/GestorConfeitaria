import { styled } from "../..";

export const CardPainel = styled('div', {
    transition: '.2s all',
    transitionTimingFunction: 'ease-in-out',
    display: 'flex',
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


    variants: {
        hover: {
            true: {
                '&:hover': {
                    cursor: 'pointer',
                    transform: 'scale(1.01)',
                    '-webkit-transform': 'scale(1.01)',
                    '-o-transform': 'scale(1.01)',
                    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.13)',

                }
            }
        }

    }
})

export const ContainerIcon = styled('div', {
    display: 'flex',
    alignItems: 'center',
    marginRight: '10px',
    borderRadius: '50%',
    padding: 20,

    variants: {
        color: {
            pendente: {
                backgroundColor: 'rgba(248,245,77,.4)',
                // '&:children'
            },
            confirmado: {
                backgroundColor: 'rgba(51, 170, 51, .1)',
            },
            finalizado: {
                backgroundColor: '$finalizado',
                opacity: 0.5,
            },
            cancelado: {
                backgroundColor: '$cancelado',
                opacity: 0.5,
            }
        }
    }
})

export const NumberCard = styled('label', {
    fontSize: 26,
    fontWeigth: 900,

    variants: {
        hover: {
            true: {
                '&:hover': {
                    cursor: 'pointer'
                }
            }
        }

    }
})

export const TitleCards = styled('label', {
    fontWeight: 600,
    fontSize: 19,
    display: 'flex',
    alignSelf: 'center',
    // color: 'gray',
    display: 'block',
    paddingBottom: '15px'
})

export const SubtitleCard = styled('label', {
    fontSize: 16,
    color: 'gray',
    display: 'block',

    variants: {
        hover: {
            true: {
                '&:hover': {
                    cursor: 'pointer'
                }
            }
        }

    }
})

export const InputForm = styled('input', {
    backgroundColor: 'transparent',
    border: 0,
    borderBottom: '2px solid',
    boxShadow: 'none',
    padding: '5px 9px',
    // margin: '10px 0px',
    fontSize: '$small',
    paddingLeft: 10,
    width: '100%',
    borderColor: 'rgba(87, 87, 87, 0.19)',

    '&:focus': {
        outline: 'none',
        borderColor: '$pink200',
    },

})