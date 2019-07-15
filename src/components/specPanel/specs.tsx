import React from 'react'
import Grid from '@material-ui/core/Grid';
import { Icon } from './icon'
import { Injections } from '../../store/paperDoll/actions'
import { SpecIdentifier } from '../../lib/vanillaApi/api'
import druidImage from '../../assets/wow/classes/druid.png'
import hunterImage from '../../assets/wow/classes/hunter.png'
import mageImage from '../../assets/wow/classes/mage.png'
import paladinImage from '../../assets/wow/classes/paladin.png'
import priestImage from '../../assets/wow/classes/priest.png'
import rogueImage from '../../assets/wow/classes/rogue.png'
import shamanImage from '../../assets/wow/classes/shaman.png'
import warlockImage from '../../assets/wow/classes/warlock.png'
import warriorImage from '../../assets/wow/classes/warrior.png'
// the following represent the specs used
import FireMageImage from '../../assets/wow/specs/mage/fire.png'
import FrostMageImage from '../../assets/wow/specs/mage/frost.png'
import ArcaneMageImage from '../../assets/wow/specs/mage/arcane.png'
import BalanceDruidImage from '../../assets/wow/specs/druid/balance.png'
import ElementalShamanImage from '../../assets/wow/specs/shaman/elemental.png'
import ShadowPriestImage from '../../assets/wow/specs/priest/shadow.png'
// warlock should eventually be renamed to AfflictionWarlock (i.e. SM/Ruin).
import WarlockImage from '../../assets/wow/specs/warlock/affliction.png'

export type CharClass
    = 'Druid'
    | 'Hunter'
    | 'Mage'
    | 'Paladin'
    | 'Priest'
    | 'Rogue'
    | 'Shaman'
    | 'Warlock'
    | 'Warrior'

export interface Props {
    actions: Injections
    charClass: CharClass
    specs: SpecIdentifier[]
}

interface State { }

export const Spec: React.FC<Props> = ({ charClass, specs }) => {

    return (
        <Grid container justify="center">
            <Grid item xs={12} key={charClass}>
                <Icon
                    selected={false}
                    alt={charClass}
                    image={classImage(charClass)}
                />
            </Grid>

            <Grid container item xs={12} key="specs" >
                {
                    specs.map((s, i) => (
                        <Grid item xs={4} key={i} >
                            <Icon
                                selected={false}
                                alt={s}
                                image={specImage(s)}
                            />
                        </Grid>
                    ))
                }
            </Grid>
        </Grid>

    )
}

function classImage(c: CharClass): string {
    switch (c) {
        case 'Druid':
            return druidImage
        case 'Hunter':
            return hunterImage
        case 'Mage':
            return mageImage
        case 'Paladin':
            return paladinImage
        case 'Priest':
            return priestImage
        case 'Rogue':
            return rogueImage
        case 'Shaman':
            return shamanImage
        case 'Warlock':
            return warlockImage
        case 'Warrior':
            return warriorImage
    }
}

function specImage(s: SpecIdentifier) {
    switch (s) {
        case SpecIdentifier.FireMage:
            return FireMageImage
        case SpecIdentifier.FrostMage:
            return FrostMageImage
        case SpecIdentifier.ArcaneMage:
            return ArcaneMageImage
        case SpecIdentifier.Warlock:
            return WarlockImage
        case SpecIdentifier.BalanceDruid:
            return BalanceDruidImage
        case SpecIdentifier.ElementalShaman:
            return ElementalShamanImage
        case SpecIdentifier.ShadowPriest:
            return ShadowPriestImage
    }
}
