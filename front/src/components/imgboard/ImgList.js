import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import Pagination from "react-js-pagination";
import '../board/page.css';
import { AuthContext } from '../login/context/AuthContext';

function ImgList() {

    const { token } = useContext(AuthContext);
    const [imgPosts, setImgPosts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalItems, setTotalItems] = useState(0); // 총 게시물 수
    const itemsPerPage = 8; // 한 페이지당 보여줄 게시물 수

    const [searchKey, setSearchKey] = useState('title'); // 기본 검색 항목
    const [searchValue, setSearchValue] = useState('');
    const [searchResults, setSearchResults] = useState([]); //검색결과

    // 전체 이미지 게시물을 가져오는 함수
    const fetchImgPosts = async () => { 

        try {
            const config = {
                params: { page: 1, size: 1000 },
                headers: token ? { 'Authorization': `Bearer ${token}` } : {}
            };
            
            const response = await axios.get('/imgboard/list', config);
            setImgPosts(response.data.content);
            setSearchResults(response.data.content); // 초기 검색 결과는 전체 게시물
            setTotalItems(response.data.totalElements);
        } catch (error) {
            console.error('이미지를 찾을 수 없습니다.', error);
    
        }
    };

    useEffect(() => {
        fetchImgPosts(); // 컴포넌트가 마운트될 때 모든 데이터 로드
    }, []);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    // 검색
    const handleSearch = () => {
        const filtered = imgPosts.filter(board => {
            switch (searchKey) {
                case 'cate': 
                    return searchValue === "" ? true : board.imgPost.cate === searchValue;  
                    case 'memId':
                    return board.imgPost.memId.includes(searchValue);
                case 'title':
                    return board.imgPost.title.includes(searchValue);
                default:
                    return true;
            }
        });

        setSearchResults(filtered); // 검색 결과
        setTotalItems(filtered.length); // 검색된 결과 수로 업데이트
        setCurrentPage(1); // 검색 후 첫 페이지로 초기화
    };

    // 페이지네이션에 맞게 현재 페이지의 데이터만 추출
    const getPaginatedResults = () => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        return searchResults.slice(startIndex, startIndex + itemsPerPage);
    };

    const getCateLabel = (cate) => {
        switch (cate) {
            case 'tum':
                return '텀블러 이용';
            case 'buy':
                return '물품 구매';
            case 'group':
                return '단체활동 참여';
            default:
                return '알 수 없음';
        }
    };

    const getAuthLabel = (auth) => {
        switch (auth) {
            case 1:
                return '승인완료';
            case 0:
                return '미승인';
            default:
                return '알 수 없음';
        }
    };

    return (
        <div>
            <h2>인증게시판 리스트</h2>
            <p>
                <button type='button' onClick={() => window.location.href = '/imgboard/created'}>
                    인증 글쓰기
                </button>
            </p>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
                <select value={searchKey} onChange={(e) => {
                    setSearchKey(e.target.value);
                    setSearchValue(''); // 검색값 초기화
                }} style={{ marginRight: '10px' }}>
                    <option value="cate">인증유형</option>
                    <option value="memId">작성자</option>
                    <option value="title">제목</option>
                </select>
                {searchKey === 'cate' && (
                    <select onChange={(e) => setSearchValue(e.target.value)} style={{ marginRight: '10px' }}>
                        <option value="">인증유형 선택</option>
                        <option value='tum'>텀블러 이용</option>
                        <option value='buy'>물품 구매</option>
                        <option value='group'>단체활동 참여</option>
                    </select>
                )}
                {searchKey !== 'cate' && (
                    <input
                        type="text"
                        placeholder="검색어 입력"
                        value={searchValue}
                        onChange={(e) => setSearchValue(e.target.value)}
                        style={{ marginRight: '10px', padding: '5px' }}
                    />
                )}
                <button type="button" onClick={handleSearch}>
                    검색
                </button>
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', padding: 0 }}>
                {getPaginatedResults().map((board, index) => (
                    <div key={`${board.imgPost.imgPostId}_${index}`} style={{ 
                        border: '2px solid red', 
                        margin: '15px',
                        padding: '10px', 
                        borderRadius: '5px', 
                        backgroundColor: '#f0f0f0', 
                        width: '22%'
                    }}>
                        <div style={{ 
                            width: '200px', 
                            height: '150px', 
                            overflow: 'hidden',
                            borderRadius: '5px',
                            display: 'flex', 
                            alignItems: 'center', 
                            justifyContent: 'center' 
                        }}>
                            {board.images && board.images.length > 0 ? (
                                board.images.map((img) => (
                                    <img
                                        key={img.imgId}
                                        src={`/images/imgboard/${img.saveFileName}`}
                                        alt={img.saveFileName}
                                        style={{ 
                                            width: '100%',           
                                            height: '100%',          
                                            maxHeight: '200px',    
                                            margin: '5px',
                                            display: 'block',
                                            objectFit: 'cover',      
                                            verticalAlign: 'top'
                                        }}
                                    />
                                ))
                            ) : (
                                <p>등록된 이미지가 없습니다.</p>
                            )}
                        </div>
                        <div style={{ 
                            border: '2px solid red', 
                            backgroundColor: board.imgPost.auth === 0 ? '#D5D5D5' : '#47C83E', 
                            padding: '5px', 
                            textAlign: 'left', 
                            marginTop: '1px',
                            width: '50%'
                        }}>
                            <p style={{ 
                                color: '#fff',
                                margin: 0
                            }}>
                                인증 승인: {getAuthLabel(board.imgPost.auth)}
                            </p>
                        </div>
                        <p>인증유형: {getCateLabel(board.imgPost.cate)}</p>
                        <p>작성자: {board.imgPost.memId}</p>
                        <p>
                            제목: 
                            <a href={`/imgboard/article?imgPostId=${board.imgPost.imgPostId}`}>
                                {board.imgPost.title}
                            </a>
                        </p>
                        <p>작성일: {new Date(board.imgPost.created).toLocaleDateString()}</p>
                    </div>
                ))}
            </div>
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

export default ImgList;
