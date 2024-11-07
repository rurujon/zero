// src/components/NewsList.js
import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useLocation } from 'react-router-dom';
import './SeoulNews.css';
import { AuthContext } from '../login/context/AuthContext';

const SeoulNews = () => {
  const [newsList, setNewsList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { role } = useContext(AuthContext);

  const [itemsPerPage] = useState(10); // 페이지당 항목 수
  const [isActive, setIsActive] = useState(false);

  const pagesPerGroup = 10; // 한 번에 표시할 페이지 버튼 개수

  const location = useLocation();
  const { previousPage, previousCategory } = location.state || {};

  const [selectedCategory, setSelectedCategory] = useState(previousCategory || 'all');
  const [currentPage, setCurrentPage] = useState(previousPage || 1);

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

  const getGroupDetails = (group) => {
    switch (group) {
      case 'env':
        return { text: '기후환경', className: 'env' };
      case 'eco':
        return { text: '친환경', className: 'eco' };
      case 'air':
        return { text: '공기', className: 'air' };
      case 'green':
        return { text: '녹색에너지', className: 'green' };
      default:
        return { text: '기타', className: 'default' }; // 기본 값
    }
  };

  const renderPageNumbers = () => {
    const startPage = (currentPageGroup - 1) * pagesPerGroup + 1;
    const endPage = Math.min(startPage + pagesPerGroup - 1, totalPages);

    const pageNumbers = [];
    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(
        <button 
          className={`PageButton ${currentPage === i ? 'active' : ''}`}
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
          <button className={`seoul_tab_btn ${selectedCategory === 'env' ? 'active-env' : ''}`}
           onClick={() => handleCategoryChange('env')}>기후환경</button>
          <button className={`seoul_tab_btn ${selectedCategory === 'eco' ? 'active-eco' : ''}`}
           onClick={() => handleCategoryChange('eco')}>친환경</button>
          <button className={`seoul_tab_btn ${selectedCategory === 'air' ? 'active-air' : ''}`}
           onClick={() => handleCategoryChange('air')}>공기</button>
          <button className={`seoul_tab_btn ${selectedCategory === 'green' ? 'active-green' : ''}`}
           onClick={() => handleCategoryChange('green')}>녹색에너지</button>
        </div>
      </div>
      {role === 'ADMIN' && (
                        <button onClick={handleCrawl}>Crawl News</button>
                    )}
      <div className='seoul-search-line'>
        <ul>
          <li>게시글 : {filteredNewsList.length}, 페이지 : {currentPage} / {totalPages}</li>
        </ul>
      </div>
      <ul className='NewsListContainer'>
        {currentItems.map((news) => {
          const { text, className } = getGroupDetails(news.seoulNewsGroup);

          return (
            <li className='NewsItem' key={news.title}>
              <div className={`NewsGroup ${className}`}>
                <p>{text}</p>
              </div>
              <Link 
                to={`/seoulNewsArticle/${news.seoulId}`} 
                state={{ previousPage: currentPage, previousCategory : selectedCategory }}
              >
                <h2 className='NewsLink'>{news.title}</h2>
              </Link>
              <Link 
                to={`/seoulNewsArticle/${news.seoulId}`} 
                state={{ previousPage: currentPage, previousCategory : selectedCategory }}
              >
                <p className='NewsDescription'>{news.content}</p>
              </Link>
              <p className='NewsDate'>{news.publishedDate}</p>
            </li>
          );
        })}
      </ul>

      <div className='PaginationContainer'>
        {currentPageGroup > 1 && (
          <button className='PaginationButton' onClick={handlePreviousGroup}>이전</button>
        )}
        {renderPageNumbers()}
        {currentPageGroup < Math.ceil(totalPages / pagesPerGroup) && (
          <button className='PaginationButton' onClick={handleNextGroup}>다음</button>
        )}
      </div>
    </div>
  );
};

export default SeoulNews;