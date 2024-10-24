import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import './Header.css';

function Header() {
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
            <Link to="/sub1">네이버 뉴스 api</Link>
            <Link to="/sub2">환경 관련 검색어</Link>
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
      case 'zero-consumer':
        return (
          <>
            <Link to="/sub1">하위 메뉴 1</Link>
            <Link to="/sub2">하위 메뉴 2</Link>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div>
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
                <li><Link to="/loginMain">Login</Link></li>
                <li><Link to="/about">메뉴2</Link></li>
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