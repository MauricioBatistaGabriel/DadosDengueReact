import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import DadosDengue from './pages/DadosDengue';

const App = () => {
    return (
        <Router>
            <div className="App">
                <Routes>
                    <Route path="/" element={<DadosDengue />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;