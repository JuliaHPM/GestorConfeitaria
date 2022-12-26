import React from 'react';
import * as Popover from '@radix-ui/react-popover';
import { Arrow, Content, Trigger } from '../styles/components/Popover';

export default function PopoverStyled({ text }) {

    return (
        <Popover.Root>
            <Trigger>i</Trigger>
            <Popover.Portal>
                <Content sideOffset={5}>
                    {text}
                    <Arrow className="PopoverArrow" />
                </Content>
            </Popover.Portal>
        </Popover.Root>
    )
}

