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
            <h2>Image Posts</h2>
            <ul>
                {imgPosts.map((board, index) => (  
                    <li key={`${board.imgPost.imgPostId}_${index}`}>  {/* ImgPost의 ID 사용 */}
                        <h3>{board.imgPost.imgPostId}</h3>
                        <p>승인여부: {board.imgPost.auth}</p>
                        <p>목록: {board.imgPost.cate}</p>

                        {/* 이미지 목록 출력 */}
                        {board.images && board.images.length > 0 ? (
                            <div>
                                {board.images.map((img, imgIndex) => (
                                    <img
                                        key={img.imgId}  // 각 이미지의 ID를 키로 사용
                                        src={`/images/${img.saveFileName}`} 
                                        alt={img.saveFileName}
                                        style={{ width: '100px', height: '100px', margin: '5px' }}
                                    />
                                ))}
                            </div>
                        ) : (
                            <p>등록된 이미지가 없습니다.</p> // 이미지가 없을 경우 메시지 표시
                        )}

                        <p>제목: {board.imgPost.title}</p>
                        <p>작성일: {board.imgPost.created}</p>
                    </li>
                ))}
            </ul>

            <h2>여기용</h2>
            <img src={'http://localhost:8080/images/0_6847493b-c09e-4493-bcd8-9bf470b3d52a_00.png'} />
        </div>
    );
}

export default ImgList;
