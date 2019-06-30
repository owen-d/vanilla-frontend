import React from 'react';
import './App.css';
import { PaperDoll } from './components/PaperDoll/Doll'

const App: React.FC = () => {
    return (
        <div className="App">
            <header className="App-header">
                <PaperDoll />
            </header>
        </div >
    );
}

export default App;
