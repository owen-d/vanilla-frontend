export enum Slot {
  Head = 'head',
  Neck = 'neck',
  Shoulders = 'shoulders',
  Shirt = 'shirt',
  Chest = 'chest',
  Waist = 'waist',
  Legs = 'legs',
  Feet = 'feet',
  Wrists = 'wrists',
  Hands = 'hands',
  Finger = 'finger',
  Trinket = 'trinket',
  Onehand = 'one-hand',
  Shield = 'shield',
  Ranged = 'ranged',
  Back = 'back',
  Twohand = 'two - hand',
  Quiver = 'quiver',
  Relic = 'relic',
  Mainhand = 'main hand',
  Offhand = 'off hand',
  HeldOffhand = 'held in off-hand',
}

// curl -s https://itemization.info/complete?q=pat%20slot:head | jq '.'
export interface ItemSearchQuery {
  slots: Slot[],
  query: string,
}

export interface ItemSearchResult {
  ID: number,
  Icon: string,
  Current: {
    Name: string,
    quality: string,
  }
}

// icons fetched through
// https://itemization.info/icons/inv_helmet_12.png

export interface ItemIdQuery {
  id: number,
}
