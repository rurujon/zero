import React, { useState, useEffect } from 'react';
import LoginPage from './LoginPage';
import RegisterPage from './RegisterPage';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { adjustWindowSize } from './utils/Sizing';

const HomePage = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [memId, setMemId] = useState('');
    const [showRegister, setShowRegister] = useState(false);
    const [showLogin, setShowLogin] = useState(true);

    useEffect(() => {
        checkLoginStatus();
    }, []);

    const handleLogout = () => {
        axios.post('/member/logout', null, { withCredentials: true })
            .then(() => {
                setIsLoggedIn(false);
                setMemId('');
            })
            .catch(error => {
                console.error('로그아웃 실패:', error);
            });
    };

    useEffect(() => {
        window.handleLogout = handleLogout;
        return () => {
            delete window.handleLogout;
        };
    }, []);

    const checkLoginStatus = () => {
        axios.get('/member/check-login', { withCredentials: true })
            .then(response => {
                if (response.data.isLoggedIn) {
                    setIsLoggedIn(true);
                    setMemId(response.data.memId);
                }
            })
            .catch(error => console.error('Login status check failed:', error));
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
        alert('회원가입이 완료되었습니다. 로그인 해주세요.');
    };

    const handleRegisterCancel = () => {
        setShowRegister(false);
        setShowLogin(true);
    };

    const handleMemberInfo = async () => {
        const memberInfoUrl = '/member-info';

        try {
            const response = await axios.get('/member/info', { withCredentials: true });
            const memberData = response.data;

            if (!memberData || typeof memberData !== 'object') {
                throw new Error('회원 정보 데이터가 유효하지 않습니다.');
            }

            const newWindow = window.open(memberInfoUrl, 'MemberInfo', 'width=600,height=400,resizable=yes');

            newWindow.addEventListener('load', () => {
                adjustWindowSize(newWindow, memberData, false, []);
            });
        } catch (error) {
            console.error('회원 정보 가져오기 실패:', error);
            alert('회원 정보를 가져오는 데 실패했습니다.');
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
                                로그인 돌아가기
                            </button>
                        </div>
                    )}
                </div>
            ) : (
                <div>
                    <h2>환영합니다, {memId}님!</h2>
                    <button onClick={handleMemberInfo} className="btn btn-info">회원정보</button>&nbsp;
                    <button onClick={handleLogout} className="btn btn-danger">로그아웃</button>
                </div>
            )}
        </div>
    );
};

export default HomePage;
