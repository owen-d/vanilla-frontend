import React from 'react';
import { AppState } from './store'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { State as TickState } from './store/tick/types'
import { State as DollState } from './store/paperDoll/types'
import * as tickA from './store/tick/actions'
import * as dollA from './store/paperDoll/actions'
import { theme, withTheme } from './components/mui/theme'
import createStyles from '@material-ui/core/styles/createStyles';
import Grid from '@material-ui/core/Grid';
import { withStyles, WithStyles } from '@material-ui/styles';
import { Theme } from '@material-ui/core/styles'
import { Character } from './components/character/'

const styles = (theme: Theme) =>
    createStyles({
        root: {
            textAlign: 'center',
            paddingTop: theme.spacing() * 0.4,
            backgroundColor: '#282c34',
            fontSize: 'calc(10px + 2vmin)',
        },
    });


interface Props extends WithStyles<typeof styles> {
    tick: TickState
    tickActions: tickA.Injections
    doll: DollState
    dollActions: dollA.Injections
}

const mapStateToProps = (state: AppState) => ({
    tick: state.tick,
    doll: state.doll,
})

// https://github.com/reduxjs/react-redux/issues/89#issuecomment-137510218
function mapDispatchToProps(dispatch: any) {
    return {
        tickActions: bindActionCreators(tickA.injections, dispatch),
        dollActions: bindActionCreators(dollA.injections, dispatch),
    }
}


const App = withStyles(styles)(
    (props: Props) => {
        return (
            <Grid
                className={props.classes.root}
                container
                direction="row"
                justify="center"
            >
                <Character {...props.doll} actions={props.dollActions} />
            </Grid>
        )
    }
)


export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(withTheme(theme, App));
