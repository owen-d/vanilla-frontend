import React, { useState, useRef } from 'react'
import { Slot } from '../../store/paperDoll/types'
import { Injections } from '../../store/paperDoll/actions'
import { AowowSlot, Item } from '../../store/items/types'
import { suggester } from './suggest'
import './items.css'

export interface Props {
    slot: Slot
    actions: Injections
    inputRef: React.RefObject<HTMLInputElement>
}

interface State {
    query: string
    available: Item[] // TODO(add search)
    selected: number // index in available
}

const initialState: State = {
    query: "",
    available: [],
    selected: 0,
}

const suggest = suggester(400, { leading: true, maxWait: 1200, trailing: true })

export const ItemPicker: React.FC<Props> = ({ inputRef, slot, actions }) => {
    // text box, list of selections.
    const [state, setState] = useState(initialState)

    const items = state.available.map(
        x => <li key={x.id} className={x.quality.toLowerCase()}>{x.name}</li>
    )


    const handleKey = async (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            if (state.selected && state.available.length > state.selected) {
                const item = state.available[state.selected]
                setState({ ...state, query: '' })

                actions.equipItem({
                    slot,
                    item,
                })
            }

            if (inputRef.current) {
                inputRef.current.value = ''
            }
        } else {

        }
    }

    // should debounce this, but would have to wire it up with hooks I think.
    const handleChange = async (e: React.FormEvent<HTMLInputElement>) => {
        const input = e.currentTarget.value
        setState({ ...state, query: input })
        const query = {
            query: input,
            slots: toAowowSlot(slot),
        }
        suggest(
            query,
            (items: Item[]) => setState({ ...state, available: items })
        )
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

function toAowowSlot(slot: Slot): AowowSlot[] {
    switch (slot) {
        case Slot.Head:
            return [AowowSlot.Head]
        case Slot.Gloves:
            return [AowowSlot.Hands]
        case Slot.Neck:
            return [AowowSlot.Neck]
        case Slot.Belt:
            return [AowowSlot.Waist]
        case Slot.Shoulders:
            return [AowowSlot.Shoulders]
        case Slot.Pants:
            return [AowowSlot.Legs]
        case Slot.Cloak:
            return [AowowSlot.Back]
        case Slot.Boots:
            return [AowowSlot.Feet]
        case Slot.Chest:
            return [AowowSlot.Chest]
        case Slot.Ring1:
            return [AowowSlot.Finger]
        case Slot.Ring2:
            return [AowowSlot.Finger]
        case Slot.Trinket1:
            return [AowowSlot.Trinket]
        case Slot.Bracers:
            return [AowowSlot.Wrists]
        case Slot.Trinket2:
            return [AowowSlot.Trinket]
        case Slot.Mainhand:
            return [AowowSlot.Onehand, AowowSlot.Twohand, AowowSlot.Mainhand]
        case Slot.Offhand:
            return [AowowSlot.Shield, AowowSlot.Offhand, AowowSlot.HeldOffhand]
        case Slot.Ranged:
            return [AowowSlot.Ranged, AowowSlot.Relic]
    }
}
