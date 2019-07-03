import React, { useState, useRef } from 'react'
import { Slot } from '../../store/paperDoll/types'
import { suggest } from '../../lib/itemization/query'
import { Item } from '../../lib/classicdb/item'
import { Slot as SlotQuery, ItemSearchResult } from '../../lib/itemization/typings'
import { Injections } from '../../store/paperDoll/actions'
import './items.css'


export interface Props {
    slot: Slot
    actions: Injections
    inputRef: React.RefObject<HTMLInputElement>
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
            ID: 0,
            Icon: 'some-icon',
            Current: {
                Name: 'test-item-rare',
                quality: 'rare',
            },
        },
        {
            ID: 1,
            Icon: 'some-icon',
            Current: {
                Name: 'test-item-common',
                quality: 'common',
            },
        },
        {
            ID: 2,
            Icon: 'some-icon',
            Current: {
                Name: 'test-item-uncommon',
                quality: 'uncommon',
            },
        }
    ],
}

// https://itemization.info/tooltip/19946

export const ItemPicker: React.FC<Props> = ({ inputRef, slot, actions }) => {
    // text box, list of selections.
    const [state, setState] = useState(initialState)

    const items = state.available.map(
        x => <li key={x.ID} className={x.Current.quality.toLowerCase()}>{x.Current.Name}</li>
    )


    const handleKey = async (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            if (state.selected) {
                const itemMeta = state.available[state.selected]
                const item = await Item.from_id(itemMeta.ID, itemMeta.Icon)
                setState({ ...state, query: '' })

                actions.equipItem({
                    slot,
                    item,
                })
            }

            if (inputRef.current) {
                inputRef.current.value = ''
            }
        }
    }

    // should debounce this, but would have to wire it up with hooks I think.
    const handleChange = async (e: React.FormEvent<HTMLInputElement>) => {
        const query = e.currentTarget.value
        /* const available = await suggest({
         *     slots: toSlotsQuery(slot),
         *     query,
         * })
         * setState({ ...state, available, query }) */
    }

    return (
        <div
            style={{
                display: 'flex'
            }}
            className={[slot, 'item-select'].join(' ')}
        >
            <input type="text"
                ref={inputRef}
                onChange={handleChange}
                onKeyPress={handleKey}
            />
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
