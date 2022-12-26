import { styled } from "..";

export const ContainerEndereco = styled('div', {
    padding: '10px 20px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    border: '2px solid',
    borderColor: '#FFF',
    borderRadius: 5,
    marginBottom: 5,
    // color: '$gray200',
    cursor: 'pointer',
    transition: '0.4s',

    '&:hover': {
        // backgroundColor: '#ffebf8'
        borderColor: '$pink100',
    },

    variants: {
        selected: {
            true: {
                borderColor: '$pink200',
                backgroundColor: '#ffebf8', //faf2f7
                color: 'Black'
            }

        }
    }
})