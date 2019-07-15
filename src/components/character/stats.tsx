import React from 'react'
import { Injections } from '../../store/paperDoll/actions'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import { State as DollProps } from '../../store/paperDoll/types'
import { AttrIdentifier } from '../../lib/vanillaApi'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import Divider from '@material-ui/core/Divider'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'

export type Props = { actions: Injections } & Pick<DollProps, 'partialDerivatives'>

export const StatList: React.FC<Props> = props => {
    const cardStyles: React.CSSProperties = { marginTop: '40%' }

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
                <Typography gutterBottom variant="h5" >
                    Dps gained by adding one of the following:
                </Typography>
                <Divider />
                <List>
                    {derivs}
                </List>
            </CardContent>
        </Card>
    ) : null
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
