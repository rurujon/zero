import React, { useState } from 'react';
// import { BrowserRouter as Link, Navigate } from "react-router-dom";
import QuizModal from '../dailyQuiz/QuizModal';
import './HeaderSample.css';
import { Link, Navigate } from 'react-router-dom';

const HeaderSample = () => {

    const [isQuizModalOpen, setIsQuizModalOpen] = useState(false); // 모달 상태 추가

    // 각 메뉴에 대한 하위 메뉴 표시 여부를 관리하는 상태 변수
    const [activeMenu, setActiveMenu] = useState('');
  
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
              <Link to="/sub1">제로웨이스트 소개</Link>
              <Link to="/sub2">리사이클링 소개</Link>
            </>
          );
        case 'eco-news':
          return (
            <>
              <Link to="/naverNewsList">네이버 뉴스 api</Link>
              <Link to="/minEnv">환경부 정책</Link>
              <Link to="/orgList">봉사단체</Link>
              <Link to="/seoulNews/All">에코</Link>
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
              <Link to="/sub1">추천 상품</Link>
            </>
          );
        default:
          return null;
      }
    };
    const openQuizModal = () => {
      const memId = localStorage.getItem('memId'); // localStorage에서 memId 확인
  
      if (memId) {
        setIsQuizModalOpen(true); // 로그인된 경우 모달 열기
      } else {
        alert("로그인 한 사용자만 일일퀴즈가 가능합니다!");
        Navigate("/login"); // 로그인 페이지로 이동
      }
    };
  
    const closeQuizModal = () => {
      setIsQuizModalOpen(false); // 모달 닫기
    };
  
  
    const navItemStyle = (menu) => ({
      backgroundColor: activeMenu === menu ? '#111' : 'transparent', // 마우스 오버 시 배경색
      transition: 'background-color 0.3s ease', // 부드러운 전환 효과
      cursor: 'pointer', // 커서 모양 변경
    });


    return (
        <div className='header'>
            <div className='header-background header-background_one'>
                <nav className="header-content" onMouseLeave={handleMouseLeave}>
                    <div className="top-nav">
                        <h1>
                            <Link to="/">
                                여기다 로고
                            </Link>
                        </h1>
                        <nav className="bottom-nav">
                            <ul>
                            {['zero-donghaeng', 'eco-news', 'zero-activity', 'zero-consumer'].map(menu => (
                                <li key={menu} onMouseEnter={() => handleMouseEnter(menu)}>
                                <Link to={`/${menu}`}>{menu.replace('-', ' ').toUpperCase()}</Link>
                                </li>
                            ))}
                            </ul>

                            
                        </nav>
                        <div>
                            <div>로그</div>
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
        </div>
    );
};

export default HeaderSample;