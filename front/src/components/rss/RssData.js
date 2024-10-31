import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './RssData.css'

function RssData() {
    const [rssItems, setRssItems] = useState([]);

    // 데이터 fetch 함수
    const fetchRssData = async () => {
        try {
            const response = await axios.get('/api/rss/env/list');
            setRssItems(response.data); // 데이터 저장
        } catch (error) {
            console.error('Error fetching RSS data:', error);
        }
    };

    // 컴포넌트 마운트 시 데이터 fetch
    useEffect(() => {
        handleUpdate();
        fetchRssData();
    }, []);

    // 데이터 업데이트 핸들러
    const handleUpdate = async () => {
        try {
            await axios.post('/api/rss/env'); // 데이터 업데이트 요청
            fetchRssData(); // 업데이트 후 데이터 다시 fetch
        } catch (error) {
            console.error('Error updating RSS data:', error);
        }
    };

    

    return (
        <div className='RSS-container'>
            <div className='RSS-main-title'>
                <h1>RSS Feed</h1>
                <button onClick={handleUpdate}>Update RSS Data</button> {/* 업데이트 버튼 */}
            </div>
            <div className='RSS-main-content'>
                <ul>
                    {rssItems.map((item, index) => (
                        <li key={index}>
                            <Link to={`/minEnv/${item.rssId}`}><h3>{item.title}</h3></Link>
                            <span>등록일 : {item.pubDate}</span>
                            <Link to={`/minEnv/${item.rssId}`}><p>{item.description}</p></Link>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default RssData;