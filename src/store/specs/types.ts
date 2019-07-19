import { SpecIdentifier } from "../../lib/vanillaApi";


export const specs: SpecIdentifier[] = [
  SpecIdentifier.FireMage,
  SpecIdentifier.FrostMage,
  SpecIdentifier.ArcaneMage,
  SpecIdentifier.Warlock,
  SpecIdentifier.BalanceDruid,
  SpecIdentifier.ElementalShaman,
  SpecIdentifier.ShadowPriest,
]

export const isSpec = (s: string | SpecIdentifier): s is SpecIdentifier => {
  const reducer = (acc: boolean, spec: SpecIdentifier): boolean => acc || s === spec
  return specs.reduce(reducer, false)
}
