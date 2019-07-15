import { ReqFields } from '../../lib/vanillaApi/models/ReqFields'
import { Stats } from '../../lib/vanillaApi/models/Stats'
import { SpecIdentifier } from '../../lib/vanillaApi/models/SpecIdentifier'

export const defaultSpec = SpecIdentifier.Warlock
export const defaultStats: Stats = {
  crit: 0,
  arcane: 0,
  hit: 0,
  shadow: 0,
  frost: 0,
  holy: 0,
  fire: 0,
  healing: 0,
  pen: 0,
  nature: 0,
}
