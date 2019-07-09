import React from 'react';
import './App.css';
import { PaperDoll } from './components/paperDoll'
import { AppState } from './store'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { State as TickState } from './store/tick/types'
import { State as DollState } from './store/paperDoll/types'
import * as tickA from './store/tick/actions'
import * as dollA from './store/paperDoll/actions'

interface Props {
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

const App: React.FC<Props> = (props: Props) => {
    return (
        <div className="App">
            <header className="App-header">
                <PaperDoll {...props.doll} actions={props.dollActions} />
            </header>
        </div >
    );
}

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(App);
