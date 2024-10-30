import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Pagination from "react-js-pagination";
import '../board/page.css';

function ImgList() {
    const [imgPosts, setImgPosts] = useState([]);

    useEffect(() => {
        axios.get('/imgboard/list')
            .then(response => {
                setImgPosts(response.data);
                console.log(response.data);
            })
            .catch(error => {
                console.error('이미지를 찾을 수 없습니다.', error);
            });
    }, []);
   
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

    return (
        <div>
            <h2>인증게시판 리스트</h2>
            <p>
                <button type='button' onClick={() => window.location.href = '/imgboard/created'}>
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
                      
                        <div style={{ 
                            width: '200px', 
                            height: '150px', 
                            overflow: 'hidden',         // 이미지를 영역에 맞게 자르기 위해 사용
                            borderRadius: '5px',        // 모서리를 부드럽게 하기 위해 추가 (옵션)
                            display: 'flex', 
                            alignItems: 'center', 
                            justifyContent: 'center' 
                        }}>
                            {board.images && board.images.length > 0 ? (
                                board.images.map((img) => (
                                    <img
                                    key={img.imgId}
                                    src={`/images/${img.saveFileName}`}
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
                    
                        <div style={{ border: '2px solid red', backgroundColor: 'gray', padding: '5px', textAlign: 'center', marginTop: '1px' }}>
                            <p style={{ color: '#fff' }}>인증 승인: {board.imgPost.auth}</p>
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
        </div>
    );
}

export default ImgList;
