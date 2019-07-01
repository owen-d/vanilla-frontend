import React from 'react';
import './App.css';
import { PaperDoll } from './components/PaperDoll'
import { AppState } from './store'
import { connect } from 'react-redux'
import { State as TickState } from './store/tick/types'
import { sendTick } from './store/tick/actions'


interface Props {
    tick: TickState
    sendTick: typeof sendTick
}

const mapStateToProps = (state: AppState) => ({
    tick: state.tick
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
