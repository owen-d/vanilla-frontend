import { AowowSlot } from '../../store/items/types'

export interface Query {
  query: string
  slots?: AowowSlot[]
}

export const isValid = (q: any): boolean => {
  return typeof q.query === 'string' && (q.slots === undefined || Array.isArray(q.slots))
}
