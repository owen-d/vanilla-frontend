import { Item, ScaledAttr } from '../items/types'
import { Stats, AttrIdentifier, SpecIdentifier } from '../../lib/vanillaApi';
import { slots } from '../paperDoll/types'
import { catMaybes } from '../../lib/util/maybe'
import { defaultStats } from '../vanillaApi/types'
import { Equipped, State } from './types'
import { ReqFields } from '../../lib/vanillaApi';

export const calculateStats = (equipped: Equipped) => {
  const stats = slots.map(slot => equipped[slot])
  const items = catMaybes(stats)

  return items.reduce(addItem, defaultStats)
}

export function addItem(stats: Stats, item: Item): Stats {
  return (item.effects || [])
    .reduce((acc: Stats, eff: ScaledAttr): Stats => {
      switch (eff.attr) {
        case AttrIdentifier.Arcane:
          return { ...acc, arcane: acc.arcane + eff.scale }
        case AttrIdentifier.Fire:
          return { ...acc, fire: acc.fire + eff.scale }
        case AttrIdentifier.Frost:
          return { ...acc, frost: acc.frost + eff.scale }
        case AttrIdentifier.Holy:
          return { ...acc, holy: acc.holy + eff.scale }
        case AttrIdentifier.Nature:
          return { ...acc, nature: acc.nature + eff.scale }
        case AttrIdentifier.Shadow:
          return { ...acc, shadow: acc.shadow + eff.scale }
        case AttrIdentifier.SpellCrit:
          return { ...acc, crit: acc.crit + eff.scale / 100 } // hit/crit as percents
        case AttrIdentifier.SpellHit:
          return { ...acc, hit: acc.hit + eff.scale / 100 } // hit/crit as percents
      }
    }, stats)
}

export function baseDps(spec: SpecIdentifier): number {
  switch (spec) {
    case SpecIdentifier.BalanceDruid:
      return 217.17291;
    case SpecIdentifier.ElementalShaman:
      return 208.44499;
    case SpecIdentifier.FireMage:
      return 265.45804;
    case SpecIdentifier.FrostMage:
      return 245.98726;
    case SpecIdentifier.ShadowPriest:
      return 266.09796;
    case SpecIdentifier.Warlock:
      return 220.81775;
  }
}


export function toReqFields(state: State): ReqFields {
  return {
    stats: state.stats,
    spec: state.spec
  }
}
