import * as request from 'request-promise'
import { AttrIdentifier } from '../../lib/vanillaApi/'
import { Item, ScaledAttr, schools, PrimaryStat, Sign } from '../../store/items/types'
import React from 'react'
import { CharacterClass } from '../../lib/classicdb/types';
import { TippyProps } from '@tippy.js/react'
const negate = require('lodash/negate')

export interface Props {
    item: Item
}

export const classes = (cs: string[]) => cs.map(c => c.toLowerCase()).join(' ')

export const defaultTippyOpts: Partial<TippyProps> = {
    arrow: true,
    aria: null,
    boundary: 'viewport',
    delay: [0, 0],
    duration: [100, 100],
    trigger: 'manual',
    content: "I'm a tooltip!"
}



const isWep = (item: Item): {
    damage_range: { low: number, high: number }
    swing_speed: number
    dps: number
} | undefined => {
    let res = {}
    const anyUndefined =
        [item.damage_range, item.swing_speed, item.dps]
            .filter(x => x === undefined)
            .length > 0

    if (anyUndefined) {
        return undefined
    }

    return {
        damage_range: item.damage_range as { low: number, high: number },
        swing_speed: item.swing_speed as number,
        dps: item.dps as number,
    }
}

export const ItemTable: React.FC<Props> = ({ item }) => {
    const weaponAttrs = isWep(item)
    return (
        <table className={item.dps ? 'weapon' : 'armor'} id='tooltip'>
            <tbody>
                <tr key="name">
                    <td>
                        <span className={classes([item.quality, 'name'])}>{item.name}</span>
                    </td>
                </tr>
                <tr key="bindson">
                    <td>
                        <span>{item.binds_on}</span>
                    </td>
                </tr>
                {
                    item.unique ? (
                        <tr key="unique">
                            <td>
                                <span>{item.unique}</span>
                            </td>
                        </tr>
                    ) : undefined
                }
                {weaponAttrs ? [
                    <tr key="slot">
                        <td>
                            <table style={{ width: '100%' }}>
                                <tbody>
                                    <tr>
                                        <td>{item.equipment_slot}</td>
                                        <th>{item.equipment_type}</th>
                                    </tr>
                                </tbody>
                            </table>
                        </td>
                    </tr>,
                    <tr key="range">
                        <td>
                            <table style={{ width: '100%' }}>
                                <tbody>
                                    <tr>
                                        <td>{weaponAttrs.damage_range.low} - {weaponAttrs.damage_range.high}</td>
                                        <th>Speed {weaponAttrs.swing_speed.toFixed(2)}</th>
                                    </tr>
                                </tbody>
                            </table>
                        </td>
                    </tr>,
                    <tr key="dps">
                        <td>
                            <span>({weaponAttrs.dps} damage per second)</span>
                        </td>
                    </tr>,
                ] : (
                        <tr key="type">
                            <td>
                                <table style={{ width: '100%' }}>
                                    <tbody>
                                        <tr>
                                            <td>{item.equipment_slot}</td>
                                            <th>{item.equipment_type}</th>
                                        </tr>
                                    </tbody>
                                </table>
                            </td>
                        </tr>
                    )}
                {item.armor ?
                    (
                        <tr key="armor">
                            <td>
                                <span>{item.armor} Armor</span>
                            </td>
                        </tr>
                    ) : null
                }
                {item.primary_stats ? displayStats(item.primary_stats as PrimaryStat[]) : null}
                {
                    item.durability ?
                        (
                            <tr key="dura">
                                <td>
                                    <span>Durability: {item.durability}/{item.durability}</span>
                                </td>
                            </tr>
                        ) : null
                }
                {
                    (item.class_restrictions && (item.class_restrictions as CharacterClass[]).length) ?
                        (
                            <tr key="class-restriction">
                                <td>
                                    <span>Classes: {(item.class_restrictions || []).join(' ')}</span>
                                </td>
                            </tr>
                        ) : null
                }
                {
                    item.level_requirement ? (
                        <tr key="lvl">
                            <td>
                                <span>Requires Level {item.level_requirement || ''}</span>
                            </td>
                        </tr>
                    ) : undefined
                }
                {item.effects ? displayEffects(item.effects as ScaledAttr[]) : null}
            </tbody>
        </table>
    )
}


export const displayEffects = (effs: ScaledAttr[]) => {
    const showEffects = (strs: string[]) => strs.map((s, i) => (
        <tr key={`${i}`}>
            <td>
                <span className="effect">{s}</span>
            </td>
        </tr>
    ))

    const isSchool = (eff: ScaledAttr) => (schools as AttrIdentifier[]).indexOf(eff.attr) !== -1
    const schoolEffs = effs.filter(isSchool)
    const commonDenom =
        // there can only be a +all spells if every school is present
        schoolEffs.length === schools.length ?
            schoolEffs.map(a => a.scale).reduce((a, b) => Math.min(a, b))
            : 0

    const effectString = (eff: ScaledAttr) => {
        const percents = [AttrIdentifier.SpellCrit, AttrIdentifier.SpellHit]
        const percentMap: Partial<Record<AttrIdentifier, string>> = {
            [AttrIdentifier.SpellHit]: 'hit',
            [AttrIdentifier.SpellCrit]: 'crit'
        }
        if (percents.indexOf(eff.attr) !== -1) {
            return `Equip: Improves your chance to ${percentMap[eff.attr]} with spells by ${eff.scale}%.`
        } else {
            return `Equip: Increases damage done by ${eff.attr} spells and effects by up to ${eff.scale}.`
        }
    }


    if (commonDenom) {
        const allDmgEff = [
            `Equip: Increases damage and healing done by magical spells and effects by up to ${commonDenom}`
        ]
        const otherEffs = schoolEffs
            .map(eff => ({ ...eff, scale: eff.scale - commonDenom }))
            .filter(eff => eff.scale > 0)
            .concat(effs.filter(negate(isSchool)))
            .map(effectString)

        return showEffects(allDmgEff.concat(otherEffs))
    } else {
        return showEffects(effs.map(effectString))
    }
}

export const displayStats = (stats: PrimaryStat[]) => {
    const showStat = (stat: PrimaryStat, idx: number) => {
        let statStr
        if ((schools as string[]).indexOf(stat.stat as string) !== -1) {
            statStr = `${stat.stat} Resistance`
        } else {
            statStr = stat.stat
        }
        return (
            <tr key={`${idx}-${stat.stat}`}>
                <td>
                    <span>{stat.sign}{stat.amplitude} {statStr}</span>
                </td>
            </tr>
        )
    }
    return stats.map(showStat)
}
