import React, { useEffect, useState } from "react";
import axios from "axios";
import styled from "styled-components";

const NewsContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  font-family: 'Arial', sans-serif;
`;

const NewsHeader = styled.h1`
  color: #333;
  text-align: center;
  margin-bottom: 30px;
`;

const NewsListContainer = styled.ul`
  list-style-type: none;
  padding: 0;
`;

const NewsItem = styled.li`
  background-color: #f9f9f9;
  border-radius: 8px;
  margin-bottom: 15px;
  padding: 15px;
  transition: all 0.3s ease;

  &:hover {
    box-shadow: 0 5px 15px rgba(0,0,0,0.1);
    transform: translateY(-2px);
  }
`;

const NewsLink = styled.a`
  color: #2c3e50;
  text-decoration: none;
  font-weight: bold;

  &:hover {
    color: #3498db;
  }
`;

const NewsDescription = styled.p`
  color: #7f8c8d;
  margin-top: 10px;
  font-size: 0.9em;
`;

const NewsDate = styled.span`
  color: #95a5a6;
  font-size: 0.8em;
  display: block;
  margin-top: 5px;
`;

const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
`;

const PageButton = styled.button`
  margin: 0 5px;
  padding: 5px 10px;
  background-color: ${props => props.active ? '#3498db' : '#f1f1f1'};
  color: ${props => props.active ? 'white' : 'black'};
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #3498db;
    color: white;
  }
`;

const NewsList = () => {
  const [newsData, setNewsData] = useState([]);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const itemsPerPage = 5;

  const fetchNewsData = () => {
    axios
      .get("/api/naver/news")
      .then((response) => {
        setNewsData(response.data);
        setTotalPages(Math.ceil(response.data.length / itemsPerPage));
        setError(null);
      })
      .catch((error) => {
        setError("뉴스 데이터를 가져오는 데 실패했습니다.");
        console.error(error);
      });
  };

  useEffect(() => {
    fetchNewsData();

    const intervalId = setInterval(() => {
      fetchNewsData();
    }, 600000); // 10분마다 갱신

    return () => clearInterval(intervalId);
  }, []);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = newsData.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <NewsContainer>
      <NewsHeader>ECO NEWS</NewsHeader>
      {error && <p>{error}</p>}
      {newsData.length > 0 ? (
        <>
          <NewsListContainer>
            {currentItems.map((news, index) => (
              <NewsItem key={index}>
                <NewsLink href={news.link} target="_blank" rel="noopener noreferrer">
                  {news.title}
                </NewsLink>
                <NewsDescription>{news.description}</NewsDescription>
                <NewsDate>{new Date(news.pubDate).toLocaleString()}</NewsDate>
              </NewsItem>
            ))}
          </NewsListContainer>
          <PaginationContainer>
            {[...Array(totalPages).keys()].map(number => (
              <PageButton
                key={number + 1}
                onClick={() => paginate(number + 1)}
                active={currentPage === number + 1}
              >
                {number + 1}
              </PageButton>
            ))}
          </PaginationContainer>
        </>
      ) : (
        <p>뉴스 데이터를 불러오는 중...</p>
      )}
    </NewsContainer>
  );
};

export default NewsList;
