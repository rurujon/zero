import React, { useState, useEffect } from 'react';
import LoginPage from './LoginPage';
import RegisterPage from './RegisterPage';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const HomePage = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [memId, setMemId] = useState('');
    const [showRegister, setShowRegister] = useState(false);
    const [showLogin, setShowLogin] = useState(true);

    useEffect(() => {
        // 페이지 로드 시 로그인 상태 확인
        checkLoginStatus();
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
            // 회원 정보 데이터 가져오기
            const response = await axios.get('/member/info', { withCredentials: true });
            const memberData = response.data;

            // memberData가 null이 아닌지 확인
            if (!memberData || typeof memberData !== 'object') {
                throw new Error('회원 정보 데이터가 유효하지 않습니다.');
            }

            // 데이터에서 라인 수 계산
            const linesCount = Object.keys(memberData).length; // 속성 수를 사용
            const lineHeight = 30; // 각 라인의 높이 (예: 30px)
            const padding = 40; // 추가 여백 (상하)

            // 데이터 높이 계산
            const calculatedHeight = (linesCount * lineHeight) + padding;

            // 버튼과 탈퇴 관련 문구 높이 추가
            const buttonHeight = 60; // 버튼 높이 (예: 30px * 2)
            const additionalHeight = 100; // 탈퇴 버튼 클릭 시 추가 문구 높이

            const totalHeight = calculatedHeight + buttonHeight + additionalHeight; // 전체 높이 계산

            // 데이터의 최대 길이를 기준으로 가로 길이 계산
            const maxWidth = Math.max(...Object.values(memberData).map(data => (data || '').length)) * 10; // 각 문자당 10px
            const initialWidth = Math.min(Math.max(maxWidth, 300), 800); // 최소/최대 너비 설정 (300px - 800px)

            // 가로 및 세로 크기 1.5배로 조정
            const newWidth = Math.floor(initialWidth * 1.5);
            const newHeight = Math.floor(totalHeight * 1.5);

            const windowFeatures = `width=${newWidth},height=${newHeight},resizable=yes,scrollbars=no,status=1`;
            window.open(memberInfoUrl, 'MemberInfo', windowFeatures);
        } catch (error) {
            console.error('회원 정보 가져오기 실패:', error);
            alert('회원 정보를 가져오는 데 실패했습니다.');
        }
    };

    return (
        <div className="container mt-4">
            {!isLoggedIn ? (
                <div>
                    {showLogin && <LoginPage onLogin={handleLogin} />}

                    {!showRegister && showLogin && (
                        <button
                            onClick={handleShowRegister}
                            className="btn btn-outline-secondary btn-sm"
                            style={{ marginLeft: '30px' }}
                        >
                            회원가입
                        </button>
                    )}
                    {showRegister && (
                        <div>
                            <RegisterPage
                                onRegisterSuccess={handleRegisterSuccess}
                                onRegisterCancel={handleRegisterCancel} // onRegisterCancel prop 추가
                            />
                            <button
                                onClick={handleShowLogin}
                                className="btn btn-outline-secondary btn-sm"
                                style={{ marginLeft: '30px' }}
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
