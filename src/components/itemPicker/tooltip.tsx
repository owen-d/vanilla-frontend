import React, { useState } from 'react'
import { Item } from '../../lib/classicdb/item'
import Tippy, { TippyProps } from '@tippy.js/react'


const JSXContent = () => (
    <Tippy content={<span>Tooltip</span>}>
        <button>My button</button>
    </Tippy>
)

export function Tooltip(props: TippyProps) {
    return (
        <Tippy
            animation="fade"
            theme="translucent"
            arrow={true}
            delay={150}
            boundary="viewport"
            trigger="mouseenter"
            {...props}
        >
            {props.children}
        </Tippy >
    )
}
