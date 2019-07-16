import React, { useState } from 'react'
import { grey, white } from '../mui/theme'

export interface Props {
    image: string
    alt: string
    selected: boolean
}

type DivProps = Partial<React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>>

interface State {
    highlighted: boolean
}

const initialState: State = {
    highlighted: false
}

export const Icon: React.FC<Props & DivProps> = props => {
    const [state, setState] = useState(initialState)
    const deltaState = (deltas: Partial<State>) => () => setState({ ...state, ...deltas })

    const imageStyles: React.CSSProperties = {
        borderRadius: '30%',
        backgroundColor: state.highlighted || props.selected ? white : grey,
        padding: '1px',
        height: '100%',
        width: '100%',
    }

    return (
        <div
            onMouseEnter={deltaState({ highlighted: true })}
            onMouseLeave={deltaState({ highlighted: false })}
            {...props}
        >
            <img
                src={props.image}
                alt={props.alt}
                style={imageStyles}
            />
        </div>
    )
}
