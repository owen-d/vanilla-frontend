import React, { useState } from 'react'
import { Slot } from '../../store/paperDoll/types'
import { suggest } from '../../lib/itemization/query'
import { Slot as SlotQuery, ItemSearchQuery, ItemSearchResult } from '../../lib/itemization/typings'
import './tooltip.css'

export interface Props {
    slot: Slot
}

interface State {
    query: string
    available: ItemSearchResult[]
    selected?: number // index in available
}

const initialState: State = {
    query: "",
    available: [
        {
            ID: 123,
            Icon: 'some-icon',
            Current: {
                Name: 'test-item-rare',
                quality: 'rare',
            },
        },
        {
            ID: 123,
            Icon: 'some-icon',
            Current: {
                Name: 'test-item-common',
                quality: 'common',
            },
        },
        {
            ID: 123,
            Icon: 'some-icon',
            Current: {
                Name: 'test-item-uncommon',
                quality: 'uncommon',
            },
        }
    ],
}

// https://itemization.info/tooltip/19946

export const ItemPicker: React.FC<Props> = ({ slot }) => {
    // text box, list of selections.
    const [state, setState] = useState(initialState)

    const items = state.available.map(
        x => <li className={x.Current.quality.toLowerCase()}>{x.Current.Name}</li>
    )

    return (
        <div
            style={{ display: 'flex', visibility: 'hidden' }}
            className={[slot, 'item-select'].join(' ')}
        >
            <input type="text" />
            <ul style={{ padding: 0, marginTop: 0 }}>{items}</ul>
        </div >
    )
}


function toSlotsQuery(slot: Slot): SlotQuery[] {
    switch (slot) {
        case Slot.Head:
            return [SlotQuery.Head]
        case Slot.Gloves:
            return [SlotQuery.Hands]
        case Slot.Neck:
            return [SlotQuery.Neck]
        case Slot.Belt:
            return [SlotQuery.Waist]
        case Slot.Shoulders:
            return [SlotQuery.Shoulders]
        case Slot.Pants:
            return [SlotQuery.Legs]
        case Slot.Cloak:
            return [SlotQuery.Back]
        case Slot.Boots:
            return [SlotQuery.Feet]
        case Slot.Chest:
            return [SlotQuery.Chest]
        case Slot.Ring1:
            return [SlotQuery.Finger]
        case Slot.Ring2:
            return [SlotQuery.Finger]
        case Slot.Trinket1:
            return [SlotQuery.Trinket]
        case Slot.Bracers:
            return [SlotQuery.Wrists]
        case Slot.Trinket2:
            return [SlotQuery.Trinket]
        case Slot.Mainhand:
            return [SlotQuery.Onehand, SlotQuery.Twohand, SlotQuery.Mainhand]
        case Slot.Offhand:
            return [SlotQuery.Shield, SlotQuery.Offhand, SlotQuery.HeldOffhand]
        case Slot.Ranged:
            return [SlotQuery.Ranged, SlotQuery.Relic]
    }
}
