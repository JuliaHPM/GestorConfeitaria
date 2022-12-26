import { globalCss } from ".";

export const globalStyles = globalCss({
    '*': {
        margin: 0,
        padding: 0,
        boxSizing: "border-box",

        scrollbarWidth: "thin",
        scrollbarColor: '$pink100',

        '*::-webkit-scrollbar': {
            width: 12,
        },

        ' *::-webkit-scrollbar-track': {
            background: 'rgb(255, 255, 255)',
        },

        '*::-webkit-scrollbar-thumb': {
            backgroundColor: '$pink100',
            borderRadius: 20,
            border: '3px solid rgb(255, 255, 255)'
        },

        /* Mudar cor texto selecionado */
        '*::selection': {
            background: '$pink300',
            color: '$white',
        },


    },


    // 'code': {
    //     fontFamily: "source-code-pro, Menlo, Monaco, Consolas, 'Courier New',monospace"
    // },

    body: {
        '-webkit-font-smoothing': 'antialiased',
        '-moz-osx-font-smoothing': 'grayscale',
        position: 'relative',
        minHeight: '100vh'
    },

    'body, input, textarea, button': {
        fontFamily: '$sans',
    },
})