import React, { useEffect } from 'react'
import { Injections } from '../../store/paperDoll/actions'
import { State as DollProps } from '../../store/paperDoll/types'
import { PaperDoll } from '../paperDoll/'
import { StatList } from './stats'
import Grid from '@material-ui/core/Grid'
import { TopBar } from '../topBar/'
import { FAQ } from '../faq/'
import { decode } from '../../store/paperDoll/itemSignatures'
import qs from 'query-string'
import { lookupItem } from '../../lib/searchApi/lookup'


export type Props = { actions: Injections } & DollProps

interface State { }

// loads gear from querystring
const initialLoad = (equipItem: Injections['equipItem']) => {
    const parsed = qs.parse(window.location.search)
    if (!parsed.gear || Array.isArray(parsed.gear)) {
        return
    }
    const ids = decode(parsed.gear as string)
    ids.filter(([_, id]) => id !== '0')
        .forEach(([slot, id]) => {
            lookupItem(id)
                .then(item => equipItem({ slot, item }))
        })

}


export const Character: React.FC<Props> = props => {
    useEffect(() => initialLoad(props.actions.equipItem), [props.actions.equipItem])
    return (
        <Grid container justify="center">
            <Grid item xs={12}>
                <TopBar />
            </Grid>
            <Grid item xs={10} md={3} xl={2}>
            </Grid>
            <Grid item xs={10} md={8} lg={5} xl={3}>
                <PaperDoll {...props} />
            </Grid>
            <Grid item xs={10} md={3} xl={2}>
                <StatList {...props} />
            </Grid>
            <Grid item xs={10}>
                <FAQ />
            </Grid>
        </Grid>
    )
}
