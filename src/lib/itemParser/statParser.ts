import {
  Resist,
  spaceDelim,
  signParser,
  Sign,
  School,
  resistParser,
  numberParser
} from './parserUtils'
import * as P from 'parsimmon'

export interface PrimaryStat {
  amplitude: number
  sign: Sign
  stat: Stat
}

export type Stat = BaseAttr | Resist

export type BaseAttr
  = 'Strength'
  | 'Stamina'
  | 'Agility'
  | 'Spirit'
  | 'Intellect'

const baseAttrs = [
  'Strength',
  'Stamina',
  'Agility',
  'Spirit',
  'Intellect',
]


const baseAttrParser: P.Parser<BaseAttr> =
  P.alt(
    ...baseAttrs.map(
      s => P.string(s) as P.Parser<BaseAttr>
    )
  )

const statParser: P.Parser<Stat> =
  P.alt(baseAttrParser, resistParser)

const primaryStatParser: P.Parser<PrimaryStat> =
  P.seqObj(
    ['sign', signParser],
    ['amplitude', numberParser],
    P.whitespace,
    ['stat', statParser]
  )
