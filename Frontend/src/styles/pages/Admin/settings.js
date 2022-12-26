import { styled } from "../..";

export const Container = styled('div', {
    padding: '4rem',
    display: 'grid',
    gridTemplateColumns: '0.5fr 2fr',
    gap: '4rem',
    margin: '0 10rem',

})

export const AdmContainer = styled('div', {
    display: 'flex',
    alignItems: 'center',
    height: 80,

})


export const Menu = styled('aside', {
    //boxShadow: "rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px;",
    padding: '2rem',
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
    borderRadius: 8
})

export const MenuItem = styled('span', {
    padding: '0.3rem',
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    //marginLeft: '0.8rem',



    // '&+&': {
    //     borderTop: '1px solid $gray100'
    // },

    variants: {
        selected: {
            true: {
                color: '$pink500',
                cursor: 'default'
            },
            false: {
                '&:hover': {
                    cursor: 'pointer',
                    color: '$pink500',
                },
            }
        }
    },

    defaultVariants: {
        selected: false
    }
})

export const MenuTitle = styled('span', {
    fontWeight: 'bold',
    color: '$gray100',
    fontSize: '$small',
    marginBottom: '1.5rem',
})