import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom'; 

const ExArticle = () => {
    const [memId, setMemId] = useState(localStorage.getItem('memId')); 
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const exchangeId = queryParams.get('exchangeId');

    const [article, setArticle] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();   

    useEffect(() => {
        if (!memId) {
            alert("로그인 한 사용자만 게시글을 조회할 수 있습니다 !");
            navigate("/");
        } 
    }, [memId, navigate]);

    useEffect(() => {
        const fetchArticle = async () => {
            try {
                const response = await axios.get('/exchange/article', {
                    params: { exchangeId }
                });
                setArticle(response.data);  
                setLoading(false);
            } catch (error) {
                console.error('게시물을 가져오는 데 오류가 발생했습니다.', error);
                setLoading(false);
            }
        };

        fetchArticle();
    }, [exchangeId]);



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
            window.location.reload(); 
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
                    {memId === "suzi123" && article.auth === 0 && (
                        <button type='button' onClick={handleAuth}>인증승인</button>
                    )}
                </div>

                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '15px' }}>
                    <label style={{ flex: '0 0 150px', backgroundColor: '#cce5ff', padding: '10px' }}>사용자 ID:</label>
                    <span style={{ flex: '1', padding: '8px' }}>{article.memId}</span>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '15px' }}>
                    <label style={{ flex: '0 0 150px', backgroundColor: '#cce5ff', padding: '10px' }}>보내는 분:</label>
                    <span style={{ flex: '1', padding: '8px' }}>{article.sender}</span>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '15px' }}>
                    <label style={{ flex: '0 0 150px', backgroundColor: '#cce5ff', padding: '10px' }}>받는 분:</label>
                    <span style={{ flex: '1', padding: '8px' }}>{article.receiver}</span>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '15px' }}>
                    <label style={{ flex: '0 0 150px', backgroundColor: '#cce5ff', padding: '10px' }}>우편번호:</label>
                    <span style={{ flex: '1', padding: '8px' }}>{article.post}</span>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '15px' }}>
                    <label style={{ flex: '0 0 150px', backgroundColor: '#cce5ff', padding: '10px' }}>주소:</label>
                    <span style={{ flex: '1', padding: '8px' }}>{article.addr1}</span>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '15px' }}>
                    <label style={{ flex: '0 0 150px', backgroundColor: '#cce5ff', padding: '10px' }}>상세주소:</label>
                    <span style={{ flex: '1', padding: '8px' }}>{article.addr2}</span>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '15px' }}>
                    <label style={{ flex: '0 0 150px', backgroundColor: '#cce5ff', padding: '10px' }}>전화번호:</label>
                    <span style={{ flex: '1', padding: '8px' }}>{article.tel}</span>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '15px' }}>
                    <label style={{ flex: '0 0 150px', backgroundColor: '#cce5ff', padding: '10px' }}>작성일:</label>
                    <span style={{ flex: '1', padding: '8px' }}>{new Date(article.created).toLocaleDateString()}</span>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '15px' }}>
                    <label style={{ flex: '0 0 150px', backgroundColor: '#cce5ff', padding: '10px' }}>배송 메세지:</label>
                    <span style={{ flex: '1', padding: '8px' }}>{article.content}</span>
                </div>
            </div>

            <div className="button-container" style={{ textAlign: 'center', marginTop: '20px' }}>
                {((memId === article.memId && article.auth === 0) || memId === "suzi123") && (
                    <>
                        <button className="action-button" onClick={() => window.location.href = `/exchange/updated?exchangeId=${exchangeId}`} style={{ margin: '5px' }}>
                            수정하기
                        </button>
                        <button className="action-button" onClick={handleDelete} style={{ margin: '5px' }}>삭제하기</button>             
                    </>
                )}         
                <button className="action-button" onClick={() => window.location.href = '/exchange/list'} style={{ margin: '5px' }}>
                    목록가기
                </button>
            </div>
        </div>
    );
};

export default ExArticle;
