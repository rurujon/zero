import React, { useEffect, useState } from 'react';
import axios from 'axios';

const NewsList = () => {
    const [newsItems, setNewsItems] = useState([]); // 초기 상태를 빈 배열로 설정
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchNews = async () => {
            try {
                const response = await axios.get('media/news'); // API URL
                console.log(response.data); // API 응답을 콘솔에 출력
                setNewsItems(response.data.items || []); // items가 undefined인 경우 빈 배열로 설정
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchNews();
    }, []);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div>
            <h1>뉴스 목록</h1>
            <ul>
                {newsItems.length > 0 ? (
                    newsItems.map((item, index) => (
                        <li key={index}>
                            <a href={item.link} target="_blank" rel="noopener noreferrer">
                                <h2>{item.title}</h2>
                            </a>
                            <p>{item.description}</p>
                            <p>작성자: {item.writer}</p>
                            <p>게시일: {new Date(item.pubDate).toLocaleDateString()}</p>
                        </li>
                    ))
                ) : (
                    <p>뉴스가 없습니다.</p>
                )}
            </ul>
        </div>
    );
};

export default NewsList;