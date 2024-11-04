import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './RssData.css'

function RssData() {
    const [rssItems, setRssItems] = useState([]);

    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(10); // 페이지당 항목 수

    const pagesPerGroup = 5; // 한 번에 표시할 페이지 버튼 개수

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

    // 현재 페이지에 해당하는 항목들만 가져옴
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = rssItems.slice(indexOfFirstItem, indexOfLastItem);

    // 전체 페이지 수 계산
    const totalPages = Math.ceil(rssItems.length / itemsPerPage);

    // 현재 페이지 그룹의 시작 및 끝 페이지 계산
    const currentGroup = Math.ceil(currentPage / pagesPerGroup);
    const groupStart = (currentGroup - 1) * pagesPerGroup + 1;
    const groupEnd = Math.min(groupStart + pagesPerGroup - 1, totalPages);

    // 페이지 변경 핸들러
    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    // 페이징 버튼 렌더링
    const renderPageNumbers = () => {
        const pageNumbers = [];
        for (let i = groupStart; i <= groupEnd; i++) {
            pageNumbers.push(
                <button 
                    className='rss-PageButton'
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
    

    return (
        <div className='RSS-container'>
            <div className='RSS-main-title'>
                <h1>RSS Feed</h1>
                <button onClick={handleUpdate}>Update RSS Data</button> {/* 업데이트 버튼 */}
            </div>

            <div>
                <ul>
                    <li>게시글 : {rssItems.length}, 페이지 : {currentPage} / {totalPages}</li>
                </ul>
            </div>
            <div className='rss-NewsListContainer'>
                <ul>
                    {currentItems.map((item, index) => (
                        <li className='rss-NewsItem' key={index}>
                            <div className={`rss-NewsGroup`}>
                                <p>환경부</p>
                            </div>
                            <Link to={`/minEnv/${item.rssId}`}><h3 className='rss-NewsLink'>{item.title}</h3></Link>
                            <Link to={`/minEnv/${item.rssId}`}><p className='rss-NewsDescription'>{item.description}</p></Link>
                            <span className='rss-NewsDate'>등록일 : {item.pubDate}</span>
                        </li>
                    ))}
                </ul>
            </div>

            {/* 페이징 버튼 */}
            <div className='rss-PaginationContainer'>
                {groupStart > 1 && (
                    <button className='rss-PaginationButton' onClick={() => handlePageChange(groupStart - 1)}>이전</button>
                )}
                {renderPageNumbers()}
                {groupEnd < totalPages && (
                    <button className='rss-PaginationButton' onClick={() => handlePageChange(groupEnd + 1)}>다음</button>
                )}
            </div>
        </div>
    );
}

export default RssData;