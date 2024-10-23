
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Pagination from './Pagination'; 

function ImgList() {
    const [imgPosts, setImgPosts] = useState([]);
    const [pageResponse, setPageResponse] = useState({
        pageNumList: [], // 페이지 번호 리스트
        prev: false, // 이전 버튼 
        next: false, // 다음 버튼 
        prevPage: 0, // 이전 버튼 클릭 시 이동할 페이지 번호
        nextPage: 0, // 다음 버튼 클릭 시 이동할 페이지 번호
        current: 1, // 현재 페이지
        totalPage: 0 // 총 페이지 수
    });

    const fetchImgPosts = (page = 1) => {
        axios.get(`/imgboard/list?page=${page}`)
            .then(response => {
                setImgPosts(response.data.imgPosts);
                setPageResponse({
                    pageNumList: response.data.pageNumList,
                    prev: response.data.prev,
                    next: response.data.next,
                    prevPage: response.data.prevPage,
                    nextPage: response.data.nextPage,
                    current: response.data.current,
                    totalPage: response.data.totalPage
                });
            })
            .catch(error => {
                console.error('이미지를 찾을 수 없습니다.', error);
            });
    };

    useEffect(() => {
        fetchImgPosts(); // 첫 페이지를 로드합니다.
    }, []);

    const handlePageChange = (page) => {
        fetchImgPosts(page);
    };

    return (
        <div>
            <h2>인증게시판 리스트</h2>
            <p>
                <button type='button' onClick={() => window.location.href = '/imgboard/created.action'}>
                    인증 글쓰기
                </button>
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', padding: 0 }}>
                {imgPosts.map((board, index) => (
                    <div key={`${board.imgPost.imgPostId}_${index}`} style={{ 
                        border: '2px solid red', 
                        margin: '15px', 
                        padding: '10px', 
                        borderRadius: '5px', 
                        backgroundColor: '#f0f0f0', 
                        width: '22%' 
                    }}>
                        {/* 이미지 목록 출력 */}
                        <div style={{ display: 'flex', flexWrap: 'wrap', fontSize: 0 }}>
                            {board.images && board.images.length > 0 ? (
                                board.images.map((img) => (
                                    <img
                                        key={img.imgId}
                                        src={`/images/${img.saveFileName}`}
                                        alt={img.saveFileName}
                                        style={{ 
                                            width: '100%', 
                                            maxWidth: '350px', 
                                            height: 'auto', 
                                            margin: '5px', 
                                            display: 'block', 
                                            verticalAlign: 'top' 
                                        }}
                                    />
                                ))
                            ) : (
                                <p>등록된 이미지가 없습니다.</p>
                            )}
                        </div>
    
                        <div style={{ border: '2px solid red', backgroundColor: 'gray', padding: '5px', textAlign: 'center', marginTop: '10px' }}>
                            <p style={{ color: '#fff' }}>승인여부: {board.imgPost.auth}</p>
                        </div>
                        <p>목록: {board.imgPost.cate}</p>
                        <p>작성자: {board.imgPost.memId}</p>
                        <p>제목: <a href='/imgboard/article.action'>{board.imgPost.title}</a> </p>
                        <p>작성일: {new Date(board.imgPost.created).toLocaleDateString()}</p>
                    </div>
                ))}
            </div>
            
            {/* Pagination 컴포넌트를 렌더링하고, 페이지 변경 핸들러를 전달합니다. */}
            <Pagination pageResponse={pageResponse} onPageChange={handlePageChange} />
        </div>
    );
}

export default ImgList;
