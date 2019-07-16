import React from 'react'
import Divider from '@material-ui/core/Divider'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import ListSubheader from '@material-ui/core/ListSubheader'
import Paper from '@material-ui/core/Paper'

const faq: { q: string, a: string }[] = [
    {
        q: `Why aren't there any healers here?`,
        a: `Healers are a little more complex than damage dealers because they often aren't concerned with maximizing healing per second (hps) like damage dealers are with dps. Fight mechanics like incoming burst damage and encounter duration come into play, causing different stats to be more of less valuable for different fights. As an example, in longer fights the benefits of spirit, mp5, etc become a lot more valuable to them. Some fights also require intense throughput, but don't last as long. These considerations make it hard to create blanket statements as to what is "best". I'd like to add support for them, possibly with sliders for fight longevity, but I'm waiting to see how that idea develops. Please let me know if you have suggestions or want this feature.`
    }
]

const comingSoon: string[] = [
    "Only caster classes are currently supported. Melee will be coming in the future.",
    "Items currently don't show melee related and on-use effects -- this is just a visual effect and they'll be visible once coded.",
    "A way to save linkable exports of character sheets is under way.",
    "A more descriptive talent selection",
]

export const FAQ: React.FC<{}> = () => {
    const styles: React.CSSProperties = {
        marginTop: '1vh'
    }

    return (
        <Paper style={styles}>
            <List subheader={<li />}>
                <ListSubheader >Coming Soon</ListSubheader>
                {
                    comingSoon.map((s, i) => (
                        <ListItem key={i}>
                            <ListItemText>
                                {s}
                            </ListItemText>
                        </ListItem>
                    ))
                }
                <Divider />
                <ListSubheader >FAQ</ListSubheader>
                {
                    faq.map(({ q, a }, i) => (
                        <ListItem key={i}>
                            <ListItemText>
                                <b>Q</b>: {q}<br /><b>A</b>: {a}
                            </ListItemText>
                        </ListItem>
                    ))
                }
            </List>
        </Paper>
    )
}
