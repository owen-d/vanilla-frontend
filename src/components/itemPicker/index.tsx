import React, { useState, useRef } from 'react'
import { Slot } from '../../store/paperDoll/types'
import { Injections } from '../../store/paperDoll/actions'
import { AowowSlot, Item } from '../../store/items/types'
import { suggester } from './suggest'
import { thumbnailUrl } from '../../lib/util/thumbnail'
import './items.css'

export interface Props {
    slot: Slot
    actions: Injections
    inputRef: React.RefObject<HTMLInputElement>
}

interface State {
    query: string
    available: Item[]
    selected: number
}

const initialState: State = {
    query: '',
    available: [],
    selected: 0,
}

const suggest = suggester(400, { leading: true, maxWait: 1200, trailing: true })

export const ItemPicker: React.FC<Props> = ({ inputRef, slot, actions, ...props }) => {
    const [state, setState] = useState(initialState)

    const equipItem = (item: Item) => {
        actions.equipItem({ slot, item })
        setState({ ...state, query: '', selected: 0 })
        if (inputRef.current) {
            inputRef.current.value = ''
        }
    }

    const items = state.available.map(
        (x, i) => <li key={x.id}
            className={x.quality.toLowerCase()}
            onMouseEnter={() => setState({ ...state, selected: i })}
            onClick={() => equipItem(x)}
            style={{
                display: 'flex',
                justifyContent: 'space-between',
                background: i === state.selected ? '#383838' : undefined,
            }}
        >
            <span>{x.name}</span>
            <img src={thumbnailUrl(x.id)} style={{ height: '4vh' }} />
        </li>
    )


    const handleKey = async (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' && state.available.length > state.selected) {
            const item = state.available[state.selected]
            equipItem(item)

        } else if (e.key === 'ArrowUp' && state.selected > 0) {
            setState({ ...state, selected: state.selected - 1 })
        } else if (e.key === 'ArrowDown' && state.selected < (state.available.length - 1)) {
            setState({ ...state, selected: state.selected + 1 })
        }

    }

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
                onKeyDown={handleKey}
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
