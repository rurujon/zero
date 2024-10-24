import React, { useEffect, useState } from 'react';
import axios from 'axios';

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
