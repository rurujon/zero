// src/components/NewsList.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const SeoulNews = () => {
  const [newsList, setNewsList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchNews(); // 컴포넌트가 마운트될 때 뉴스 데이터를 가져옵니다.
  }, []);

  const fetchNews = async () => {
    try {
      const response = await axios.get('/api/seoul/seoulNews/green');
      setNewsList(response.data);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  const handleCrawl = async () => {
    try {
      // 크롤링을 실행하는 API 호출
      await axios.post('/api/seoul/seoulNews/update');
      // 크롤링이 완료된 후 뉴스 리스트를 다시 가져옵니다.
      fetchNews();
    } catch (err) {
      setError(err);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <h1>Seoul News</h1>
      <button onClick={handleCrawl}>Crawl News</button> {/* 크롤링 버튼 추가 */}
      <ul>
        {newsList.map((news) => (
          <li key={news.title}>
            <h2><a href={news.link} target="_blank" rel="noopener noreferrer">{news.title}</a></h2>
            <p><a href={news.link} target="_blank" rel="noopener noreferrer">{news.content}</a></p>
            <p>{news.publishedDate}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SeoulNews;