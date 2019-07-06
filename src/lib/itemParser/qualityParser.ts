import * as P from 'parsimmon'
import { ItemQuality as QualityColor } from '../classicdb/types'
import { ItemQuality } from '../../store/items/types'

const qualityCodes = [
  QualityColor.POOR,
  QualityColor.COMMON,
  QualityColor.UNCOMMON,
  QualityColor.RARE,
  QualityColor.EPIC,
  QualityColor.LEGENDARY,
  QualityColor.ARTIFACT,
  QualityColor.BLIZZARD,
  QualityColor.NOQUALITY,
]

const codeMap: Record<string, ItemQuality> = {
  [QualityColor.POOR]: ItemQuality.Poor,
  [QualityColor.COMMON]: ItemQuality.Common,
  [QualityColor.UNCOMMON]: ItemQuality.Uncommon,
  [QualityColor.RARE]: ItemQuality.Rare,
  [QualityColor.EPIC]: ItemQuality.Epic,
  [QualityColor.LEGENDARY]: ItemQuality.Legendary,
  [QualityColor.ARTIFACT]: ItemQuality.Artifact,
  [QualityColor.BLIZZARD]: ItemQuality.Blizzard,
  [QualityColor.NOQUALITY]: ItemQuality.None,
}

export const qualityParser: P.Parser<ItemQuality> =
  P.alt(
    ...qualityCodes.map(s =>
      P.string(s).map(x => codeMap[x])
    )
  )

