import Grid from '@material-ui/core/Grid'
import React from 'react'
import dollBackground from '../../assets/wow/paperdoll/char-background-transparent.png'
import { Injections } from '../../store/paperDoll/actions'
import { ItemIcon } from './itemIcon'
import { Panel } from '../specPanel/'
import { Slot } from '../../store/paperDoll/types'
import { State as DollProps } from '../../store/paperDoll/types'


// unused: just for docs so I remember how do do stuff with SyntheticEvent
export type Handler = (slot: Slot, event: React.SyntheticEvent<{ fieldA: string }>) => void

export type Props = { actions: Injections } & DollProps


export const PaperDoll: React.FC<Props> = ({ actions, equipped, ...props }) => {
    return (
        <Grid
            container
            className="paperDoll"
        >

            <Grid item xs={12}>

                <Panel actions={actions} {...props} />
            </Grid >

            <Grid
                item
                xs={12}
                style={{
                    position: 'relative'
                }}
            >
                <img src={dollBackground} style={{ width: '100%', height: 'auto' }} alt="doll-background" />

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
            </Grid>

        </Grid>
    )
}
