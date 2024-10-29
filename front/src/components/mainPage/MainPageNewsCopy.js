import React, { useEffect, useState } from 'react';
import "./MainPageNews.css"
import axios from 'axios';
import { Link } from 'react-router-dom';

const MainPageNewsCopy = () => {
    // 탭 상태 관리
    const [activeTab, setActiveTab] = useState('tab1');

    const [naverNews, setNaverNews] = useState([])
    const [seoulNews, setSeoulNews] = useState([])
    const [notices, setNotices] = useState([])
    const [envLaw, setEnvLaw] = useState([])

    // 탭 클릭 핸들러
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
        <div className="board_tab_wrap">
            <ul className="tabs" id="tabs">
                <li className={`tab ${activeTab === 'tab1' ? 'active' : ''}`}>
                    <a href="#tab1" onClick={() => handleTabClick('tab1')} title="">공지사항</a>
                </li>
                <li className={`tab ${activeTab === 'tab2' ? 'active' : ''}`}>
                    <a href="#tab2" onClick={() => handleTabClick('tab2')} title="">네이버 뉴스</a>
                </li>
                <li className={`tab ${activeTab === 'tab3' ? 'active' : ''}`}>
                    <a href="#tab3" onClick={() => handleTabClick('tab3')} title="">서울시 뉴스</a>
                </li>
                <li className={`tab ${activeTab === 'tab4' ? 'active' : ''}`}>
                    <a href="#tab4" onClick={() => handleTabClick('tab4')} title="">환경부 환경정책</a>
                </li>
            </ul>

            <div className="tab_container">
                {activeTab === 'tab1' && (
                    <div id="tab1" className="tab_content">
                        <h3 className="hidden_only">공지사항</h3>
                        <ul className="board_list">
                            {notices.map((notice, index) => (
                                <li key={index}>
                                    <Link to={`/notices/${index}`}>{notice.title}</Link>
                                    <span className="board_date">{new Date(notice.created).toISOString().split('T')[0]}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
                {activeTab === 'tab2' && (
                    <div id="tab2" className="tab_content">
                        <h3 className="hidden_only">네이버 뉴스</h3>
                        <ul className="board_list">
                            {naverNews.map((news, index) => (
                                <li key={index}>
                                    <a href={news.link}>{news.title}</a>
                                    <span className="board_date">{new Date(news.pubDate).toISOString().split('T')[0]}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
                {activeTab === 'tab3' && (
                    <div id="tab3" className="tab_content">
                        <h3 className="hidden_only">서울시 뉴스</h3>
                        <ul className="board_list">
                            {seoulNews.map((news, index) => (
                                <li key={index}>
                                    <Link to={`/seoulNewsArticle/${news.seoulId}`}>{news.title}</Link>
                                    <span className="board_date">{new Date(news.publishedDate).toISOString().split('T')[0]}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
                {activeTab === 'tab4' && (
                    <div id="tab4" className="tab_content">
                        <h3 className="hidden_only">환경부 환경정책</h3>
                        <ul className="board_list">
                            {envLaw.map((law, index) => (
                                <li key={index}>
                                    <Link to={`/minEnv/${law.rssId}`}>{law.title}</Link>
                                    <span>{law.pubDate}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
        </div>
    );
};

export default MainPageNewsCopy;