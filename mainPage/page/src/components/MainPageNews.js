import { Button } from 'bootstrap';
import React, {useState} from 'react';

const MainPageNews = () => {
    const [activeTab, setActiveTab] = useState('notice');
  
    const handleTabClick = (tab) => {
        setActiveTab(tab);
    };
  
    return (
        <div>
            <ul style={styles.ul}>
                <li style={styles.li}>
                    <button onClick={() => handleTabClick('notice')} style={styles.button}>
                        공지사항
                    </button>
                </li>
                <li style={styles.li}>
                    <button onClick={() => handleTabClick('menu1')} style={styles.button}>
                        메뉴1
                    </button>
                </li>
                <li style={styles.li}>
                    <button onClick={() => handleTabClick('menu2')} style={styles.button}>
                        메뉴2
                    </button>
                </li>
                <li style={styles.li}>
                    <button onClick={() => handleTabClick('menu3')} style={styles.button}>
                        메뉴3
                    </button>
                </li>
            </ul>
  
            <div>
                {activeTab === 'notice' && (
                    <div>
                        <ul>
                            <li><a href='#'>공지사항 기사 1</a></li>
                            <li><a href='#'>공지사항 기사 2</a></li>
                        </ul>
                    </div>
                )}
                {activeTab === 'menu1' && (
                    <div>
                    <ul>
                        <li><a href='#'>메뉴1 기사 1</a></li>
                        <li><a href='#'>메뉴1 기사 2</a></li>
                    </ul>
                    </div>
                )}
                {activeTab === 'menu2' && (
                    <div>
                        <ul>
                            <li><a href='#'>메뉴2 기사 1</a></li>
                            <li><a href='#'>메뉴2 기사 2</a></li>
                        </ul>
                    </div>
                )}
                {activeTab === 'menu3' && (
                    <div>
                        <ul>
                            <li><a href='#'>메뉴3 기사 1</a></li>
                            <li><a href='#'>메뉴3 기사 2</a></li>
                        </ul>
                    </div>
                )}
            </div>
        </div>
    );
};
  
const styles = {
    ul: {
      display: 'flex',
      listStyle: 'none',
      padding: 0,
      margin: 0,
    },
    li: {
      marginRight: '20px',
    },
    button: {
      background: 'none',
      border: 'none',
      color: 'blue',
      textDecoration: 'underline',
      cursor: 'pointer',
    }
};

export default MainPageNews;