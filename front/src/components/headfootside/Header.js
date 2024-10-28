import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import QuizModal from '../dailyQuiz/QuizModal';

function Header() {

  const [isQuizModalOpen, setIsQuizModalOpen] = useState(false); // 모달 상태 추가

  // 각 메뉴에 대한 하위 메뉴 표시 여부를 관리하는 상태 변수
  const [activeMenu, setActiveMenu] = useState(null);

  // 마우스가 메뉴 위에 올라가면 하위 메뉴를 표시
  const handleMouseEnter = (menu) => {
    setActiveMenu(menu);
  };

  // 마우스가 메뉴를 벗어나면 하위 메뉴를 숨김
  const handleMouseLeave = () => {
    setActiveMenu(null);
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
    <header style={styles.header}>
      {/* 로고와 첫 번째 메뉴바 */}
      <div style={styles.logoNavContainer}>
        <h1 style={styles.logo}>My Website</h1>
        <nav>
          <ul style={styles.navList}>
            <li style={styles.navItem}><Link to="/loginMain">Login</Link></li>
            <li 
              style={navItemStyle('quiz')} // 스타일 적용
              onClick={openQuizModal} 
              onMouseEnter={() => handleMouseEnter('quiz')} // 마우스 오버 시 상태 변경
              onMouseLeave={handleMouseLeave} // 마우스 벗어날 때 상태 초기화
            >
              오늘의 퀴즈
            </li>
            <li style={styles.navItem}><Link to="/services">메뉴3</Link></li>
            <li style={styles.navItem}><Link to="/contact">메뉴4</Link></li>
          </ul>
        </nav>
      </div>

      {/* 이미지 추가 */}
      <div style={styles.imageContainer}>
        <Link to={"/"}><img src="/images/logo.png" width="300px" alt="logo" style={styles.image} /></Link>
      </div>

      {/* 두 번째 메뉴바 */}
      <nav>
        <ul style={styles.secondNavList}>
          <li
            style={styles.navItem}
            onMouseEnter={() => handleMouseEnter('zero-donghaeng')}
            onMouseLeave={handleMouseLeave}
          >
            <Link to="/zero-donghaeng">제로동행</Link>
            {activeMenu === 'zero-donghaeng' && (
              <ul style={styles.subMenu}>
                <li><Link to="/sub1">제로웨이스트 소개</Link></li>
                <li><Link to="/sub2">리사이클링 소개</Link></li>
              </ul>
            )}
          </li>
          <li
            style={styles.navItem}
            onMouseEnter={() => handleMouseEnter('eco-news')}
            onMouseLeave={handleMouseLeave}
          >
            <Link to="/eco-news">에코뉴스</Link>
            {activeMenu === 'eco-news' && (
              <ul style={styles.subMenu}>
                <li><Link to="/sub1">네이버 뉴스 api</Link></li>
                <li><Link to="/sub2">환경 관련 검색어</Link></li>
              </ul>
            )}
          </li>
          <li
            style={styles.navItem}
            onMouseEnter={() => handleMouseEnter('zero-news')}
            onMouseLeave={handleMouseLeave}
          >
            <Link to="/zero-news">제로소식</Link>
            {activeMenu === 'zero-news' && (
              <ul style={styles.subMenu}>
                <li><Link to="/seoulNews/eco">에코</Link></li>
                <li><Link to="/seoulNews/env">환경</Link></li>
                <li><Link to="/seoulNews/air">기상</Link></li>
                <li><Link to="/seoulNews/green">그린</Link></li>
              </ul>
            )}
          </li>
          <li
            style={styles.navItem}
            onMouseEnter={() => handleMouseEnter('zero-activity')}
            onMouseLeave={handleMouseLeave}
          >
            <Link to="/zero-activity">제로활동</Link>
            {activeMenu === 'zero-activity' && (
              <ul style={styles.subMenu}>
                <li><Link to="/sub1">하위 메뉴 1</Link></li>
                <li><Link to="/sub2">하위 메뉴 2</Link></li>
              </ul>
            )}
          </li>
          <li
            style={styles.navItem}
            onMouseEnter={() => handleMouseEnter('zero-consumer')}
            onMouseLeave={handleMouseLeave}
          >
            <Link to="/zero-consumer">제로슈머</Link>
            {activeMenu === 'zero-consumer' && (
              <ul style={styles.subMenu}>
                <li><Link to="/sub1">하위 메뉴 1</Link></li>
                <li><Link to="/sub2">하위 메뉴 2</Link></li>
              </ul>
            )}
          </li>
        </ul>
      </nav>
      <QuizModal isOpen={isQuizModalOpen} setIsOpen={closeQuizModal} />
    </header>
  );
}

const styles = {
  header: {
    padding: '10px 20px',
    backgroundColor: '#333',
    color: 'white',
  },
  logoNavContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  logo: {
    fontSize: '24px',
    fontWeight: 'bold',
  },
  navList: {
    display: 'flex',
    listStyle: 'none',
    margin: 0,
    padding: 0,
  },
  navItem: {
    marginLeft: '20px',
    position: 'relative',
  },
  link: {
    color: 'white',
    textDecoration: 'none',
  },
  imageContainer: {
    textAlign: 'center',
    marginTop: '10px',
  },
  image: {
    maxWidth: '100%',
    height: 'auto',
  },
  secondNavList: {
    display: 'flex',
    width:'auto',
    justifyContent: 'space-around',
    listStyle: 'none',
    margin: '20px 0 0 0',
    padding: 0,
    backgroundColor: '#444',
  },
  subMenu: {
    position: 'absolute',
    top: '100%',
    left: 0,
    backgroundColor: '#666',
    listStyle: 'none',
    padding: '10px',
    margin: 0,
    display: 'block',
    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)',
  },


};

export default Header;