import React from 'react';
import './App.css';
import { PaperDoll } from './components/paperDoll'
import { AppState } from './store'
import { connect } from 'react-redux'
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

const App: React.FC<Props> = (props: Props) => {
    return (
        <div className="App">
            <header className="App-header">
                <PaperDoll {...props.doll} {...{ actions: props.dollActions }} />
            </header>
        </div >
    );
}

export default connect(
    mapStateToProps,
    // injections, i.e. for action creating functions.
    // These are defined in action files
    {
        tickActions: tickA.injections,
        dollActions: dollA.injections,
    }
)(App);
