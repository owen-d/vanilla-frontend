import React from 'react'
import { Injections } from '../../store/paperDoll/actions'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import { State as DollProps } from '../../store/paperDoll/types'
import { AttrIdentifier } from '../../lib/vanillaApi/models/AttrIdentifier'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import Divider from '@material-ui/core/Divider'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'

export type Props = { actions: Injections } & Pick<DollProps, 'partialDerivatives' | 'dps' | 'spec'>

export const StatList: React.FC<Props> = props => {
    const cardStyles: React.CSSProperties = {}

    const derivs = props.partialDerivatives.map(([attrId, x], i) => {
        return (
            <ListItem key={attrId}>
                <Grid container justify="space-between">
                    <Grid item xs={4}>
                        <Typography variant="body1" gutterBottom>
                            {prettify(attrId)}
                        </Typography>
                    </Grid>
                    <Grid item xs={4}>
                        <Typography variant="body1" gutterBottom>
                            {x.toFixed(3)}
                        </Typography>
                    </Grid>
                </Grid>
            </ListItem>
        )
    })

    return props.partialDerivatives.length ? (
        <Card raised style={cardStyles}>
            <CardContent>
                <Typography gutterBottom variant="h6" >
                    {props.spec}: {props.dps} dps
                </Typography>
                <Divider />
                <Typography gutterBottom variant="h6" >
                    Dps gained by adding:
                </Typography>
                <Divider />
                <List>
                    {derivs}
                </List>
            </CardContent>
        </Card>
    ) : (
            <Card raised style={cardStyles}>
                <CardContent>
                    <Typography gutterBottom variant="h5" >
                        Click a spec icon to get started
                </Typography>
                </CardContent>
            </Card>
        )
}

const prettify = (attr: AttrIdentifier): String => {
    switch (attr) {
        case AttrIdentifier.SpellCrit:
            return "1% Spell Crit"
        case AttrIdentifier.SpellHit:
            return "1% Spell Hit"
        default:
            return `1 Spell Damage (${attr})`
    }
}
