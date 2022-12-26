import { styled } from "..";
import { IconButton } from "@mui/material";
import Link from "next/link";

export const FooterClean = styled('div', {
    padding: '50px 0',
    backgroundColor: '$white',
    color: '$gray',

    h3: {
        marginTop: 0,
        marginBottom: 12,
        fontWeight: 'bold',
        fontSize: '2rem',
    },

    ul: {
        padding: 0,
        listStyle: 'none',
        lineHeight: 1.6,
        fontSize: 14,
        marginBottom: 0,

        a: {
            color: 'inherit',
            textDecoration: 'none',
            opacity: 0.8,

            '&:hover': {
                opacity: 1
            }
        }
    }
})

export const FooterContainer = styled('footer', {
    backgroundColor: '#F9D8E9',
    /* margin-top: auto; */
    position: 'absolute',
    bottom: 0,
    width: '100%',
    padding: '50px 150px',
    paddingBottom: 20
})

export const FooterAuthor = styled('div', {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    backgroundColor: '#FF6AB9',
})

export const ActionButton = styled('div', {
    display: 'flex',
    justifyContent: 'end',
    alignContent: 'center',
    // marginBottom: 2,
    // margin: 'auto',
    // marginTop:"2rem",
    width: '40px'
})

export const ColorButton = styled(IconButton, {
    color: '#FFFF',
    backgroundColor: 'none',
    border: '1px solid',
    borderColor: '#FFFF',
    transition: ".5s all",
    '&:hover': {
        // backgroundColor: '#25D366',
        color: '#ffffff',
        svg: {
            color: '#fff',
        }
    },

    variants: {
        color: {
            green: {
                backgroundColor: '#25D366',
                borderColor: '#25D366',
                '&:hover': {
                    backgroundColor: '#10b369'
                }
            },
            pink: {
                backgroundColor: '#FF6AB9',
                borderColor: '#FF6AB9',
                '&:hover': {
                    backgroundColor: '#F453A9'
                }
            }
        }
    }
})

export const LinkFooter = styled(Link, {
    textDecoration: 'none',
    color: '#494949',
    '&:hover': { color: 'black' }
})