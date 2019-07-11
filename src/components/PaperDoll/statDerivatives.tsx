import React from 'react'
import { State as DollProps } from '../../store/paperDoll/types'
import './statDerivatives.css'

export type Props = Pick<DollProps, 'dps' | 'partialDerivatives'>

export const StatList: React.FC<Props> = (props) => {
    const statDerivatives = props.partialDerivatives.map(x =>
        <tr key={x[0]}>
            <td>{x[1].toFixed(2)}</td>
            <th>{x[0]}</th>
        </tr>
    )

    /* <div style={containerStyles}>

     * <span style={itemStyles}> dps:</span><span style={itemStyles}>{props.dps}</span>
     * {
     *     statDerivatives.length ? (
     *         <div>
     *             <span style={itemStyles}>dps change by addition of the following:</span>
     *             <ul style={itemStyles}>{statDerivatives}</ul>
     *         </div>
     *     ) : null
     * }
     * </div> */

    return (
        <div id="statDerivatives">
            <p>current gear yields</p>
            <table id="dps">
                <tbody>
                    <tr key="dps">
                        <td>{props.dps.toFixed(2)}</td>
                        <th>dps</th>
                    </tr>
                </tbody>
            </table>
            {statDerivatives.length ? [
                <p>dps increases by stat</p>,
                <table id="derivatives">
                    <tbody>
                        {statDerivatives}
                    </tbody>
                </table>
            ] : null}
        </div>

    )
}

