import React, { useState, useEffect, useContext } from 'react';
import LoginPage from './LoginPage';
import RegisterPage from './RegisterPage';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { adjustWindowSize } from './utils/Sizing';
import { AuthContext } from './context/AuthContext';
import { jwtDecode } from 'jwt-decode';
import QuizModal from '../dailyQuiz/QuizModal';

const HomePage = () => {
    const [showRegister, setShowRegister] = useState(false);
    const [showLogin, setShowLogin] = useState(true);

    const { token, logout, login, memId } = useContext(AuthContext);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        if (token) {
            try {
                jwtDecode(token);
                setIsLoggedIn(true);
            } catch (e) {
                console.error('Token decoding failed:', e);
                logout();
            }
        } else {
            setIsLoggedIn(false);
        }
    }, [token, logout]);

    const handleLogout = () => {
        logout();
        alert('로그아웃되었습니다.');
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
        alert('회원가입이 완료되었습니다. 로그인해주세요.');
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
            console.error('회원 정보 조회 실패:', error);
            alert('회원 정보를 불러오는데 실패했습니다.');
        }
    };

    return (
        <div className="container mt-4">
            <QuizModal/>
            {!isLoggedIn ? (
                <div>
                    {showLogin && (
                        <>
                            <LoginPage onLogin={login}/>
                            <button
                                onClick={handleShowRegister}
                                className="btn btn-outline-secondary btn-sm mt-3"
                                style={{marginLeft:'25px'}}
                            >
                                회원가입
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
                                style={{marginLeft:'25px', marginBottom:'20px'}}
                            >
                                로그인으로 돌아가기
                            </button>
                        </div>
                    )}
                </div>
            ) : (
                <div>
                    <h2>환영합니다, {memId}님!</h2>
                    <button onClick={handleMemberInfo} className="btn btn-info">회원 정보</button>&nbsp;
                    <button onClick={handleLogout} className="btn btn-danger">로그아웃</button>
                </div>
            )}
        </div>
    );
};

export default HomePage;
