import React, { useState, useRef } from 'react'
import Tippy from '@tippy.js/react'
import { Injections } from '../../store/paperDoll/actions'
import { Item } from '../../store/items/types'
import { ItemPicker } from '../itemPicker/'
import { ItemTable, defaultTippyOpts } from '../itemTooltip/'
import { Slot } from '../../store/paperDoll/types'
import { thumbnailUrl } from '../../lib/util/thumbnail'


interface IconState {
    hovered: boolean
    showTooltip: boolean
}

const initialIconState: IconState = {
    hovered: false,
    showTooltip: false,
}

interface IconProps {
    item?: Item
    actions: Injections
    slot: Slot
    css: React.CSSProperties
}

export const ItemIcon: React.FC<IconProps> = ({ item, slot, css, ...props }) => {
    const [state, setState] = useState(initialIconState)
    const deltaState = (deltas: Partial<IconState>) => () => setState({ ...state, ...deltas })

    const noHoverOpacity = item ? 0.7 : 0.5
    let styles = Object.assign({
        position: 'absolute',
        width: '12%',
        height: '11%',
        borderRadius: '15%',
        backgroundImage: item ? `url(${thumbnailUrl(item.id)})` : undefined,
        backgroundSize: 'cover',
        border: state.hovered ? '1px solid white' : undefined,
        zIndex: 10,
    }, css)

    const hide = deltaState({ showTooltip: false })

    const ref = useRef<HTMLInputElement>(null)
    const focusInput = () => {
        if (ref.current) {
            ref.current.focus()
        }
    }

    const picker = (
        <ItemPicker
            inputRef={ref}
            slot={slot}
            actions={props.actions}
            hideTooltip={hide}
        />
    )

    return (
        <Tippy
            {...defaultTippyOpts}
            content={picker}
            visible={state.showTooltip}
            onShown={focusInput}
            interactive={true}
            sticky={true}
        >
            <Tippy
                {...defaultTippyOpts}
                content={item ? <ItemTable item={item} /> : <span>null</span>}
                visible={item && state.hovered}
            >
                <div className={slot.toLowerCase()}
                    tabIndex={-1}
                    style={styles}
                    onMouseEnter={deltaState({ hovered: true })}
                    onMouseLeave={deltaState({ hovered: false })}
                    onClick={deltaState({ showTooltip: true })}
                />
            </Tippy>
        </Tippy >
    )
}
