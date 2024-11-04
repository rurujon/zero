import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Pagination from "react-js-pagination";
import { Link } from "react-router-dom";

function ExList() {
    const [exchanges, setExchanges] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalItems, setTotalItems] = useState(0);
    const itemsPerPage = 15;

    const [searchKey, setSearchKey] = useState('title');
    const [searchValue, setSearchValue] = useState('');
    const [searchResults, setSearchResults] = useState([]);

    const fetchExchanges = async () => { 
        try {
            const response = await axios.get('/exchange/list', {
                params: {
                    page: 1,
                    size: 1000
                }
            }); 
            setExchanges(response.data.content);
            setSearchResults(response.data.content);
            setTotalItems(response.data.totalElements);
        } catch (error) {
            console.error('데이터를 찾을 수 없습니다.', error);
        }
    };

    useEffect(() => {
        fetchExchanges();
    }, []);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const handleSearch = () => {
        const filtered = exchanges.filter(board => {
            switch (searchKey) {
                case 'memId':
                    return board.memId.includes(searchValue);
                case 'title':
                    return board.title.includes(searchValue);
                default:
                    return true;
            }
        });

        setSearchResults(filtered);
        setTotalItems(filtered.length);
        setCurrentPage(1);
    };

    const getPaginatedResults = () => {
        if (!searchResults) {
            return [];
        }
        const startIndex = (currentPage - 1) * itemsPerPage;
        return searchResults.slice(startIndex, startIndex + itemsPerPage);
    };

    const getAuthLabel = (auth) => {
        return auth === 1 ? '승인완료' : '미승인';
    };

    return (
        <div>
            <h2>교환 게시판 리스트</h2>
            <p>
                <button type='button' onClick={() => window.location.href = '/exchange/created'}>
                    인증 글쓰기
                </button>
            </p>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
                <select value={searchKey} onChange={(e) => {
                    setSearchKey(e.target.value);
                    setSearchValue('');
                }} style={{ marginRight: '10px' }}>
                    <option value="memId">작성자</option>
                    <option value="title">제목</option>
                </select>
                <input
                    type="text"
                    placeholder="검색어 입력"
                    value={searchValue}
                    onChange={(e) => setSearchValue(e.target.value)}
                    style={{ marginRight: '10px', padding: '5px' }}
                />
                <button type="button" onClick={handleSearch}>
                    검색
                </button>
            </div>

            {/* 게시글 목록 */}
            <table className="table table-hover">
                <thead>
                    <tr>
                        <th className="col-1">번호</th>
                        <th className="col-2">인증 승인</th>
                        <th className="col-5">제목</th>
                        <th className="col-2">작성자</th>
                        <th className="col-2">등록일</th>
                    </tr>
                </thead>
                <tbody>
                    {getPaginatedResults().map((board, index) => (
                        <tr key={`${board.exchangeId}_${index}`}>
                            <td>{index + 1 + (currentPage - 1) * itemsPerPage}</td>
                            <td>{getAuthLabel(board.auth)}</td>

                            <td>
                                <Link to={`/exchange/article?id=${board.exchangeId}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                                    {board.title}
                                </Link>
                            </td>
                            <td>{board.memId}</td>
                            <td>{new Date(board.created).toLocaleDateString()}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* 페이지네이션 */}
            <Pagination
                activePage={currentPage}
                itemsCountPerPage={itemsPerPage}
                totalItemsCount={totalItems}
                pageRangeDisplayed={5}
                onChange={handlePageChange}
                itemClass="page-item"
                linkClass="page-link"
            />
        </div>
    );
}

export default ExList;
