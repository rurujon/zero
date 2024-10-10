import React, {useState} from 'react';

const MainPageNews = () => {

    const [activeMenu, setActiveMenu] = useState('notice'); // 현재 선택된 메뉴

    const handleMenuClick = (menu) => {
        setActiveMenu(menu); // 클릭한 메뉴를 활성화
    };

    return (
        <div>
            <ul style={styles.ul}>
                <li style={styles.li}>
                    <a href='#' onClick={() => handleMenuClick('notice')}>공지사항</a>
                </li>
                <li style={styles.li}>
                    <a href='#' onClick={() => handleMenuClick('menu1')}>메뉴1</a>
                </li>
                <li style={styles.li}>
                    <a href='#' onClick={() => handleMenuClick('menu2')}>메뉴2</a>
                </li>
                <li style={styles.li}>
                    <a href='#' onClick={() => handleMenuClick('menu3')}>메뉴3</a>
                </li>
            </ul>
            
            {activeMenu === 'notice' && (
                <div>
                    <ul>
                        <li><a href=''>공지사항 기사1</a></li>
                        <li><a href=''>공지사항 기사2</a></li>
                    </ul>
                </div>
            )}

            {/* 메뉴1 내용 */}
            {activeMenu === 'menu1' && (
                <div>
                    <ul>
                        <li><a href=''>메뉴1 기사1</a></li>
                        <li><a href=''>메뉴1 기사2</a></li>
                    </ul>
                </div>
            )}

            {/* 메뉴2 내용 */}
            {activeMenu === 'menu2' && (
                <div>
                    <ul>
                        <li><a href=''>메뉴2 기사1</a></li>
                        <li><a href=''>메뉴2 기사2</a></li>
                    </ul>
                </div>
            )}

            {/* 메뉴3 내용 */}
            {activeMenu === 'menu3' && (
                <div>
                    <ul>
                        <li><a href=''>메뉴3 기사1</a></li>
                        <li><a href=''>메뉴3 기사2</a></li>
                    </ul>
                </div>
            )}
        </div>
    );
};

const styles = {
    ul: {
        display: 'flex',  // 가로로 나열
        listStyle: 'none', // 기본 목록 스타일 제거 (원형, 숫자 등)
        padding: 0,        // 기본 패딩 제거
        margin: 0,         // 기본 마진 제거
    },
    li: {
        marginRight: '20px', // 메뉴 항목 간 간격 추가
    }
};

export default MainPageNews;