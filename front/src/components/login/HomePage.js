// src/components/login/HomePage.js
import React, { useState, useEffect, useContext } from 'react';
import LoginPage from './LoginPage';
import RegisterPage from './RegisterPage';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { adjustWindowSize } from './utils/Sizing';
import { AuthContext } from './context/AuthContext';
import { jwtDecode } from 'jwt-decode'; // Named import

const HomePage = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [memId, setMemId] = useState('');
    const [showRegister, setShowRegister] = useState(false);
    const [showLogin, setShowLogin] = useState(true);

    const { token, logout } = useContext(AuthContext);

    useEffect(() => {
        if (token) {
            try {
                const decoded = jwtDecode(token);
                setMemId(decoded.sub);
                setIsLoggedIn(true);
            } catch (e) {
                console.error('Token decoding failed:', e);
                logout();
            }
        }
    }, [token, logout]);

    const handleLogout = () => {
        logout();
        setIsLoggedIn(false);
        setMemId('');
        alert('Logout successful');
    };

    const handleLogin = (id) => {
        setIsLoggedIn(true);
        setMemId(id);
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
        alert('Registration completed. Please log in.');
    };

    const handleRegisterCancel = () => {
        setShowRegister(false);
        setShowLogin(true);
    };

    const handleMemberInfo = async () => {
        try {
            const response = await axios.get('/member/info');
            const memberData = response.data;

            if (!memberData || typeof memberData !== 'object') {
                throw new Error('Invalid member data.');
            }

            const memberInfoUrl = '/member-info';
            const newWindow = window.open(memberInfoUrl, 'MemberInfo', 'width=600,height=400,resizable=yes');

            newWindow.addEventListener('load', () => {
                adjustWindowSize(newWindow, memberData, false, []);
            });
        } catch (error) {
            console.error('Failed to retrieve member info:', error);
            alert('Failed to retrieve member information.');
        }
    };

    return (
        <div className="container mt-4">
            {!isLoggedIn ? (
                <div>
                    {showLogin && (
                        <>
                            <LoginPage onLogin={handleLogin} />
                            <button
                                onClick={handleShowRegister}
                                className="btn btn-outline-secondary btn-sm mt-3"
                            >
                                Register
                            </button>
                        </>
                    )}
                    {showRegister && (
                        <div>
                            <RegisterPage
                                onRegisterSuccess={handleRegisterSuccess}
                                onRegisterCancel={handleRegisterCancel}
                            />
                            <button
                                onClick={handleShowLogin}
                                className="btn btn-outline-secondary btn-sm mt-3"
                            >
                                Back to Login
                            </button>
                        </div>
                    )}
                </div>
            ) : (
                <div>
                    <h2>Welcome, {memId}!</h2>
                    <button onClick={handleMemberInfo} className="btn btn-info">Member Info</button>&nbsp;
                    <button onClick={handleLogout} className="btn btn-danger">Logout</button>
                </div>
            )}
        </div>
    );
};

export default HomePage;
