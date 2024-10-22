import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';


const ImgArticle = () => {
    const {imgPostId} = useParams(); // URL에서 imgPostId를 추출
    const [imgPost, setImgPost] = useState(null);

    useEffect(() => {
        axios.get(`/imgboard/article/${imgPostId}`)
            .then(response => {
                setImgPost(response.data);
                console.log(response.data);
            })
            .catch(error => {
                console.error('게시물을 찾을 수 없습니다.', error);
            });
    }, [imgPostId]);

    if (!imgPost) return <div>로딩 중...</div>;


    return (
        <div>
            <h2>{imgPost.title}</h2>
            <p>작성자: {imgPost.memId}</p>
            <p>작성일: {new Date(imgPost.created).toLocaleDateString()}</p>
            <div style={{ display: 'flex', flexWrap: 'wrap', padding: 0 }}>
                {imgPost.images && imgPost.images.length > 0 ? (
                    imgPost.images.map((img) => (
                        <img
                            key={img.imgId}
                            src={`/images/${img.saveFileName}`}
                            alt={img.saveFileName}
                            style={{ width: '350px', height: '200px', margin: '5px' }}
                        />
                    ))
                ) : (
                    <p>등록된 이미지가 없습니다.</p>
                )}
            </div>
            <div style={{ border: '1px solid #ccc', padding: '10px', marginTop: '10px' }}>
                <h3>내용</h3>
                <p>{imgPost.content}</p>
            </div>
        </div>
    );
}


export default ImgArticle;