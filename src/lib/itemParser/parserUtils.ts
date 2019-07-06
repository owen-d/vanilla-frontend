import * as P from 'parsimmon'
import intersperse from 'ramda/src/intersperse'
import { Sign, School, schools, Resist } from '../../store/items/types'


export function parse<A>(parser: P.Parser<A>, str: string) {
  const result = parser.parse(str)
  if (result.status) {
    return result.value
  }
  return undefined
}

export const numberParser: P.Parser<number> =
  P.regexp(/[0-9]+/).map(Number)

export const schoolParser: P.Parser<School> =
  P.alt(
    ...schools.map(
      s => P.string(s) as P.Parser<School>
    )
  )

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
