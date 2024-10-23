import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function RssData() {
    const [rssItems, setRssItems] = useState([]);

    useEffect(() => {
        console.log("Fetching RSS data...");
        axios.post('/api/rss/env')
            .then(response => {
                // 여기에 저장된 데이터를 불러오는 API를 호출
                return axios.get('/api/rss/env/list');
            })
            .then(response => {
                setRssItems(response.data);
            })
            .catch(error => console.error('Error fetching RSS data:', error));
    }, []);

    return (
        <div>
            <h1>RSS Feed</h1>
            <ul>
                {rssItems.map((item, index) => (
                    <li key={index}>
                        <h2>{item.title}</h2>
                        <p>{item.description}</p>
                        <Link to={`/minEnv/${encodeURIComponent(item.title)}`}>Read more</Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default RssData;