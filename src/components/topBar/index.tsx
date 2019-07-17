import React from 'react'
import Button from '@material-ui/core/Button';
import AppBar from '@material-ui/core/AppBar';
import Grid from '@material-ui/core/Grid'
import { Theme } from '@material-ui/core/styles';
import { withStyles, WithStyles } from '@material-ui/core/styles';
import { darkGrey, lightGrey } from '../mui/theme'

const announcement = 'https://pikach.us/posts/2019-07-16-ElitistQuirks.html'
const styles = (theme: Theme) => ({
    button: {
        marginTop: theme.spacing() * 0.5,
        marginBottom: theme.spacing() * 0.5,
    },
    bar: {
        backgroundColor: lightGrey,
        marginBottom: theme.spacing(),
    }
});

interface Props extends WithStyles<typeof styles> { }


export const TopBar = withStyles(styles)(
    ({ classes }: Props) => {
        return (
            <AppBar position="static" className={classes.bar}>
                <Grid container direction="row-reverse">
                    <Grid item xs={2} md={1} style={{ overflowX: 'hidden' }}>
                        <Button
                            variant="contained"
                            href={announcement}
                            target="_blank"
                            className={classes.button}
                        >
                            Blog
                    </Button>
                    </Grid>
                </Grid>
            </AppBar>
        )
    }
)
