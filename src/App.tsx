import React from 'react';
import './App.css';
import { PaperDoll } from './components/paperDoll'
import { AppState } from './store'
import { connect } from 'react-redux'
import { State as TickState } from './store/tick/types'
import { State as DollState } from './store/paperDoll/types'
import { sendTick } from './store/tick/actions'


interface Props {
    tick: TickState
    doll: DollState
    sendTick: typeof sendTick
}

const mapStateToProps = (state: AppState) => ({
    tick: state.tick,
    doll: state.doll,
})

const App: React.FC<Props> = (props: Props) => {
    return (
        <div className="App">
            <header className="App-header">
                <PaperDoll />
            </header>
        </div >
    );
}

export default connect(
    mapStateToProps,
    // injections, i.e. for action creating functions
    { sendTick }
)(App);
