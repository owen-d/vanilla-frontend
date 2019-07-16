import React from 'react'
import { Injections } from '../../store/paperDoll/actions'
import { State as DollProps } from '../../store/paperDoll/types'
import { PaperDoll } from '../paperDoll/'
import { StatList } from './stats'
import Grid from '@material-ui/core/Grid'


export type Props = { actions: Injections } & DollProps

interface State { }

export const Character: React.FC<Props> = props => {
    return (
        <Grid container justify="center">
            <Grid item xs={10} md={3} xl={2}>
            </Grid>
            <Grid item xs={10} md={8} lg={5} xl={3}>
                <PaperDoll {...props} />
            </Grid>
            <Grid item xs={10} md={3} xl={2}>
                <StatList {...props} />
            </Grid>
        </Grid>
    )
}
