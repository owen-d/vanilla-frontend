import { BaseAttr, baseAttrs, Stat, School, Sign, Resist, PrimaryStat } from '../../store/items/types'
import { primaryStatParser, statParser } from './statParser'
import { parse, signParser, numberParser } from './parserUtils'
import * as P from 'parsimmon'


test('signParser', () => {
  const inputs = ['+', '+-']
  const expected = [
    '+',
    '-',
  ]

  inputs.map((input, i) => expect(
    parse(signParser, input)
  ).toStrictEqual(expected[i]))

})

test('statParser', () => {
  const inputs = ['Intellect', 'Stamina', 'Frost Resistance']
  const expected = ['Intellect', 'Stamina', 'Frost']
  inputs.map((input, i) => expect(
    parse(statParser, input)
  ).toStrictEqual(expected[i]))

})

test('primaryStatParser', () => {
  const inputs = [
    "+33 Intellect",
    "+32 Stamina",
    "+-5 Spirit",
    "+5 Frost Resistance",
  ]

  const expected = [
    {
      amplitude: 33,
      sign: '+',
      stat: 'Intellect',
    },
    {
      amplitude: 32,
      sign: '+',
      stat: 'Stamina',
    },
    {
      amplitude: 5,
      sign: '-',
      stat: 'Spirit',
    },
    {
      amplitude: 5,
      sign: '+',
      stat: 'Frost',
    },
  ]

  inputs.map((input, i) => expect(
    parse(primaryStatParser, input)
  ).toStrictEqual(expected[i]))

});
