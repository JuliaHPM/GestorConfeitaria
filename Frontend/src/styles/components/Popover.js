import { styled } from "..";
import * as Popover from '@radix-ui/react-popover';


export const Trigger = styled(Popover.Trigger, {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '50%',
    padding: '4px',
    fontSize: 11,
    fontWeight: 500,
    height: '16px',
    width: '16px',
    backgroundColor: 'white',
    color: '$pink200',
    border: '2px solid $pink200',
    marginBottom: 2,
    // boxShadow: '0 2px 10px $pink200',

    '&:hover': {
        backgroundColor: '#FFEAFa'
    },
    '&:focus': {
        boxShadow: '0 0 0 2px $pink300'
    }
})

export const Content = styled(Popover.Content, {
    borderRadius: 4,
    padding: 15,
    maxWidth: 220,
    fontSize: 14,
    lineHeight: 1.2,
    color: '$pink500',
    backgroundColor: '#FFFF',
    border: '1px solid $pink100',
    boxShadow: 'hsl(206 22% 7% / 30%) 0px 0px 14px -7px, hsl(206 22% 7% / 10%) 0px 10px 20px -15px',

    '&:focus': {
        outline: 'none',
        boxShadow: 'hsl(206 22% 7% / 35%) 0px 10px 38px -10px, hsl(206 22% 7% / 20%) 0px 10px 20px -15px, 0 0 0 2px $pink500',
    }
})

export const Arrow = styled(Popover.Arrow, {
    fill: 'white',
})

