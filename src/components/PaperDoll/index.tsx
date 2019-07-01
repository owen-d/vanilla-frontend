import React from 'react'
import dollBackground from '../../assets/wow/paperdoll/char-background-transparent.png'
import itemIconEmpty from '../../assets/wow/paperdoll/icon-border-large.png'
import { Parser } from '../../lib/effectParser/parser'
import { Slot, Equipped } from '../../store/paperDoll/types'
import { Injections } from '../../store/paperDoll/actions'

export type Handler = (slot: Slot, event: React.SyntheticEvent<any>) => void

export interface Props {
    equipped: Equipped
    actions: Injections
}


export const PaperDoll: React.FC<Props> = ({ actions, equipped }) => {

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

            />
        )
    }

    const containerStyles: React.CSSProperties = {
        position: 'relative',
    }

    return (
        <div className="paperDoll" style={containerStyles}>
            <img src={dollBackground} alt="paper doll" />

            {mkIcon(Slot.Head, { top: '4.3%', left: '3.7%' })}
            {mkIcon(Slot.Gloves, { top: '4.3%', left: '83.3%' })}
            {mkIcon(Slot.Neck, { top: '14.9%', left: '3.7%' })}
            {mkIcon(Slot.Belt, { top: '14.9%', left: '83.3%' })}
            {mkIcon(Slot.Shoulders, { top: '25.2%', left: '3.7%' })}
            {mkIcon(Slot.Pants, { top: '25.2%', left: '83.3%' })}
            {mkIcon(Slot.Cloak, { top: '35.3%', left: '3.7%' })}
            {mkIcon(Slot.Boots, { top: '35.3%', left: '83.3%' })}
            {mkIcon(Slot.Chest, { top: '46%', left: '3.7%' })}
            {mkIcon(Slot.Ring1, { top: '46%', left: '83.3%' })}
            {mkIcon(Slot.Ring2, { top: '56%', left: '83.3%' })}
            {mkIcon(Slot.Trinket1, { top: '66.4%', left: '83.3%' })}
            {mkIcon(Slot.Bracers, { top: '77.2%', left: '3.7%' })}
            {mkIcon(Slot.Trinket2, { top: '77.2%', left: '83.3%' })}

            {mkIcon(Slot.Mainhand, { top: '82.6%', left: '32%' })}
            {mkIcon(Slot.Offhand, { top: '82.6%', left: '44%' })}
            {mkIcon(Slot.Ranged, { top: '82.6%', left: '55.5%' })}

        </div>
    )
}

                        // 23324 max items
