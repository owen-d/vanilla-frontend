import * as P from 'parsimmon'
import { Slot } from '../../store/paperDoll/types'
import { AowowSlot, aowowSlots } from '../../store/items/types'


export const slotParser: P.Parser<AowowSlot> =
  P.alt(
    ...aowowSlots.map(s =>
      P.string(s).map(x => x as AowowSlot)
    )
  )
