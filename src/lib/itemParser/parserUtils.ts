import * as request from 'request-promise' // needed just to avoid some namespace issues in the generated vanillaApi client
import { AttrIdentifier } from '../vanillaApi/'
import * as P from 'parsimmon'
import intersperse from 'ramda/src/intersperse'

export const numberParser: P.Parser<number> =
  P.regexp(/[0–9]+/)
    .map(s => Number(s))

export type Sign = '+' | '-'

export type School
  = AttrIdentifier.Arcane
  | AttrIdentifier.Fire
  | AttrIdentifier.Frost
  | AttrIdentifier.Holy
  | AttrIdentifier.Nature
  | AttrIdentifier.Shadow

export const schools = [
  AttrIdentifier.Arcane,
  AttrIdentifier.Fire,
  AttrIdentifier.Frost,
  AttrIdentifier.Holy,
  AttrIdentifier.Nature,
  AttrIdentifier.Shadow,
]


export const schoolParser: P.Parser<School> =
  P.alt(
    ...schools.map(
      s => P.string(s) as P.Parser<School>
    )
  )

export type Resist = School

export const resistParser: P.Parser<Resist> =
  P.seq(
    schoolParser,
    P.whitespace,
    P.string('Resistance'),
  )
    .map(([school]) => school)

export const signParser: P.Parser<Sign> =
  (function() {
    const plusParser = P.regexp(/\+/)
      .map(s => '+' as Sign)
    const minusParser = P.regexp(/-/)

    return P.alt(
      // must put the (+-) parser first, otherwise the plusparser would match first
      P.seq(plusParser, minusParser)
        .map(s => '-' as Sign),
      plusParser,
    )
  })()

export function spaceDelim(parsers: P.Parser<string>[]): P.Parser<string[]> {
  const interspersed = intersperse(
    P.whitespace,
    parsers
  )

  return P.seq(...interspersed)
}
