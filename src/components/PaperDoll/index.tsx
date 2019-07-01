import React from 'react'
import dollBackground from '../../assets/wow/paperdoll/char-background-transparent.png'
import itemIconEmpty from '../../assets/wow/paperdoll/icon-border-large.png'
import { Parser } from '../../lib/effectParser/parser'
import { noop } from '../../lib/util/noop'

export type Slot
    = 'Head'
    | 'Gloves'
    | 'Neck'
    | 'Belt'
    | 'Shoulders'
    | 'Pants'
    | 'Cloak'
    | 'Boots'
    | 'Chest'
    | 'Ring1'
    | 'Ring2'
    | 'Trinket1'
    | 'Bracers'
    | 'Trinket2'
    | 'Mainhand'
    | 'Offhand'
    | 'Ranged'

export type Handler = (slot: Slot, event: React.SyntheticEvent<any>) => void

export interface Props {
    onMouseEnter?: Handler
    onMouseLeave?: Handler
    onClick?: Handler
}


export const PaperDoll: React.FC<Props> = ({
    onMouseEnter = noop,
    onMouseLeave = noop,
    onClick = noop,
}) => {

    const mkIcon = (slot: Slot, css: React.CSSProperties) => {
        const styles = Object.assign({
            position: 'absolute',
            backgroundImage: itemIconEmpty,
            width: '12%',
            height: '10%',
        }, css)


        return (
            <div className={slot.toLowerCase()}
                style={styles}
                onClick={onClick.bind(null, slot)}
                onMouseEnter={onMouseEnter.bind(null, slot)}
                onMouseLeave={onMouseLeave.bind(null, slot)}
            />
        )
    }

    const containerStyles: React.CSSProperties = {
        position: 'relative',
    }

    return (
        <div className="paperDoll" style={containerStyles}>
            <img src={dollBackground} alt="paper doll" />

            {mkIcon("Head", { top: '4.3%', left: '3.7%' })}
            {mkIcon("Gloves", { top: '4.3%', left: '83.3%' })}
            {mkIcon("Neck", { top: '14.9%', left: '3.7%' })}
            {mkIcon("Belt", { top: '14.9%', left: '83.3%' })}
            {mkIcon("Shoulders", { top: '25.2%', left: '3.7%' })}
            {mkIcon("Pants", { top: '25.2%', left: '83.3%' })}
            {mkIcon("Cloak", { top: '35.3%', left: '3.7%' })}
            {mkIcon("Boots", { top: '35.3%', left: '83.3%' })}
            {mkIcon("Chest", { top: '46%', left: '3.7%' })}
            {mkIcon("Ring1", { top: '46%', left: '83.3%' })}
            {mkIcon("Ring2", { top: '56%', left: '83.3%' })}
            {mkIcon("Trinket1", { top: '66.4%', left: '83.3%' })}
            {mkIcon("Bracers", { top: '77.2%', left: '3.7%' })}
            {mkIcon("Trinket2", { top: '77.2%', left: '83.3%' })}

            {mkIcon("Mainhand", { top: '82.6%', left: '32%' })}
            {mkIcon("Offhand", { top: '82.6%', left: '44%' })}
            {mkIcon("Ranged", { top: '82.6%', left: '55.5%' })}

        </div>
    )
}

                        // 23324 max items
