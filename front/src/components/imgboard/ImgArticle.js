import React, { useEffect, useState } from 'react';
import './ImgArticle.css';
import axios from 'axios';
import { useParams } from 'react-router-dom'; 
import './ImgArticle.css';


const ImgArticle = () => {

    const { imgPostId } = useParams(); // URL에서 imgPostId를 가져옵니다.
    const [article, setArticle] = useState(null); // 게시물 데이터
    const [loading, setLoading] = useState(true); // 로딩 상태


    useEffect(() => {
        const fetchArticle = async () => {
            try {
                const response = await axios.get(`/imgboard/article/${imgPostId}`);
                setArticle(response.data); // 응답 데이터 저장
                setLoading(false); // 로딩 완료
            } catch (error) {
                console.error('게시물을 가져오는 데 오류가 발생했습니다.', error);
                setLoading(false); // 로딩 완료
            }
        };

        fetchArticle(); // API 호출
    }, [imgPostId]); // imgPostId가 변경될 때마다 호출

    if (loading) {
        return <p>로딩 중...</p>; // 로딩 중일 때 표시
    }

    if (!article) {
        return <p>게시물을 찾을 수 없습니다.</p>; // 게시물이 없을 때 표시
    }




    return (
        <div className="article-container">
            <h2 className="article-title">{article.imgPost.title}</h2>
            <div className="article-meta-container">
                <p className="article-meta"><strong>승인여부:</strong> {article.imgPost.auth}</p>
                <hr className="divider" />
                <p className="article-meta"><strong>사용자 ID:</strong> {article.imgPost.memId}</p>
                <hr className="divider" />
                <p className="article-meta"><strong>인증 유형:</strong> {article.imgPost.cate}</p>
                <hr className="divider" />
                <p className="article-meta"><strong>작성일:</strong> {new Date(article.imgPost.created).toLocaleDateString()}</p>
            </div>
            <div className="article-content">
                <p>{article.imgPost.content}</p>
                <div className="image-gallery">
                    {article.images && article.images.map(img => (
                        <img key={img.imgId} src={`/images/${img.saveFileName}`} alt='게시물 이미지' className="article-image" />
                    ))}
                </div>
            </div>
            <div className="button-container">
                <button className="action-button" onClick={() => window.location.href = `/imgboard/updated/${imgPostId}`}>
                    수정하기
                </button>
                <button className="action-button" onClick={() => window.location.href = '/imgboard/list'}>
                목록가기
                </button>
            </div>
        </div>
    );
};

export default ImgArticle;