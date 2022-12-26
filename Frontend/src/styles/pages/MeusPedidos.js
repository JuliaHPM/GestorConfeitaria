import { styled } from "..";
import { Chip as MUIChip } from "@mui/material";
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';

export const PedidosContainer = styled('div', {
    width: 700,
    margin: 'auto'
})

export const PedidoCard = styled('div', {
    width: '80%',
    marginBottom: '1rem',
    border: '1px solid #f5eb53',
    padding: '0.5rem 1rem',
    borderRadius: 8,

})

export const PinkLink = styled('a', {
    textDecoration: 'none',
    color: '$pink300',
    cursor: 'pointer',

    '&:hover': {
        color: '$pink500',
    }
})

export const Chip = styled(MUIChip, {
    variants: {
        status: {
            Pendente: {
                backgroundColor: 'Yellow'
            },
            Confirmado: {
                backgroundColor: '#50d466'
            },

            Cancelado: {
                backgroundColor: '$gray100'
            }
        }
    },


})

export const IconStatusPedido = styled(FiberManualRecordIcon, {
    fontSize: 'small',
    marginRight: '0.2rem',

    variants: {
        status: {
            pendente: {
                color: 'Yellow',
            },
            confirmado: {
                color: '#50d466',
            },
            finalizado: {
                color: '#FF6AB9',
            },
            cancelado: {
                color: '$gray100',
            }
        }
    },


})

