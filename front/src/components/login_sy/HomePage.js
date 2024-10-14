// src/components/HomePage.jsx

import React, { useState } from 'react';
import LoginPage from './LoginPage';
import RegisterPage from './RegisterPage';

const HomePage = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [memId, setMemId] = useState('');
    const [showRegister, setShowRegister] = useState(false);
    const [showLogin, setShowLogin] = useState(true);

    const handleLogin = (id) => {
        setIsLoggedIn(true);
        setMemId(id);
    };

    const handleLogout = () => {
        setIsLoggedIn(false);
        setMemId('');
    };

    const handleShowRegister = () => {
        setShowRegister(true);
        setShowLogin(false);
    };

    const handleShowLogin = () => {
        setShowRegister(false);
        setShowLogin(true);
    };

    const handleRegisterSuccess = () => {
        setShowRegister(false);
        setShowLogin(true);
        alert('회원가입이 완료되었습니다. 로그인 해주세요.');
    };

    return (
        <div className="container" >
            {!isLoggedIn ? (
                <div class="dl-item" style={{marginBottom:'15px'}}>
                    {showLogin && <LoginPage onLogin={handleLogin} />}

                    {!showRegister && showLogin && (
                        <button class="btn btn-outline-secondary" onClick={handleShowRegister}>회원가입</button>
                    )}
                    {showRegister && (
                        <div className="card" style={{marginBottom:'15px'}}>
                            <RegisterPage onRegisterSuccess={handleRegisterSuccess} />
                            <button class="btn btn-outline-secondary" onClick={handleShowLogin} style={{width: '600px'}}>로그인 돌아가기</button>
                        </div>
                    )}
                </div>
            ) : (
                <div className="card">
                    <h2>환영합니다, {memId}님!</h2>
                    <button onClick={handleLogout}>로그아웃</button>
                </div>
            )}
        </div>
    );
};

export default HomePage;
