import React, { useState, useRef } from 'react'
import dollBackground from '../../assets/wow/paperdoll/char-background-transparent.png'
import itemIconEmpty from '../../assets/wow/paperdoll/icon-border-large.png'
import { Slot, Equipped } from '../../store/paperDoll/types'
import { Injections } from '../../store/paperDoll/actions'
import { ItemPicker } from '../itemPicker/'
import { Tooltip } from '../tooltip/'
import { Item } from '../../store/items/types'
import { thumbnailUrl } from '../../lib/util/thumbnail'

// unused: just for docs so I remember how do do stuff with SyntheticEvent
export type Handler = (slot: Slot, event: React.SyntheticEvent<{ fieldA: string }>) => void


export interface Props {
    equipped: Equipped
    actions: Injections
}

interface IconState {
    hovered: boolean
}

const initialIconState: IconState = {
    hovered: false,
}

interface IconProps {
    item?: Item
    actions: Injections
    slot: Slot
    css: React.CSSProperties
}

const ItemIcon: React.FC<IconProps> = ({ item, slot, css, ...props }) => {
    const [state, setState] = useState(initialIconState)
    const deltaState = (deltas: Partial<IconState>) => () => setState({ ...state, ...deltas })

    const noHoverOpacity = item ? 0.7 : 0.5
    let styles = Object.assign({
        position: 'absolute',
        width: '12%',
        height: '11%',
        opacity: state.hovered ? 1 : noHoverOpacity,
        backgroundImage: item ? `url(${thumbnailUrl(item.id)})` : `url(${itemIconEmpty})`,
        zIndex: 10,
    }, css)


    const data = (
        <div className={slot.toLowerCase()}
            tabIndex={-1}
            style={styles}
            onMouseEnter={deltaState({ hovered: true })}
            onMouseLeave={deltaState({ hovered: false })}
        >
        </div>
    )

    const inputRef = useRef<HTMLInputElement>(null)
    const focus = (shown: boolean) => {
        if (shown && inputRef.current) {
            inputRef.current.focus()
        }
    }

    const picker = (
        <ItemPicker inputRef={inputRef}
            slot={slot}
            actions={props.actions}
        />
    )

    return (
        <Tooltip placement="top"
            trigger="click"
            tooltip={picker}
            onVisibilityChange={focus}
            followCursor={true}
        >
            <Tooltip
                placement="top"
                trigger="hover"
                tooltip="just hovering"
                followCursor={true}
            >
                {data}
            </Tooltip>
        </Tooltip >
    )
}

export const PaperDoll: React.FC<Props> = ({ actions, equipped }) => {

    /* 555 x 612 -- default image dims */
    const widthCoeff = 555 / 612
    const containerStyles: React.CSSProperties = {
        position: 'relative',
        backgroundImage: `url(${dollBackground})`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        width: (widthCoeff * 75) + 'vh',
        height: '75vh',
    }
    return (
        <div className="paperDoll" style={containerStyles}>

            <ItemIcon slot={Slot.Head}
                item={equipped[Slot.Head]}
                actions={actions}
                css={{ top: '4.3%', left: '3.7%' }} />
            <ItemIcon slot={Slot.Gloves}
                item={equipped[Slot.Gloves]}
                actions={actions}
                css={{ top: '4.3%', left: '83.3%' }} />
            <ItemIcon slot={Slot.Neck}
                item={equipped[Slot.Neck]}
                actions={actions}
                css={{ top: '14.9%', left: '3.7%' }} />
            <ItemIcon slot={Slot.Belt}
                item={equipped[Slot.Belt]}
                actions={actions}
                css={{ top: '14.9%', left: '83.3%' }} />
            <ItemIcon slot={Slot.Shoulders}
                item={equipped[Slot.Shoulders]}
                actions={actions}
                css={{ top: '25.2%', left: '3.7%' }} />
            <ItemIcon slot={Slot.Pants}
                item={equipped[Slot.Pants]}
                actions={actions}
                css={{ top: '25.2%', left: '83.3%' }} />
            <ItemIcon slot={Slot.Cloak}
                item={equipped[Slot.Cloak]}
                actions={actions}
                css={{ top: '35.3%', left: '3.7%' }} />
            <ItemIcon slot={Slot.Boots}
                item={equipped[Slot.Boots]}
                actions={actions}
                css={{ top: '35.3%', left: '83.3%' }} />
            <ItemIcon slot={Slot.Chest}
                item={equipped[Slot.Chest]}
                actions={actions}
                css={{ top: '46%', left: '3.7%' }} />
            <ItemIcon slot={Slot.Ring1}
                item={equipped[Slot.Ring1]}
                actions={actions}
                css={{ top: '46%', left: '83.3%' }} />
            <ItemIcon slot={Slot.Ring2}
                item={equipped[Slot.Ring2]}
                actions={actions}
                css={{ top: '56%', left: '83.3%' }} />
            <ItemIcon slot={Slot.Trinket1}
                item={equipped[Slot.Trinket1]}
                actions={actions}
                css={{ top: '66.4%', left: '83.3%' }} />
            <ItemIcon slot={Slot.Bracers}
                item={equipped[Slot.Bracers]}
                actions={actions}
                css={{ top: '77.2%', left: '3.7%' }} />
            <ItemIcon slot={Slot.Trinket2}
                item={equipped[Slot.Trinket2]}
                actions={actions}
                css={{ top: '77.2%', left: '83.3%' }} />

            <ItemIcon slot={Slot.Mainhand}
                item={equipped[Slot.Mainhand]}
                actions={actions}
                css={{ top: '82.6%', left: '32%' }} />
            <ItemIcon slot={Slot.Offhand}
                item={equipped[Slot.Offhand]}
                actions={actions}
                css={{ top: '82.6%', left: '44%' }} />
            <ItemIcon slot={Slot.Ranged}
                item={equipped[Slot.Ranged]}
                actions={actions}
                css={{ top: '82.6%', left: '55.5%' }} />

        </div>
    )
}

