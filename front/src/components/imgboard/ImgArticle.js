import React, { useEffect, useState } from 'react';
import './ImgArticle.css';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom'; 


const ImgArticle = () => {
    const [memId, setMemId] = useState(localStorage.getItem('memId'));
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const imgPostId = queryParams.get('imgPostId'); // 쿼리 파라미터에서 imgPostId 가져오기

    const [article, setArticle] = useState(null);
    const[auth,setAuth] = useState(0);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        //alert 두번 뜸 (-)
        // 해당 아이디만 조회?(-)
        if (!memId) {
                     
            alert("로그인 한 사용자만 게시글을 조회할 수 있습니다 !");       
            navigate("/login");
        }            
    
    }, [memId, navigate]);

    useEffect(() => {
        const fetchArticle = async () => {
            try {
                const response = await axios.get('/imgboard/article', {
                    params: { imgPostId }
                });
                setArticle(response.data);
                setLoading(false);

            } catch (error) {
                console.error('게시물을 가져오는 데 오류가 발생했습니다.', error);
                setLoading(false);
            }
        };

        fetchArticle(); // API 호출
    }, [imgPostId]);

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

    const handleDelete = async () => {
        try {
            const response = await axios.delete(`/imgboard/deleted`, {
                params: { imgPostId }
            });
            alert(response.data); // 서버에서 반환한 메시지 표시
            navigate('/imgboard/list'); // 삭제 후 목록으로 리다이렉트

        } catch (error) {
            console.error('게시물을 삭제하는 데 오류가 발생했습니다.', error);

            const errorMessage = error.response && error.response.data 
                ? error.response.data 
                : '알 수 없는 오류가 발생했습니다.';
    
            alert('게시물 삭제에 실패했습니다: ' + errorMessage);
        }
    };
    

    const handleAuth =()=>{

        setAuth(1);

        try{ //Controller에 postMapping추가 (-)
            const response =  axios.post(`/imgboard/auth`, {
                params: { imgPostId , auth}
            });

            alert(response.data);

        }catch(error){
            console.error('인증승인시 오류가 발생했습니다.', error);
            const errorMessage = error.response && error.response.data 
            ? error.response.data 
            : '알 수 없는 오류가 발생했습니다.';

            alert('인증승인에 실패했습니다: ' + errorMessage);

        }







    }





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
                {(memId === "suzi123")&&(
                    <>
                    <button type='button' onClick={handleAuth}>인증승인</button>
                    </>
                )}
                <hr className="divider" />
                <p className="article-meta"><strong>사용자 ID:</strong> {article.imgPost.memId}</p>
                <hr className="divider" />
                <p className="article-meta"><strong>인증 유형:</strong> {getCateLabel(article.imgPost.cate)}</p>
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
            {(memId === article.imgPost.memId || memId === "suzi123")  && ( 
                    //본인의 게시물에만 수정, 삭제버튼 나옴
                    <>
                        <button className="action-button" onClick={() => window.location.href = `/imgboard/updated?imgPostId=${imgPostId}`}>
                            수정하기
                        </button>
                        <button className="action-button" onClick={handleDelete}>
                            삭제하기
                        </button>
                    </>
                )}
                <button className="action-button" onClick={() => window.location.href = '/imgboard/list'}>
                    목록가기
                </button>
            </div>
        </div>
    );
};

export default ImgArticle;