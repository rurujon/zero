import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../login/context/AuthContext';
import './ImgArticle.css';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';

const ImgArticle = () => {
    const { token } = useContext(AuthContext);
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const imgPostId = queryParams.get('imgPostId');
    const navigate = useNavigate();

    const [article, setArticle] = useState(null);
    const [loading, setLoading] = useState(true);

    // token에서 memId와 role 가져오기
    const getTokenInfo = (token) => {
        if (token) { 
            const payloadBase64 = token.split('.')[1]; //토큰의 2번째 인덱스 가져옴
            const decodedPayload = JSON.parse(atob(payloadBase64));
            return {
                memId: decodedPayload.sub,
                role: decodedPayload.role
            };
        }
        return { memId: null, role: null };
    };

    const { memId, role } = getTokenInfo(token);

    useEffect(() => {
        if (!token) {
            alert('로그인 한 사용자만 게시글을 조회할 수 있습니다.');
            navigate('/login');
            return;
        }
    }, [token, navigate]);

    useEffect(() => {
        const fetchArticle = async () => {
            try {
                const response = await axios.get('/imgboard/article', {
                    params: { imgPostId },
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                setArticle(response.data);
                setLoading(false);
            } catch (error) {
                console.error('게시물을 가져오는 데 오류가 발생했습니다.', error);
                alert('게시물을 불러오는 중 오류가 발생했습니다.');
                setLoading(false);
            }
        };

        if (token) fetchArticle();
    }, [imgPostId, token, navigate]);

    const handleDelete = async () => {
        try {
            const response = await axios.delete('/imgboard/deleted', {
                params: { imgPostId },
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            alert(response.data);
            navigate('/imgboard/list');
        } catch (error) {
            if (error.response?.status === 401) {
                alert('로그인이 필요한 서비스입니다.');
                navigate('/login');
            } else {
                const errorMessage = error.response?.data || '알 수 없는 오류가 발생했습니다.';
                alert('게시물 삭제에 실패했습니다: ' + errorMessage);
            }
        }
    };
    
    if (!article || !article.imgPost) {
        return <p>게시물을 찾을 수 없습니다.</p>;
    }

    const point = article.imgPost.cate === 'tum' ?  10 
                :article.imgPost.cate === 'buy' ?  20
                :article.imgPost.cate === 'group' ? 30 : 0;

    const reason = article.imgPost.cate ==='tum' ? '텀블러 이용'
    :article.imgPost.cate === 'buy' ?  '물품 구매'
    :article.imgPost.cate === 'group' ?  '단체활동 참여'
    : '';
    
    //포인트 상승
    const uppoint = async () => {
        try {
            const response = await axios.post('http://localhost:8080/api/point/update', {
                memId: article.imgPost.memId,
                oper: '+',  // 또는 '-'
                updown: point, // 추가하거나 차감할 포인트 수
                reason:  reason// 변경 사유
            });
            alert('point: '+point)
            alert('reason: '+article?.imgPost?.cate)
            console.log('포인트 업데이트 성공:', response.data);

        } catch (error) {
            console.error('포인트 업데이트 실패:', error.response ? error.response.data : error.message);
        }
    };
    const handleAuth = async () => {
        try {
            const response = await axios.post('/imgboard/auth', null, {
                params: { imgPostId },
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            uppoint();
            alert(response.data);
            window.location.reload();
        } catch (error) {
            if (error.response?.status === 401) {
                alert('로그인이 필요한 서비스입니다.');
                navigate('/login');
            } else {
                const errorMessage = error.response?.data || '알 수 없는 오류가 발생했습니다.';
                alert('인증 승인에 실패했습니다: ' + errorMessage);
            }
        }
    };

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

    const getAuthLabel = (auth) => {
        switch (auth) {
            case 1:
                return '승인완료';
            case 0:
                return '미승인';
            default:
                return '알 수 없음';
        }
    };

    if (loading) {
        return <p>로딩 중...</p>;
    }

    if (!article) {
        return <p>게시물을 찾을 수 없습니다.</p>;
    }

    return (
        <div className="article-container">
            <h2 className="article-title">{article.imgPost.title}</h2>
            <div className="article-meta-container">
                <p className="article-meta"><strong>승인여부:</strong> {getAuthLabel(article.imgPost.auth)}
                
                {role === 'ROLE_ADMIN' && article?.imgPost.auth === 0 && (
                    <button type='button' onClick={handleAuth}>인증승인</button>
                )}
                
                </p>
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
                        <img key={img.imgId} src={`/images/imgboard/${img.saveFileName}`} alt='게시물 이미지' className="article-image" />
                    ))}
                </div>
            </div>
            <div className="button-container">
                {((memId === article?.imgPost.memId && article?.imgPost.auth === 0) || role === 'ROLE_ADMIN') && (
                    <>
                        <button className="action-button" onClick={() => navigate(`/imgboard/updated?imgPostId=${imgPostId}`)}>
                            수정하기
                        </button>
                        <button className="action-button" onClick={handleDelete}>삭제하기</button>
                    </>
                )}
             
                <button className="action-button" onClick={() => navigate('/imgboard/list')}>
                    목록가기
                </button>
            </div>
        </div>
    );
};

export default ImgArticle;
