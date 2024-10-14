import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LoginPage from './LoginPage';
import RegisterPage from './RegisterPage';

const HomePage = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [memId, setMemId] = useState('');
    const [showRegister, setShowRegister] = useState(false);
    const [showLogin, setShowLogin] = useState(true);
    const navigate = useNavigate();

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

    const handleMemberInfo = () => {
        navigate('/member-info');
    };

    return (
        <div>
            {!isLoggedIn ? (
                <div>
                    {showLogin && <LoginPage onLogin={handleLogin} />}

                    {!showRegister && showLogin && (
                        <button onClick={handleShowRegister}>회원가입</button>
                    )}
                    {showRegister && (
                        <div>
                            <RegisterPage onRegisterSuccess={handleRegisterSuccess} />
                            <button onClick={handleShowLogin}>로그인 돌아가기</button>
                        </div>
                    )}
                </div>
            ) : (
                <div>
                    <h2>환영합니다, {memId}님!</h2>
                    <button onClick={handleMemberInfo}>회원정보</button>
                    <button onClick={handleLogout}>로그아웃</button>
                </div>
            )}
        </div>
    );
};

export default HomePage;
