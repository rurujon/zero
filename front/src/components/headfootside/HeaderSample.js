import React, { useState, useContext, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import QuizModal from '../dailyQuiz/QuizModal';
import { AuthContext } from '../login/context/AuthContext';
import './HeaderSample.css';
import LoginPage from '../login/LoginPage';

const HeaderSample = () => {
    const { memId, logout, login } = useContext(AuthContext);
    const navigate = useNavigate();
    const [showLogin, setShowLogin] = useState(false);
    const [activeMenu, setActiveMenu] = useState('');
    const [currentLogoIndex, setCurrentLogoIndex] = useState(0);

    const logos = [
        '/images/login/klogo.png',
        '/images/login/elogo.png'
    ];

    useEffect(() => {
        const intervalId = setInterval(() => {
            setCurrentLogoIndex((prevIndex) => (prevIndex + 1) % logos.length);
        }, 3000);

        return () => clearInterval(intervalId);
    }, []);



    const handleMouseEnter = (menuName) => {
        setActiveMenu(menuName);
    };

    const handleMouseLeave = () => {
        setActiveMenu('');
    };

    const renderSubMenu = () => {
        switch (activeMenu) {
            case 'zero-donghaeng':
                return (
                    <>
                        <Link to="/zerowaste">제로웨이스트 소개</Link>
                        <Link to="/recycling">리사이클링 소개</Link>
                        <Link to="/upcycling">업사이클링 소개</Link>
                        <Link to="/zerodongheng">팀 제로동행</Link>
                    </>
                );
            case 'eco-news':
                return (
                    <>
                        <Link to="/naverNewsList">네이버 뉴스</Link>
                        <Link to="/minEnv">환경부 정책</Link>
                        <Link to="/seoulNews/All">서울시 뉴스</Link>
                        <Link to="/orgList">봉사단체</Link>
                    </>
                );
            case 'zero-news':
                return (
                    <>
                        <Link to="/seoulNews/eco">에코</Link>
                        <Link to="/seoulNews/env">환경</Link>
                        <Link to="/seoulNews/air">기상</Link>
                        <Link to="/seoulNews/green">그린</Link>
                    </>
                );
            case 'zero-activity':
                return (
                    <>
                        <Link to="/board/list">참여게시판</Link>
                        <Link to="/imgboard/list">인증게시판</Link>
                    </>
                );
            case 'zero-consumer':
                return (
                    <>
                        <Link to="/googleMap">전체 상점</Link>
                        <Link to="/exchange/list">포인트 교환 신청</Link>
                    </>
                );
            default:
                return null;
        }
    };


  const handleLoginClick = () => {
      if (memId) {
          logout();
          navigate('/mainpage');
      } else {
          setShowLogin(true);
      }
  };

  const handleLoginSuccess = async (token, refreshToken, id, userRole) => {
      try {
          await login(token, refreshToken, id, userRole);
          setShowLogin(false);
      } catch (error) {
          console.error('Login failed:', error);
          alert("로그인에 실패했습니다. 다시 시도해주세요.");
      }
  };

    return (
        <div className='header'>
            <div className='header-background header-background_one'>
                <nav className="header-content" onMouseLeave={handleMouseLeave}>
                    <div className="top-nav">
                    <h1>
                            <Link to="/mainpage">
                                <img
                                    src={logos[currentLogoIndex]}
                                    alt="로고"
                                    style={{width: '250px', height: 'auto'}}
                                />
                            </Link>
                        </h1>
                        <div>
                        <nav className="bottom-nav">
                            <ul>
                                {['zero-donghaeng', 'eco-news', 'zero-activity', 'zero-consumer'].map(menu => (
                                    <li key={menu} onMouseEnter={() => handleMouseEnter(menu)}>
                                        {menu.replace('-', ' ').toUpperCase()}
                                    </li>
                                ))}
                            </ul>
                        </nav>
                        </div>

                        <div>
                            <Link to="/mainpage"><img src='/images/home.png' alt="홈" /></Link>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            <img
                                src={memId ? '/images/login/on.png' : '/images/login/off.png'}
                                alt={memId ? "로그아웃" : "로그인"}
                                onClick={handleLoginClick}
                                style={{width: '77px', height: '77x', cursor: 'pointer'}}
                            />
                        </div>
                    </div>
                    {activeMenu && (
                        <div className='header-background_three'>
                            <div className="submenu-layer">
                                <div className="sub-menu-content">
                                    {renderSubMenu()}
                                </div>
                            </div>
                        </div>
                    )}
                </nav>
            </div>
            {showLogin && (
                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        backgroundColor: 'rgba(0, 0, 0, 0.5)',
                        zIndex: 1000
                    }}
                >
                    <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '8px', boxShadow: '0 0 10px rgba(0,0,0,0.25)' }}>
                        <LoginPage onLoginSuccess={handleLoginSuccess} />
                        <button onClick={() => setShowLogin(false)} className="btn btn-secondary mt-3">닫기</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default HeaderSample;
