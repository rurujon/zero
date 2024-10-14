import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './components/login/HomePage';
import RegisterPage from './components/login/RegisterPage';
import MemberInfoPage from './components/login/MemberInfoPage';

function App() {
    return (
        <Router>
            <div className="App">
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/register" element={<RegisterPage />} />
                    <Route path="/member-info" element={<MemberInfoPage />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
