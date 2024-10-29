import axios from 'axios';
import React, {useEffect, useState} from 'react';
import { Link } from 'react-router-dom';

const MainPageNews = () => {
    const [activeTab, setActiveTab] = useState('notices');

    const [naverNews, setNaverNews] = useState([])
    const [seoulNews, setSeoulNews] = useState([])
    const [notices, setNotices] = useState([])
    const [envLaw, setEnvLaw] = useState([])
  
    const handleTabClick = (tab) => {
        setActiveTab(tab);
    };

    useEffect(() => {
        const fetchNotices = async () => {
            try {
                const response = await axios.get('/api/miniboard/miniNotice');
                console.log('Notices data:', response.data); // 데이터가 제대로 받아졌는지 콘솔에 출력
                setNotices(response.data);
            } catch (error) {
                console.error('Error fetching notices:', error);
            }
        };

        const fetchNaverNews = async () => {
            try {
                const response = await axios.get('/api/naver/news/miniNews');
                console.log('NaverNews data:', response.data); // 데이터가 제대로 받아졌는지 콘솔에 출력
                setNaverNews(response.data);
            } catch (error) {
                console.error('Error fetching news:', error);
            }
        };

        const fetchSeoulNews = async () => {
            try {
                const response = await axios.get('/api/seoul/seoulNews/mini');
                console.log('SeoulNews data:', response.data); // 데이터가 제대로 받아졌는지 콘솔에 출력
                setSeoulNews(response.data);
            } catch (error) {
                console.error('Error fetching news:', error);
            }
        };

        const fetchEnvLaw = async () => {
            try {
                const response = await axios.get('/api/rss/env/mini');
                console.log('EnvLaw data:', response.data); // 데이터가 제대로 받아졌는지 콘솔에 출력
                setEnvLaw(response.data);
            } catch (error) {
                console.error('Error fetching news:', error);
            }
        };


        fetchNotices();
        fetchNaverNews();
        fetchSeoulNews();
        fetchEnvLaw();
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
                        <button onClick={() => handleTabClick('naverNews')} style={styles.button}>
                            네이버 뉴스
                        </button>
                    </li>
                    <li style={styles.li}>
                        <button onClick={() => handleTabClick('seoulNews')} style={styles.button}>
                            서울시 뉴스
                        </button>
                    </li>
                    <li style={styles.li}>
                        <button onClick={() => handleTabClick('envLaw')} style={styles.button}>
                            환경부 환경정책
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
                {activeTab === 'naverNews' && (
                    <div>
                        <ul>
                            {naverNews.map((naverNews, index) => (
                                <li key={index}>
                                    {/* <Link to={`/news/${index}`}>{newsItem.title}</Link> */}
                                    <a href={naverNews.link} target="_blank" rel="noopener noreferrer">{naverNews.title}</a>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
                {activeTab === 'seoulNews' && (
                    <div>
                        <ul>
                            {seoulNews.map((seoulNews, index) => (
                                <li key={index}>
                                    {/* <Link to={`/news/${index}`}>{newsItem.title}</Link> */}
                                    {seoulNews.seoulNewsGroup }
                                    <a href={seoulNews.link} target="_blank" rel="noopener noreferrer">{seoulNews.title}</a>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
                {activeTab === 'envLaw' && (
                    <div>
                        <ul>
                            {envLaw.map((envLaw, index) => (
                                <li key={index}>
                                    {/* <Link to={`/news/${index}`}>{newsItem.title}</Link> */}
                                    <a href={envLaw.link} target="_blank" rel="noopener noreferrer">{envLaw.title}</a>
                                </li>
                            ))}
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