import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom'; 
import { AuthContext } from '../login/context/AuthContext';

const ExArticle = () => {
    const { token } = useContext(AuthContext);

    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const exchangeId = queryParams.get('exchangeId');

    const [article, setArticle] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();   


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
            alert('로그인한 사용자만 게시글을 조회 할 수 있습니다.');
            navigate('/login');
            return;
        }

        const fetchArticle = async () => {
            try {
                const response = await axios.get('/exchange/article', {
                    params: { exchangeId }
                });
                setArticle(response.data);
                
                // 권한 체크
                const { memId, role } = getTokenInfo(token);
                if (role !== 'ADMIN' && response.data.memId !== memId) {
                    alert('본인이 작성한 게시물만 조회할 수 있습니다');
                    navigate('/exchange/list');
                    return;
                }
                
                setLoading(false);
            } catch (error) {
                console.error('게시물을 가져오는 데 오류가 발생했습니다.', error);
                setLoading(false);
                navigate('/exchange/list');
            }
        };

        fetchArticle();
    }, [token, exchangeId, navigate]);



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

    const handleDelete = async () => {
        try {
            const response = await axios.delete(`/exchange/deleted`, {
                params: { exchangeId }
            });
            alert(response.data);
            navigate('/exchange/list');
        } catch (error) {
            console.error('게시물을 삭제하는 데 오류가 발생했습니다.', error);
            const errorMessage = error.response && error.response.data 
                ? error.response.data 
                : '알 수 없는 오류가 발생했습니다.';
            alert('게시물 삭제에 실패했습니다: ' + errorMessage);
        }
    };


                   
 /*  ##### 인증 승인 auth 부분  */
    const handleAuth = async () => {
        try {
            const response = await axios.post(`/exchange/auth`, null, {
                params: { exchangeId }
            });
            alert(response.data);
            
            // 게시글 데이터 다시 불러오기
            const updatedArticle = await axios.get('/exchange/article', {
                params: { exchangeId }
            });
            setArticle(updatedArticle.data);
            
        } catch (error) {
            console.error('인증 승인 시 오류가 발생했습니다.', error);
            const errorMessage = error.response && error.response.data 
                ? error.response.data 
                : '알 수 없는 오류가 발생했습니다.';
            alert('인증 승인에 실패했습니다: ' + errorMessage);
        }
    };
    
    if (loading) {
        return <p>로딩 중...</p>;
    }

    if (!article) {
        return <p>게시물을 찾을 수 없습니다.</p>; 
    }

    return (
        <div className="article-container" style={{ padding: '20px', backgroundColor: '#f9f9f9', borderRadius: '8px', width: '800px', margin: 'auto' }}>
            <h2 className="article-title" style={{ textAlign: 'center' }}>{article.title}</h2>
            
            <div className="article-meta-container">
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '15px' }}>
                    <label style={{ flex: '0 0 150px', backgroundColor: '#cce5ff', padding: '10px' }}>승인여부:</label>
                    <span style={{ flex: '1', padding: '8px' }}>{getAuthLabel(article.auth)}</span>
                    {role === 'ADMIN' && article.auth === 0 && (
                        <button type='button' onClick={handleAuth}>인증승인</button>
                    )}
                </div>

                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '15px' }}>
                    <label style={{ flex: '0 0 150px', backgroundColor: '#cce5ff', padding: '10px' }}>작성일:</label>
                    <span style={{ flex: '1', padding: '8px' }}>{new Date(article.created).toLocaleDateString()}</span>
                </div>
                
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '15px' }}>
                    <label style={{ flex: '0 0 150px', backgroundColor: '#cce5ff', padding: '10px' }}>사용자 ID:</label>
                    <span style={{ flex: '1', padding: '8px' }}>{article.memId}</span>
                </div>

                {/* 배송정보와 이미지를 감싸는 컨테이너 */}
                <div style={{ display: 'flex', gap: '20px' }}>
                    {/* 배송정보 */}
                    <div style={{ 
                        flex: '1',
                        border: '1px solid #cce5ff', 
                        borderRadius: '8px', 
                        padding: '15px', 
                        marginBottom: '15px' 
                    }}>
                        <h3 style={{ marginBottom: '15px', color: '#0056b3' }}>배송 정보</h3>
                        <div style={{ whiteSpace: 'pre-line' }}>
                            <strong>보내는 분:</strong> {article.sender}
                            {'\n'}
                            <strong>받는 분:</strong> {article.receiver}
                            {'\n'}
                            <strong>우편번호:</strong> {article.post}
                            {'\n'}
                            <strong>주소:</strong> {article.addr1}
                            {'\n'}
                            <strong>상세주소:</strong> {article.addr2}
                            {'\n'}
                            <strong>전화번호:</strong> {article.tel}
                            {'\n\n'}
                            <strong>배송 메세지:</strong>
                            {'\n'}
                            {article.content}
                        </div>
                    </div>

                    {/* 선택된 이미지 */}
                    {article.selec && (
                        <div style={{ flex: '0 0 40%' }}>
                            <img 
                                src={`/exchange/ex${article.selec}.png`}
                                alt={`선택된 교환 이미지 ${article.selec}`}
                                style={{ 
                                    width: '100%', 
                                    height: 'auto', 
                                    borderRadius: '8px',
                                    border: '3px solid #007bff'
                                }}
                            />
                        </div>
                    )}
                </div>
            </div>

            <div className="button-container" style={{ textAlign: 'center', marginTop: '20px' }}>
                {(role === 'ADMIN' || (memId === article.memId && article.auth === 0)) && (
                    <button className="action-button" onClick={handleDelete} style={{ margin: '5px' }}>삭제하기</button>             
                )}         
                <button className="action-button" onClick={() => window.location.href = '/exchange/list'} style={{ margin: '5px' }}>
                    목록가기
                </button>
            </div>
        </div>
    );
};

export default ExArticle;
