import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import './Header.css'

function Header() {
  const [activeMenu, setActiveMenu] = useState('');

  const handleMouseEnter = (menuName) => {
    setActiveMenu(menuName);
  };

  const handleMouseLeave = () => {
    setActiveMenu(''); // 헤더 영역에서 벗어나면 하위 메뉴 숨김
  };

  return (
    <div>
    <div className="header-background_one"> {/* 배경색을 담당하는 div */}
    <div className="header-content" onMouseLeave={handleMouseLeave}> {/* 헤더 전체에 마우스 리브 이벤트 추가 */}
      
      <div className="top-nav">
        <h1>
          <Link to="/">
            <img src="/images/logo.png" width="50px" alt="logo" />
          </Link>
          My Website
        </h1>
        <nav>
          <ul>
            <li><Link to="/loginMain">Login</Link></li>
            <li><Link to="/about">메뉴2</Link></li>
            <li><Link to="/services">메뉴3</Link></li>
            <li><Link to="/contact">메뉴4</Link></li>
          </ul>
        </nav>
      </div>
    </div>
    </div>
    <div className="header-background_two"> {/* 배경색을 담당하는 div */}
    <div className="header-content" onMouseLeave={handleMouseLeave}> {/* 헤더 전체에 마우스 리브 이벤트 추가 */}
      <nav className="bottom-nav">
        <ul>
          <li
            onMouseEnter={() => handleMouseEnter('zero-donghaeng')}
          >
            <Link to="/zero-donghaeng">제로동행</Link>
          </li>
          <li
            onMouseEnter={() => handleMouseEnter('eco-news')}
          >
            <Link to="/eco-news">에코뉴스</Link>
          </li>
          <li
            onMouseEnter={() => handleMouseEnter('zero-news')}
          >
            <Link to="/zero-news">제로소식</Link>
          </li>
          <li
            onMouseEnter={() => handleMouseEnter('zero-activity')}
          >
            <Link to="/zero-activity">제로활동</Link>
          </li>
          <li
            onMouseEnter={() => handleMouseEnter('zero-consumer')}
          >
            <Link to="/zero-consumer">제로슈머</Link>
          </li>
        </ul>

        {activeMenu && (
          <div className='header-background_three'>
          <div className="submenu-layer">
            
            <div className="sub-menu-content">
            <div className='header-content_two'>
              {activeMenu === 'zero-donghaeng' && (
                <>
                  <Link to="/sub1">제로웨이스트 소개</Link>
                  <Link to="/sub2">리사이클링 소개</Link>
                </>
              )}
              {activeMenu === 'eco-news' && (
                <>
                  <Link to="/sub1">네이버 뉴스 api</Link>
                  <Link to="/sub2">환경 관련 검색어</Link>
                </>
              )}
              {activeMenu === 'zero-news' && (
                <>
                  <Link to="/seoulNews/eco">에코</Link>
                  <Link to="/seoulNews/env">환경</Link>
                  <Link to="/seoulNews/air">기상</Link>
                  <Link to="/seoulNews/green">그린</Link>
                </>
              )}
              {activeMenu === 'zero-activity' && (
                <>
                  <Link to="/sub1">하위 메뉴 1</Link>
                  <Link to="/sub2">하위 메뉴 2</Link>
                </>
              )}
              {activeMenu === 'zero-consumer' && (
                <>
                  <Link to="/sub1">하위 메뉴 1</Link>
                  <Link to="/sub2">하위 메뉴 2</Link>
                </>
              )}
            </div>
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