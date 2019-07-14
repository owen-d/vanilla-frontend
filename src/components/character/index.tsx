import React from 'react'
import { Injections } from '../../store/paperDoll/actions'
import { State as DollProps } from '../../store/paperDoll/types'
import { PaperDoll } from '../paperDoll/'
import Grid from '@material-ui/core/Grid';


export type Props = { actions: Injections } & DollProps

interface State { }

export const Character: React.FC<Props> = props => {
    return (
        <Grid container justify="center">
            <Grid item xs={5}>
                <PaperDoll {...props} />
            </Grid>
        </Grid>
    )
}
