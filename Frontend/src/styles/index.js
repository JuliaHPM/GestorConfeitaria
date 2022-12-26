import { createStitches } from "@stitches/react";

export const {
    config,
    styled,
    css,
    globalCss,
    keyframes,
    getCssText,
    theme,
    createTheme,
} = createStitches({
    theme: {
        colors: {
            black: 'black',

            gray400: '#4A4A4A',
            gray300: 'gray',
            gray200: '#717171',
            gray100: '#A2A2A2',

            pink100: '#FFB9DF',
            pink200: '#F7A0CE',
            pink300: '#FF6AB9', //padrão
            pink500: '#F453A9', //mais escuro, hover

            white: '#FFFFFF',

            cancelado: '#717171',
            pendente: '#f8f54d',
            confirmado: '#4df883',
            finalizado: '#F7A0CE',

        },

        fontWeights: {
            light: '300',
            normal: '400',
            medium: '500',
            bold: '600',
            xBold: '700',
        },

        fontSizes: {
            xSmall: '0.75rem',
            small: '0.875rem',
            medium: '1rem',
            xMedium: '1.2rem',
            big: '1.5rem',
            large: '2rem',
            xLarge: '3rem',

        },

        fonts: {
            sans: 'sans-serif',
            roboto: 'Roboto, sans-serif',
            mono: 'monospace',
            raleway: 'Raleway, sans-serif',
        }
    }
})