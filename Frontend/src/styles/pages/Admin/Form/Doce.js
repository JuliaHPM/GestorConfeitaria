import { styled } from "../../..";
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import MuiAccordion from '@mui/material/Accordion';
import MuiAccordionSummary from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import { styled as muiStyled } from '@mui/material/styles';

export const Accordion = muiStyled((props) => (
    <MuiAccordion disableGutters elevation={0} square={false} {...props} />
))(({ theme }) => ({
    border: `0px solid ${theme.palette.divider}`,
    '&:before': {
        display: 'none',
    },
}));

export const AccordionSummary = muiStyled((props) => (
    <MuiAccordionSummary
        expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: '0.9rem' }} />}
        {...props}
    />
))(({ theme }) => ({
    backgroundColor: 'white',
    flexDirection: 'row-reverse',
    '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
        transform: 'rotate(90deg)',
    },
    '& .MuiAccordionSummary-content': {
        marginLeft: theme.spacing(1),
    },
}));

export const AccordionDetails = muiStyled(MuiAccordionDetails)(({ theme }) => ({
    padding: theme.spacing(2),
    borderTop: '1px solid rgba(0, 0, 0, .125)',
}));

export const ImageContainer = styled('label', {
    position: 'relative',
    marginBottom: '1rem',

    '&:hover': {
        cursor: 'pointer',
        opacity: 0.8,
    },

    div: {
        overflow: 'hidden',
        width: 350,
        height: 250,
        position: 'relative',
    },

    span: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 99,
        padding: '0.5rem',
        position: 'absolute',
        bottom: -10,
        right: -10,
        border: 'solid 1px $gray100',
        background: 'white',
    }
})