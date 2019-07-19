import { Equipped, Slot, slots } from './types'

export const fromEquipped = (equipped: Equipped) => encode(
  slots.map(s => {
    // equipped[s] ? parseInt(equipped[s].id) : 0
    const item = equipped[s]
    if (item) {
      return parseInt(item.id)
    }
    return 0
  })
)

export const encode = (ids: number[]): string =>
  ids.map(x => x.toString(36))
    .join('.')

export const decode = (str: string): [Slot, string][] => {
  return str.split('.').map((x, i) => [slots[i], parseInt(x, 36).toString()])
}
