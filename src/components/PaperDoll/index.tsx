import React, { useState } from 'react'
import dollBackground from '../../assets/wow/paperdoll/char-background-transparent.png'
import itemIconEmpty from '../../assets/wow/paperdoll/icon-border-large.png'
import { Slot, Equipped } from '../../store/paperDoll/types'
import { Injections } from '../../store/paperDoll/actions'
import { ItemPicker } from '../itemPicker/'

// unused: just for docs so I remember how do do shit with SyntheticEvent
export type Handler = (slot: Slot, event: React.SyntheticEvent<{ fieldA: string }>) => void

export interface Props {
    equipped: Equipped
    actions: Injections
}

interface IconState {
    focused: boolean
    hovered: boolean
}

const initialIconState: IconState = {
    focused: false,
    hovered: false,
}

interface IconProps {
    slot: Slot
    css: React.CSSProperties
}

const ItemIcon: React.FC<IconProps> = ({ slot, css }) => {
    const deltaState = (deltas: Partial<IconState>) => () => setState({ ...state, ...deltas })
    const [state, setState] = useState(initialIconState)

    const styles = Object.assign({
        position: 'absolute',
        width: '12%',
        height: '11%',
        opacity: state.focused || state.hovered ? 1 : 0.5,
        backgroundImage: `url(${itemIconEmpty})`,
    }, css)


    const picker = state.focused ? <ItemPicker slot={slot} /> : undefined
    return (
        <div className={slot.toLowerCase()}
            tabIndex={-1}
            style={styles}
            onBlur={deltaState({ focused: false })}
            onFocus={deltaState({ focused: true })}
            onMouseOver={deltaState({ hovered: true })}
            onMouseOut={deltaState({ hovered: false })}
        >
            {picker}
        </div>
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

            <ItemIcon slot={Slot.Head} css={{ top: '4.3%', left: '3.7%' }} />
            <ItemIcon slot={Slot.Gloves} css={{ top: '4.3%', left: '83.3%' }} />
            <ItemIcon slot={Slot.Neck} css={{ top: '14.9%', left: '3.7%' }} />
            <ItemIcon slot={Slot.Belt} css={{ top: '14.9%', left: '83.3%' }} />
            <ItemIcon slot={Slot.Shoulders} css={{ top: '25.2%', left: '3.7%' }} />
            <ItemIcon slot={Slot.Pants} css={{ top: '25.2%', left: '83.3%' }} />
            <ItemIcon slot={Slot.Cloak} css={{ top: '35.3%', left: '3.7%' }} />
            <ItemIcon slot={Slot.Boots} css={{ top: '35.3%', left: '83.3%' }} />
            <ItemIcon slot={Slot.Chest} css={{ top: '46%', left: '3.7%' }} />
            <ItemIcon slot={Slot.Ring1} css={{ top: '46%', left: '83.3%' }} />
            <ItemIcon slot={Slot.Ring2} css={{ top: '56%', left: '83.3%' }} />
            <ItemIcon slot={Slot.Trinket1} css={{ top: '66.4%', left: '83.3%' }} />
            <ItemIcon slot={Slot.Bracers} css={{ top: '77.2%', left: '3.7%' }} />
            <ItemIcon slot={Slot.Trinket2} css={{ top: '77.2%', left: '83.3%' }} />

            <ItemIcon slot={Slot.Mainhand} css={{ top: '82.6%', left: '32%' }} />
            <ItemIcon slot={Slot.Offhand} css={{ top: '82.6%', left: '44%' }} />
            <ItemIcon slot={Slot.Ranged} css={{ top: '82.6%', left: '55.5%' }} />

        </div>
    )
}

                                                // 23324 max items
