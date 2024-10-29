import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import QuizModal from '../dailyQuiz/QuizModal';
import './Header.css';

function Header() {

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
            <Link to="/sub">참여게시판</Link>
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
    setIsQuizModalOpen(true); // 모달 열기
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
      <div className="header-background header-background_one">
        <div className="header-content" onMouseLeave={handleMouseLeave}>
          <div className="top-nav">
            <h1>
              <Link to="/">
                <img src="/images/logo.png" width="50px" alt="logo" />
              </Link>
              My Website
            </h1>
            <nav>
              <ul>
                <li><Link to="/login">Login</Link></li>
                <li><Link to="/about">MyPage</Link></li>
                <li><Link to="/services">메뉴3</Link></li>
                <li><Link to="/contact">메뉴4</Link></li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
      <div className="header-background header-background_two">
        <div className="header-content" onMouseLeave={handleMouseLeave}>
          <nav className="bottom-nav">
            <ul>
              {['zero-donghaeng', 'eco-news', 'zero-news', 'zero-activity', 'zero-consumer'].map(menu => (
                <li key={menu} onMouseEnter={() => handleMouseEnter(menu)}>
                  <Link to={`/${menu}`}>{menu.replace('-', ' ').toUpperCase()}</Link>
                </li>
              ))}
            </ul>

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
    </div>
  );
}

export default Header;
