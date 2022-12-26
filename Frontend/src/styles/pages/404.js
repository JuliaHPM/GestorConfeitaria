import { styled } from "..";

export const Container = styled('div', {
    display: 'flex',
    width: '100%',
    height: '80vh',
    justifyContent: 'center',
    alignItems: 'center',

    div: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        textAlign: 'center',
    }
})