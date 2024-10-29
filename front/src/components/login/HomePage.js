import React, { useState, useEffect, useContext, useCallback } from 'react';
import LoginPage from './LoginPage';
import FindIdModal from './FindIdModal';
import FindPasswordModal from './FindPasswordModal';
import PointInfoModal from './PointInfoModal';
import { AuthContext } from './context/AuthContext';
import { jwtDecode } from 'jwt-decode';
import QuizModal from '../dailyQuiz/QuizModal';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
    const [showLogin, setShowLogin] = useState(false);
    const [showFindIdModal, setShowFindIdModal] = useState(false);
    const [showFindPasswordModal, setShowFindPasswordModal] = useState(false);
    const [showPointInfoModal, setShowPointInfoModal] = useState(false);

    const { token, logout, login, memId } = useContext(AuthContext);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const navigate = useNavigate();

    const handleLogout = useCallback(() => {
        logout();
        setIsLoggedIn(false);
    }, [logout]);

    useEffect(() => {
        if (token) {
            try {
                jwtDecode(token);
                setIsLoggedIn(true);
            } catch (e) {
                console.error('Token decoding failed:', e);
                handleLogout();
            }
        } else {
            setIsLoggedIn(false);
        }
    }, [token, handleLogout]);

    const handleMemberInfo = () => {
        window.open('/member-info', 'MemberInfo', 'width=600,height=400,resizable=yes');
    };

    const handlePointInfo = () => {
        setShowPointInfoModal(true);
    };

    const handleRegister = () => {
        navigate('/register');
    };

    return (
        <div>
            {!isLoggedIn ? (
                <div>
                    <h5>제로동행을 더 안전하고 편리하게 이용하세요</h5>

                    <button
                        onClick={() => setShowLogin(true)}
                        className="btn btn-primary btn-lg"
                        style={{ marginBottom: '20px' }}
                    >
                        ZERO TOGATHER 로그인
                    </button>
                    {showLogin && (
                        <div
                            style={{
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                position: 'relative',
                                top: 0,
                                left: 0,
                                width: '100%',
                                height: '100px',
                                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                                zIndex: 1000
                            }}
                        >
                            <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '8px', boxShadow: '0 0 10px rgba(0,0,0,0.25)' }}>
                                <LoginPage onLogin={login} />
                                <button onClick={() => setShowLogin(false)} className="btn btn-secondary mt-3">닫기</button>
                            </div>
                        </div>
                    )}
                    <div>
                        <button type="button" className="btn btn-link" onClick={() => setShowFindIdModal(true)}>아이디 찾기</button>
                        <button type="button" className="btn btn-link" onClick={() => setShowFindPasswordModal(true)}>비밀번호 찾기</button>
                        <button type="button" className="btn btn-link" onClick={handleRegister}>회원가입</button>
                    </div>
                    <FindIdModal show={showFindIdModal} onHide={() => setShowFindIdModal(false)} />
                    <FindPasswordModal show={showFindPasswordModal} onHide={() => setShowFindPasswordModal(false)} />
                </div>
            ) : (
                <div>
                    <h2>안녕하세요, {memId}님. 좋은 하루되세요.</h2>
                    <button onClick={handleMemberInfo} className="btn btn-info">My정보조회</button>&nbsp;
                    <button onClick={handlePointInfo} className="btn btn-success">POINT조회</button>&nbsp;
                    <button onClick={handleLogout} className="btn btn-danger">로그아웃</button>
                    <QuizModal />
                    {showPointInfoModal && (
                        <PointInfoModal
                            show={showPointInfoModal}
                            onHide={() => setShowPointInfoModal(false)}
                            memId={memId}
                        />
                    )}
                </div>
            )}
        </div>
    );
};

export default HomePage;
