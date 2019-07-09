import { singleSchoolDmgParser } from './effectParser'
import { schoolParser } from './parserUtils'
import { ScaledAttr, School, schools } from '../../store/items/types'
import { AttrIdentifier } from '../../lib/vanillaApi/'
import { parse } from './parserUtils'

test('schoolParser', () => {
  const input = 'Shadow'
  const expected = AttrIdentifier.Shadow
  expect(
    parse(schoolParser, input)
  ).toStrictEqual(expected)
})

test('singeSchoolDmgParser', () => {
  const input = "Increases damage done by Shadow spells and effects by up to 43."
  const expected = { attr: AttrIdentifier.Shadow, scale: 43 }
  expect(
    parse(singleSchoolDmgParser, input)
  ).toStrictEqual(expected)
})
