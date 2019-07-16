import React, { useState } from 'react'
import { Slot } from '../../store/paperDoll/types'
import { Injections } from '../../store/paperDoll/actions'
import { AowowSlot, Item } from '../../store/items/types'
import { suggester } from './suggest'
import { ItemTable, defaultTippyOpts } from '../itemTooltip/'
import { thumbnailUrl } from '../../lib/util/thumbnail'
import Tippy from '@tippy.js/react'
import '../itemTooltip/main.css'

export interface Props {
    slot: Slot
    actions: Injections
    hideTooltip: () => void
    inputRef: React.Ref<HTMLInputElement>
}

interface State {
    query: string
    available: Item[]
    selected: number
    hovered?: number
}

const initialState: State = {
    query: '',
    available: [],
    selected: 0,
    hovered: undefined,
}

const suggest = suggester(400, { leading: true, maxWait: 1200, trailing: true })

export const ItemPicker: React.FC<Props> = ({ slot, actions, ...props }) => {
    const [state, setState] = useState(initialState)

    const equipItem = (item: Item) => {
        actions.equipItem({ slot, item })
        setState({ ...state, query: '', selected: 0, hovered: undefined })
        props.hideTooltip()
    }


    // must include tab index in order for relatedTarget to fire upon blur events
    // https://stackoverflow.com/a/42764495
    const items = state.available.map(
        (x, i) => {
            const isHovered = i === state.hovered

            return (
                <Tippy
                    key={`itempicker-${x.name}`}
                    {...defaultTippyOpts}
                    content={<ItemTable item={x} />}
                    visible={isHovered}
                >

                    <li key={`item-${x.name}`}
                        className={x.quality.toLowerCase()}
                        tabIndex={-1}
                        onMouseEnter={() => setState({ ...state, selected: i, hovered: i })}
                        onMouseLeave={() => setState({ ...state, hovered: undefined })}
                        onClick={() => equipItem(x)}
                        style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            background: i === state.selected ? '#383838' : undefined,
                        }}
                    >
                        <span>{x.name}</span>
                        <img
                            src={thumbnailUrl(x.id)}
                            style={{ height: '4vh' }}
                            alt={`${x.name}-tooltip`}
                        />
                    </li>
                </Tippy>
            )
        }
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

    const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const input = e.target.value
        const newState = { ...state, query: input }
        setState(newState)
        const query = {
            query: input,
            slots: toAowowSlot(slot),
        }
        suggest(
            query,
            (items: Item[]) => {
                setState({ ...newState, selected: 0, available: items })
            }
        )
    }


    const onBlur = (event: React.FocusEvent<HTMLDivElement>) => {
        // https://developer.mozilla.org/en-US/docs/Web/API/Event/Comparison_of_Event_Targets
        if (!event.currentTarget.contains(event.relatedTarget as Node)) {
            // focus is leaving the container
            setState({ ...state, query: '' })
            props.hideTooltip()
        }
    }

    return (
        <div
            style={{
                display: 'flex',
            }}
            className={[slot, 'item-select'].join(' ')}
            onBlur={onBlur}
        >
            <input type="text"
                style={{
                    fontSize: '150%',
                }}
                ref={props.inputRef}
                onChange={handleChange}
                onKeyDown={handleKey}
                value={state.query}
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
