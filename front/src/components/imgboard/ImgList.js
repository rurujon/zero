import React, { useEffect, useState } from 'react';
import axios from 'axios';

function ImgList() {
    const [imgPosts, setImgPosts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1); // 현재 페이지 상태
    const [totalPages, setTotalPages] = useState(0); // 총 페이지 수
    const [totalCount, setTotalCount] = useState(0); //총 데이터 수

    const postsPerPage = 12; // 한 페이지당 게시물 수

    useEffect(() => {
        fetchImgPosts(currentPage);
    }, [currentPage]);

    const fetchImgPosts = (pageNum) => {
        axios.get(`/imgboard/list.action?pageNum=${pageNum}&size=${postsPerPage}`)
            .then(response => {
                setImgPosts(response.data.content); // 실제 게시물 데이터 (페이지네이션에 따라)
                setTotalPages(response.data.totalPages); // 총 페이지 수
                console.log(response.data);
            })
            .catch(error => {
                console.error('이미지를 찾을 수 없습니다.', error);
            });
    };

    const handlePageChange = (pageNum) => {
        setCurrentPage(pageNum);
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
                                            width: '350px', 
                                            height: '200px', 
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

            {/* 페이징 처리 */}
            <div style={{ marginTop: '20px', textAlign: 'center' }}>
                <button 
                    onClick={() => handlePageChange(currentPage - 1)} 
                    disabled={currentPage === 1}
                >
                    ◀ 이전
                </button>

                {Array.from({ length: totalPages }, (_, index) => (
                    <button 
                        key={index + 1} 
                        onClick={() => handlePageChange(index + 1)} 
                        style={{ margin: '0 5px', fontWeight: currentPage === index + 1 ? 'bold' : 'normal' }}
                    >
                        {index + 1}
                    </button>
                ))}

                <button 
                    onClick={() => handlePageChange(currentPage + 1)} 
                    disabled={currentPage === totalPages}
                >
                    다음 ▶
                </button>
            </div>
        </div>
    );
}

export default ImgList;
