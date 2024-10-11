import axios from 'axios';
import { Button } from 'bootstrap';
import React, {useEffect, useState} from 'react';
import { Link } from 'react-router-dom';

const MainPageNews = () => {
    const [activeTab, setActiveTab] = useState('notices');

    const [news, setNews] = useState([])
    const [notices, setNotices] = useState([])
  
    const handleTabClick = (tab) => {
        setActiveTab(tab);
    };

    useEffect(() => {
        const fetchNotices = async () => {
            try {
                const response = await axios.get('/miniNotice');
                console.log('Notices data:', response.data); // 데이터가 제대로 받아졌는지 콘솔에 출력
                setNotices(response.data);
            } catch (error) {
                console.error('Error fetching notices:', error);
            }
        };

        // const fetchNews = async () => {
        //     try {
        //         const response = await axios.get('/miniNews');
        //         console.log('Notices data:', response.data); // 데이터가 제대로 받아졌는지 콘솔에 출력
        //         setNews(response.data);
        //     } catch (error) {
        //         console.error('Error fetching news:', error);
        //     }
        // };

        fetchNotices();
        // fetchNews();
    },[])


  
    return (
        <div>
            <div>
                <ul style={styles.ul}>
                    <li style={styles.li}>
                        <button onClick={() => handleTabClick('notices')} style={styles.button}>
                            공지사항
                        </button>
                    </li>
                    <li style={styles.li}>
                        <button onClick={() => handleTabClick('news')} style={styles.button}>
                            뉴스
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
            </div>

            <div style={styles.dataContainer}>
                {activeTab === 'notices' && (
                    <div>
                        <table style={styles.table}>
                            <tbody>
                                {notices.map((notice, index) => (
                                    <tr key={index}>
                                        <td style={styles.td}>
                                            <Link to={`/notices/${index}`}>{notice.title}</Link>
                                        </td>
                                        <td style={styles.td}>{notice.writer}</td>
                                        <td style={styles.td}>{new Date(notice.created).toISOString().split('T')[0]}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
                {activeTab === 'news' && (
                    <div>
                        <ul>
                            {/* {news.map((newsItem, index) => (
                                <li key={index}>
                                    <Link to={`/news/${index}`}>{newsItem.title} - {newsItem.writer} - {newsItem.created}</Link>
                                </li>
                            ))} */}
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
    },

    dataContainer: {
        overflow: 'auto', // 스크롤 활성화
        maxHeight: '400px', // 원하는 최대 높이 설정
    },

    table: {
        width: '100%',
        borderCollapse: 'collapse',
    },
    th: {
        borderBottom: '2px solid black',
        padding: '10px',
        textAlign: 'left',
    },
    td: {
        borderBottom: '1px solid gray',
        padding: '10px',
    },
};

export default MainPageNews;