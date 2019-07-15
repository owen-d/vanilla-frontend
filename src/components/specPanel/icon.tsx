import React, { useState } from 'react'

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

const grey = '#707070'
const white = '#ffffff'

export const Icon: React.FC<Props & DivProps> = props => {
    const [state, setState] = useState(initialState)
    const deltaState = (deltas: Partial<State>) => () => setState({ ...state, ...deltas })

    const imageStyles: React.CSSProperties = {
        borderRadius: '30%',
        backgroundColor: state.highlighted || props.selected ? white : grey,
        padding: '1px',
        maxHeight: '100%',
        maxWidth: '100%',
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
