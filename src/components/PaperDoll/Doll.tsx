import React from 'react'
import './Doll.css'
import dollBackground from '../../assets/wow/paperdoll/char-background-transparent.png'
import itemIconEmpty from '../../assets/wow/paperdoll/icon-border-large.png'

export const PaperDoll: React.FC = () => {
    const mkIcon = (cName: string, css: React.CSSProperties) => {
        const styles = Object.assign({ position: 'absolute' }, css)
        return (
            <div className={cName} style={styles}>
                <img src={itemIconEmpty} alt="border-large" />
            </div >
        )
    }

    return (
        <div className="paperDoll">
            <img src={dollBackground} alt="paper doll" />

            {mkIcon("head", { top: '4.3%', left: '3.7%' })}
            {mkIcon("gloves", { top: '4.3%', left: '83.2%' })}
            {mkIcon("neck", { top: '14.9%', left: '3.7%' })}
            {mkIcon("belt", { top: '14.9%', left: '83.2%' })}
            {mkIcon("shoulders", { top: '25.2%', left: '3.7%' })}
            {mkIcon("pants", { top: '25.2%', left: '83.2%' })}
            {mkIcon("cloak", { top: '35.3%', left: '3.7%' })}
            {mkIcon("boots", { top: '35.3%', left: '83.2%' })}
            {mkIcon("chest", { top: '46%', left: '3.7%' })}
            {mkIcon("ring1", { top: '46%', left: '83.2%' })}
            {mkIcon("ring2", { top: '56%', left: '83.2%' })}
            {mkIcon("trinket1", { top: '66.4%', left: '83.2%' })}
            {mkIcon("bracers", { top: '77.2%', left: '3.7%' })}
            {mkIcon("trinket2", { top: '77.2%', left: '83.2%' })}

            {mkIcon("mainhand", { top: '82.6%', left: '32%' })}
            {mkIcon("offhand", { top: '82.6%', left: '44%' })}
            {mkIcon("ranged", { top: '82.6%', left: '55.5%' })}

        </div>



    )
}

                        // 23324 max items
