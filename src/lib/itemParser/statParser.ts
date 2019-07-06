import {
  spaceDelim,
  signParser,
  resistParser,
  numberParser
} from './parserUtils'
import { BaseAttr, baseAttrs, Stat, School, Sign, Resist, PrimaryStat } from '../../store/items/types'
import * as P from 'parsimmon'


const baseAttrParser: P.Parser<BaseAttr> =
  P.alt(
    ...baseAttrs.map(
      s => P.string(s) as P.Parser<BaseAttr>
    )
  )

export const statParser: P.Parser<Stat> =
  P.alt(baseAttrParser, resistParser)

export const primaryStatParser: P.Parser<PrimaryStat> =
  P.seqObj(
    ['sign', signParser],
    ['amplitude', numberParser],
    P.whitespace,
    ['stat', statParser]
  )
