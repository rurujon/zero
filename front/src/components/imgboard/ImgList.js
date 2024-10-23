import React, { useEffect, useState } from 'react';
import axios from 'axios';

function ImgList() {
    const [imgPosts, setImgPosts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const itemsPerPage = 8; // 페이지당 보여줄 항목 수

    useEffect(() => {
        fetchImgPosts(currentPage);
    }, [currentPage]);

    const fetchImgPosts = (page) => {
        const start = (page - 1) * itemsPerPage + 1;
        const end = start + itemsPerPage - 1;

        axios.get(`/imgboard/list.action?start=${start}&end=${end}`)
            .then(response => {
                setImgPosts(response.data.imgPosts); // 서버에서 imgPosts 배열을 받는다고 가정
                setTotalPages(Math.ceil(response.data.totalCount / itemsPerPage)); // 전체 개수로 페이지 수 계산
            })
            .catch(error => {
                console.error('이미지를 찾을 수 없습니다.', error);
            });
    };

    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
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
                        <p>제목: <a href='/imgboard/article.action'>{board.imgPost.title}</a></p>
                        <p>작성일: {new Date(board.imgPost.created).toLocaleDateString()}</p>
                    </div>
                ))}
            </div>
            {/* 페이지네이션 UI */}
            <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
                {currentPage > 1 && (
                    <button onClick={() => paginate(currentPage - 1)}>
                        이전
                    </button>
                )}
                {[...Array(totalPages)].map((_, i) => (
                    <button
                        key={i + 1}
                        onClick={() => paginate(i + 1)}
                        style={{
                            backgroundColor: currentPage === i + 1 ? '#3498db' : '#f1f1f1',
                            color: currentPage === i + 1 ? 'white' : 'black',
                            margin: '0 5px',
                            padding: '5px 10px',
                            borderRadius: '5px',
                            border: 'none'
                        }}
                    >
                        {i + 1}
                    </button>
                ))}
                {currentPage < totalPages && (
                    <button onClick={() => paginate(currentPage + 1)}>
                        다음
                    </button>
                )}
            </div>
        </div>
    );
}

export default ImgList;
