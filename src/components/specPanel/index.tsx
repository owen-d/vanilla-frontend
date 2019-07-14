import React from 'react'
import { withStyles, WithStyles } from '@material-ui/styles';
import Grid from '@material-ui/core/Grid';
import createStyles from '@material-ui/core/styles/createStyles';
import { CharClass, Spec } from './specs'
import { SpecIdentifier } from '../../lib/vanillaApi/api'
import { Injections } from '../../store/paperDoll/actions'

export interface Props {
    actions: Injections
}

interface State { }

export const Panel: React.FC<Props> = ({ actions }) => {
    interface PartialSpecProps {
        charClass: CharClass
        active: boolean
        specs: SpecIdentifier[]
    }

    const mkClass = (props: PartialSpecProps) => props.active ? (
        <Grid
            key={props.charClass}
            item
            xs={2}
        >
            <Spec {...props} actions={actions} />
        </Grid>
    ) : null


    const groups: PartialSpecProps[] = [
        { charClass: 'Druid', active: true, specs: [SpecIdentifier.BalanceDruid] },
        { charClass: 'Hunter', active: false, specs: [] },
        {
            charClass: 'Mage',
            active: true,
            specs: [SpecIdentifier.ArcaneMage, SpecIdentifier.FireMage, SpecIdentifier.FrostMage]
        },
        { charClass: 'Paladin', active: false, specs: [] },
        { charClass: 'Priest', active: true, specs: [SpecIdentifier.ShadowPriest] },
        { charClass: 'Rogue', active: false, specs: [] },
        { charClass: 'Shaman', active: true, specs: [SpecIdentifier.ElementalShaman] },
        { charClass: 'Warlock', active: true, specs: [SpecIdentifier.Warlock] },
        { charClass: 'Warrior', active: false, specs: [] },
    ]

    return (
        <Grid
            container
            justify="space-around"
        >
            {groups.map(mkClass)}
        </Grid>
    )
}
