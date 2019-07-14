import React from 'react'
import { withStyles, WithStyles } from '@material-ui/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import createStyles from '@material-ui/core/styles/createStyles';
import { Injections } from '../../store/paperDoll/actions'
import Button from '@material-ui/core/Button';
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
    const imageStyles: React.CSSProperties = {
        borderRadius: '30%',
        backgroundColor: '#ffffff',
        padding: '2px',
    }
    return (
        <GridList cellHeight={30} spacing={0} cols={3}>
            <GridListTile key="character-class" cols={3} rows={3}>
                <img
                    src={classImage(charClass)}
                    alt={charClass}
                    style={imageStyles}
                />
            </GridListTile>
            {
                specs.map((s, i) => (
                    <GridListTile key={s} cols={1} rows={1} >
                        <img
                            src={specImage(s)}
                            alt={s}
                            style={imageStyles}
                        />
                    </GridListTile>
                ))
            }
        </GridList >
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
