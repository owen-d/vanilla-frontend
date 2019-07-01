import { AttrIdentifier } from '../vanillaApi/'
import { Effect } from '../classicdb/effect'
import { Maybe } from '../util/maybe'

export interface HasParser {
  parse: (arg0: Effect) => ScaledAttr[]
}

export interface ScaledAttr {
  attr: AttrIdentifier
  scale: number
}

export const Parser = {
  parse
}

function parse(eff: Effect): ScaledAttr[] {
  return Array.prototype.concat.call([], ...effectFilters.map(f => f(eff)))
}

const effectFilters = [
  spellDamageAllSchools,
  spellDamageSingleSchool,
  spellHit,
  spellCrit,
]

function spellDamageSingleSchool(eff: Effect): ScaledAttr[] {
  const re = /Increases damage done by ([A-Za-z]+) spells and effects by up to ([0-9+])./;

  const res = re.exec(eff.description)
  if (res === null) {
    return []
  }

  const [_, school, n] = res
  const matchedSchool = schoolToAttrId(school)
  if (matchedSchool) {
    return [{
      scale: parseInt(n),
      attr: matchedSchool,
    }]
  }
  return []

}

function spellDamageAllSchools(eff: Effect): ScaledAttr[] {
  const re = /Increases damage and healing done by magical spells and effects by up to ([0-9]+)./;
  const res = re.exec(eff.description)

  if (res === null) {
    return []
  }

  const [_, n] = res
  return spellSchools.map(school => ({ scale: parseInt(n), attr: school }))

}

function spellHit(eff: Effect): ScaledAttr[] {
  const re = /Improves your chance to hit with spells by ([0-9]+)%./;

  const res = re.exec(eff.description)

  if (res === null) {
    return []
  }

  const [_, n] = res
  return [{ scale: parseInt(n), attr: AttrIdentifier.SpellHit }]
}

function spellCrit(eff: Effect): ScaledAttr[] {
  const re = /Improves your chance to get a critical strike with spells by ([0-9]+)%./;

  const res = re.exec(eff.description)

  if (res === null) {
    return []
  }

  const [_, n] = res
  return [{ scale: parseInt(n), attr: AttrIdentifier.SpellCrit }]
}

function schoolToAttrId(x: string): Maybe<AttrIdentifier> {
  switch (x) {
    case AttrIdentifier.Arcane:
      return AttrIdentifier.Arcane
    case AttrIdentifier.Fire:
      return AttrIdentifier.Fire
    case AttrIdentifier.Frost:
      return AttrIdentifier.Frost
    case AttrIdentifier.Holy:
      return AttrIdentifier.Holy
    case AttrIdentifier.Nature:
      return AttrIdentifier.Nature
    case AttrIdentifier.Shadow:
      return AttrIdentifier.Shadow
    default:
      return null
  }
}

const spellSchools = [
  AttrIdentifier.Arcane,
  AttrIdentifier.Fire,
  AttrIdentifier.Frost,
  AttrIdentifier.Holy,
  AttrIdentifier.Nature,
  AttrIdentifier.Shadow,
]
