import * as P from 'parsimmon'
import {
  School,
  schools,
  schoolParser,
  numberParser,
} from './parserUtils'
import { AttrIdentifier } from '../vanillaApi';

// currently we only support parsing spell damage effects
export interface ScaledAttr {
  attr: School
  scale: number
}

export function parse(eff: string): ScaledAttr[] {
  const result = scaledAttrParser.parse(eff)
  if (result.status) {
    return result.value
  }
  return []
}

const allSchoolsDmgParser: P.Parser<ScaledAttr[]> =
  P.regexp(
    /Increases damage and healing done by magical spells and effects by up to ([0-9]+)./,
    1
  )
    .map(n =>
      schools.map(s => ({ attr: s, scale: Number(n) }))
    )

const singleSchoolDmgParser: P.Parser<ScaledAttr> =
  P.seqObj(
    P.string('Increases damage done by'),
    P.whitespace,
    ['attr', schoolParser],
    P.whitespace,
    P.string('spells and effects by up to'),
    P.whitespace,
    ['scale', numberParser]
  )

const spellHitParser: P.Parser<ScaledAttr> =
  P.regexp(
    /Improves your chance to hit with spells by ([0-9]+)%./,
    1
  )
    .map(Number)
    .map(n => ({ attr: AttrIdentifier.SpellHit as School, scale: n }))

const spellCritParser: P.Parser<ScaledAttr> =
  P.regexp(
    /Improves your chance to get a critical strike with spells by ([0-9]+)%./,
    1
  )
    .map(Number)
    .map(n => ({ attr: AttrIdentifier.SpellCrit as School, scale: n }))

export const scaledAttrParser: P.Parser<ScaledAttr[]> =
  P.alt(
    allSchoolsDmgParser,
    singleSchoolDmgParser.map(x => [x]),
    spellHitParser.map(x => [x]),
    spellCritParser.map(x => [x]),
  )

