import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ImgList = () => {
    const [imgPosts, setImgPosts] = useState([]);
    const [pageResponse, setPageResponse] = useState({ currentPage: 1, totalPage: 1 });

    const fetchData = async (pageNum = 1) => {
        try {
            const response = await axios.get(`/api/list?pageNum=${pageNum}`);
            setImgPosts(response.data.content);
            setPageResponse({
                currentPage: response.data.currentPage,
                totalPage: response.data.totalPage,
            });
        } catch (error) {
            console.error("Error fetching data: ", error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handlePageChange = (pageNum) => {
        fetchData(pageNum);
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
                {imgPosts.length > 0 ? imgPosts.map((board) => (
                    <div key={board.imgPost.imgPostId} style={{
                        border: '2px solid red',
                        margin: '15px',
                        padding: '10px',
                        borderRadius: '5px',
                        backgroundColor: '#f0f0f0',
                        width: '22%'
                    }}>
                        <div style={{ display: 'flex', flexWrap: 'wrap', fontSize: 0 }}>
                            {board.images.length > 0 ? (
                                <img
                                    src={`/images/${board.images[0].saveFileName}`} // 썸네일 이미지
                                    alt="Thumbnail"
                                    style={{
                                        width: '100%',
                                        maxWidth: '350px',
                                        height: 'auto',
                                        margin: '5px',
                                        display: 'block',
                                        verticalAlign: 'top'
                                    }}
                                />
                            ) : (
                                <p>등록된 이미지가 없습니다.</p>
                            )}
                        </div>
                        <p>목록: {board.imgPost.cate}</p>
                        <p>작성자: {board.imgPost.memId}</p>
                        <p>제목: <a href={`/imgboard/article.action?postId=${board.imgPost.imgPostId}`}>{board.imgPost.title}</a></p>
                        <p>작성일: {new Date(board.imgPost.created).toLocaleDateString()}</p>
                    </div>
                )) : (
                    <p>게시물이 없습니다.</p>
                )}
            </div>
            {/* 페이징 처리 */}
            <Pagination pageResponse={pageResponse} onPageChange={handlePageChange} />
        </div>
    );
};

const Pagination = ({ pageResponse, onPageChange }) => {
    const { currentPage, totalPage } = pageResponse;

    return (
        <div>
            <button disabled={currentPage === 1} onClick={() => onPageChange(currentPage - 1)}>이전</button>
            {Array.from({ length: totalPage }, (_, index) => (
                <button key={index + 1} onClick={() => onPageChange(index + 1)}>{index + 1}</button>
            ))}
            <button disabled={currentPage === totalPage} onClick={() => onPageChange(currentPage + 1)}>다음</button>
        </div>
    );
};

export default ImgList;
