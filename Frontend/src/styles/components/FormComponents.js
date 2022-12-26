import { styled } from "..";
import { NumericFormat, PatternFormat } from 'react-number-format';
import { FormCheck } from 'react-bootstrap';
import Switch from '@mui/material/Switch';
import { IconButton } from "@mui/material";

export const StyledSwitch = styled(Switch, {
    '& .MuiSwitch-switchBase.Mui-checked': {
        color: '$pink300',
        '&:hover': {
            backgroundColor: 'rgba(255, 106, 185, 0.15)',

        },
    },
    '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
        backgroundColor: '$pink300',
    },
});

export const InputLabel = styled('label', {
    textAlign: 'left',
    fontSize: '$small',
    marginBottom: 0,
    width: '100%',
    paddingLeft: 5,
    marginTop: 10,

    variants: {
        color: {
            error: {
                color: 'red',
            },
            normal: {
                color: '$gray300',
            }
        }
    },

    defaultVariants: {
        color: "normal"
    }
})

export const StyledNumericInput = styled(NumericFormat, {
    background: '$white',
    border: '1px solid',
    boxSizing: 'border-box',
    borderRadius: 8,
    padding: 9,
    fontSize: '$small',
    paddingLeft: 10,
    width: '100%',
    '-webkit-box-shadow': '0 0 0px 1000px white inset',

    '&:focus': {
        outline: 'none',
        borderColor: '$pink200',

    },

    variants: {
        color: {
            error: {
                borderColor: 'red',
            },
            normal: {
                borderColor: 'rgba(87, 87, 87, 0.19)',
            }
        }
    },
})

export const StyledInputMask = styled(PatternFormat, {
    background: '$white',
    border: '1px solid',
    boxSizing: 'border-box',
    borderRadius: 8,
    padding: 9,
    fontSize: '$small',
    paddingLeft: 10,
    width: '100%',
    '-webkit-box-shadow': '0 0 0px 1000px white inset',

    '&:focus': {
        outline: 'none',
        borderColor: '$pink200',

    },

    variants: {
        color: {
            error: {
                borderColor: 'red',
            },
            normal: {
                borderColor: 'rgba(87, 87, 87, 0.19)',
            }
        }
    },
})
export const TextArea = styled('textarea', {
    background: '$white',
    border: '1px solid',
    boxSizing: 'border-box',
    borderRadius: 8,
    padding: 9,
    fontSize: '$small',
    paddingLeft: 10,
    width: '100%',
    resize: 'none',
    '-webkit-box-shadow': '0 0 0px 1000px white inset',

    '&:focus': {
        outline: 'none',
        borderColor: '$pink200',
    },

    variants: {
        color: {
            error: {
                borderColor: 'red',
            },
            normal: {
                borderColor: 'rgba(87, 87, 87, 0.19)',
            }
        },
        size: {
            lg: {
                height: '8rem'
            }
        }
    }
})
export const InputForm = styled('input', {
    background: '$white',
    border: '1px solid',
    boxSizing: 'border-box',
    borderRadius: 8,
    padding: 9,
    fontSize: '$small',
    paddingLeft: 10,
    width: '100%',
    '-webkit-box-shadow': '0 0 0px 1000px white inset',

    '&:focus': {
        outline: 'none',
        borderColor: '$pink200',
    },

    variants: {
        color: {
            error: {
                borderColor: 'red',
            },
            normal: {
                borderColor: 'rgba(87, 87, 87, 0.19)',
            }
        }
    }
})

export const ErrorText = styled('p', {
    color: 'red',
    fontSize: '$xSmall',
    textAlign: 'left',
    margin: 0,
    lineHeight: '110%'
})

export const StyledFormCheck = styled(FormCheck, {
    label: {
        textAlign: 'left',
        color: '$gray300',
        fontSize: '$small',
        marginBottom: 0,
        width: '100%',
        paddingLeft: 5,
    },
    borderColor: '$pink300',
})

export const SubTitle = styled('span', {
    fontWeight: '$light',
    fontSize: '$big',
    marginTop: 15,
    marginBottom: 0,
    textAlign: 'left',
    color: '$gray200',
})

export const ColorButton = styled(IconButton, {
    color: '$pink300',
    backgroundColor: '$white',
    border: '1px solid',
    borderColor: '$pink300',
    transition: ".5s all",
    '&:hover': {
        backgroundColor: '$pink500',
        color: '#ffffff',
        svg: {
            color: '#fff',
        }
    },

    '&:disabled': {
        borderColor: '$gray100',
    }
})

export const Table = styled('table', {
    borderCollapse: 'collapse',
    borderRadius: 8,
    width: '100%',
    marginTop: '1rem',
    marginBottom: '1rem',
    border: '1px solid rgba(87, 87, 87, 0.19)',
    display: 'inline-block',
    overflow: 'auto',
    maxHeight: 286,

    'tr:nth-child(odd)': {
        background: '#fff0fa',
    },

    th: {
        padding: '1rem',
        // textTransform: 'uppercase',
        letterSpacing: '0.1rem',
        fontWeight: '500',
        background: 'white',
    },

    td: {
        padding: '0.5rem 1rem',
    },
})

export const ActionButton = styled(IconButton, {
    textDecoration: 'none',
    cursor: 'pointer',


    svg: {
        color: '$pink300',
        transition: ".5s all",
    },

})

export const SmallOptionMessage = styled('div', {
    display: 'flex',
    justifyContent: 'center',
    marginTop: '1rem',

    span: {
        fontSize: '$small',
        color: '$gray200'
    },

    a: {
        textDecoration: 'none',
        color: '$gray300',

        '&:hover': {
            color: '$gray400'
        }
    }
})