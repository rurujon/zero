// src/components/NewsList.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './SeoulNews.css';

const SeoulNews = () => {
  const [newsList, setNewsList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('all'); // 카테고리 상태 추가
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10); // 페이지당 항목 수
  const [isActive, setIsActive] = useState(false);

  const pagesPerGroup = 10; // 한 번에 표시할 페이지 버튼 개수

  useEffect(() => {
    fetchNews(); // 컴포넌트가 마운트될 때 뉴스 데이터를 가져옵니다.
  }, []);

  const fetchNews = async () => {
    try {
      const response = await axios.get('/api/seoul/seoulNews/all');
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
      await axios.post('/api/seoul/seoulNews/updateAll');
      // 크롤링이 완료된 후 뉴스 리스트를 다시 가져옵니다.
      fetchNews();
    } catch (err) {
      setError(err);
    }
  };

  // 카테고리 변경 함수 (페이지를 1로 초기화)
  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setCurrentPage(1); // 카테고리 변경 시 첫 페이지로 이동
  };

  // 카테고리에 따라 뉴스 항목 필터링
  const filteredNewsList = selectedCategory === 'all' 
  ? newsList 
  : newsList.filter(news => news.seoulNewsGroup === selectedCategory);

  // 페이징 처리
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredNewsList.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(filteredNewsList.length / itemsPerPage);
  const currentPageGroup = Math.ceil(currentPage / pagesPerGroup);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handlePreviousGroup = () => {
    setCurrentPage((currentPageGroup - 1) * pagesPerGroup);
  };

  const handleNextGroup = () => {
    setCurrentPage(currentPageGroup * pagesPerGroup + 1);
  };

  const renderPageNumbers = () => {
    const startPage = (currentPageGroup - 1) * pagesPerGroup + 1;
    const endPage = Math.min(startPage + pagesPerGroup - 1, totalPages);

    const pageNumbers = [];
    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(
        <button
          key={i}
          onClick={() => handlePageChange(i)}
          disabled={i === currentPage}
        >
          {i}
        </button>
      );
    }
    return pageNumbers;
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className='seoul_container'>
      <h1>Seoul News</h1>
      <div className='seoul-tab-bar'>
        <div className='seoul-tab-bar'>
          <button className={`seoul_tab_btn ${selectedCategory === 'all' ? 'active' : ''}`}
           onClick={() => handleCategoryChange('all')}>전체</button>
          <button className={`seoul_tab_btn ${selectedCategory === 'env' ? 'active' : ''}`}
           onClick={() => handleCategoryChange('env')}>기후환경</button>
          <button className={`seoul_tab_btn ${selectedCategory === 'eco' ? 'active' : ''}`}
           onClick={() => handleCategoryChange('eco')}>친환경</button>
          <button className={`seoul_tab_btn ${selectedCategory === 'air' ? 'active' : ''}`}
           onClick={() => handleCategoryChange('air')}>공기</button>
          <button className={`seoul_tab_btn ${selectedCategory === 'green' ? 'active' : ''}`}
           onClick={() => handleCategoryChange('green')}>녹색에너지</button>
        </div>
      </div>
      
      <button onClick={handleCrawl}>Crawl News</button> {/* 크롤링 버튼 추가 */}

      <div className='seoul-search-line'>
        <ul>
          <li>게시글 : {filteredNewsList.length}, 페이지 : {currentPage} / {totalPages}</li>
        </ul>
      </div>
      <ul>
        {currentItems.map((news) => (
          <li key={news.title}>
            <p>{news.seoulNewsGroup}</p>
            <h2>{news.title}</h2>
            <p>{news.content}</p>
            <Link to={`/seoulNewsArticle/${news.seoulId}`}>Read more</Link>
            <p>{news.publishedDate}</p>
          </li>
        ))}
      </ul>

      <div className='pagination'>
        {currentPageGroup > 1 && (
          <button onClick={handlePreviousGroup}>이전</button>
        )}
        {renderPageNumbers()}
        {currentPageGroup < Math.ceil(totalPages / pagesPerGroup) && (
          <button onClick={handleNextGroup}>다음</button>
        )}
      </div>
    </div>
  );
};

export default SeoulNews;