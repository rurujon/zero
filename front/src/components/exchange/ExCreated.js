import React, { useState, useRef, useEffect, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../login/context/AuthContext';

const ExCreated = () => {
    const navigate = useNavigate();
    const titleRef = useRef(null);
    const contentRef = useRef(null);
    const senderRef = useRef(null); 
    const receiverRef = useRef(null);
    const telRef = useRef(null);    

    const { token, memId } = useContext(AuthContext);

    const [title, setTitle] = useState('');
    const [content, setContent] = useState('상품을 선택하지 않으면 무작위로 배송 됩니다.\n원하시는 상품이 있다면 위 이미지를 클릭해 주세요.\n\n');
    const [sender, setSender] = useState('');   
    const [receiver, setReceiver] = useState('');   

    const [post, setPost] = useState('');
    const [addr1, setAddr1] = useState('');
    const [addr2, setAddr2] = useState('');
    const [tel, setTel] = useState('');
    const [loading, setLoading] = useState(true);

    const [selectedImage, setSelectedImage] = useState(null);

    const defaultMessage = '상품을 선택하지 않으면 무작위로 배송 됩니다.\n원하시는 상품이 있다면 위 이미지를 클릭해 주세요.\n\n';

    useEffect(() => {
        if (!token) { 
            alert('로그인이 필요합니다.');
            navigate('/login');
        } else {
            setLoading(false);
        }
    }, [token, navigate]);

        const handleSenderInfo = async () => {

            try {
                const response = await axios.get('/exchange/info', {
                    headers: { Authorization: `Bearer ${token}` }
                });
                const memberData = response.data;
                console.log(memberData);
                setSender(memberData.memName);
                setPost(memberData.post);
                setAddr1(memberData.addr1);
                setAddr2(memberData.addr2);
                setLoading(false);
            } catch (error) {
                console.error('회원 정보 가져오기 오류:', error);
            }
        };

    const handleTextReset = () => {
        setTitle('');
        setSender('');
        setReceiver('');
        setContent(defaultMessage);
        setPost('');
        setAddr1('');
        setAddr2('');
        setTel('');
        setSelectedImage(null);
    };

    const handleInsertSubmit = async (evt) => {
        evt.preventDefault();

        if (validateForm()) {
            const formData = new FormData();
            formData.append('memId', memId);
            formData.append('title', title);
            formData.append('sender', sender);
            formData.append('receiver', receiver);
            formData.append('content', content);
            formData.append('post', post);
            formData.append('addr1', addr1);
            formData.append('addr2', addr2);
            formData.append('tel', tel);

            try {
                const response = await axios.post('/exchange/created', formData);
                alert(response.data);
                window.location.href = '/exchange/list';
            } catch (error) {
                alert('게시물 등록 중 오류가 발생했습니다: ' + error.message);
            }
        }
    };

    const validateForm = () => {
        if (!title) {
            alert("제목을 필수로 입력해야합니다.");
            titleRef.current.focus();
            return false;
        }
        if(!sender){
            alert("보내는 분을 입력해야합니다.");
            senderRef.current.focus();
            return false;
        }
        if(!receiver){
            alert("받는 분을 입력해야합니다.");
            receiverRef.current.focus();
            return false;
        }   
        if (!post) {
            alert("우편번호를 입력해야합니다.");
            return false;
        }

        if (!tel) {
            alert("전화번호를 입력해야합니다.");
            return false;
        }   
        return true;
    };

    const handleDaumPost = async () => {
        if (!window.daum) {
            await new Promise((resolve) => {
                const script = document.createElement('script');
                script.src = "//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js";
                script.onload = resolve;
                document.body.appendChild(script);
            });
        }

        new window.daum.Postcode({
            oncomplete: function(data) {
                setPost(data.zonecode);
                setAddr1(data.address);
            }
        }).open();
    };

    const handleImageClick = (imageNumber) => {
        setSelectedImage(imageNumber);
        switch(imageNumber) {
            case 1:
                setContent("1번 : 돌고래 장바구니\n\n");
                break;
            case 2:
                setContent("2번 : 판다 장바구니\n\n");
                break;
            case 3:
                setContent("3번 : 펭귄 장바구니\n\n");
                break;
            default:
                setContent(defaultMessage);
                break;
        }
        contentRef.current?.focus();
    };

    if (loading) {
        return <p>로딩 중...</p>;
    }

    return (
        <div style={{ padding: '20px', backgroundColor: '#f9f9f9', borderRadius: '8px', width: '800px', margin: 'auto' }}>
            <h1 style={{ textAlign: 'center' }}>교환 게시물 등록</h1>
            <form onSubmit={handleInsertSubmit} method='post'>
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '15px' }}>
                    <label style={{ flex: '0 0 150px', backgroundColor: '#cce5ff', padding: '10px' }}>사용자 ID:</label>
                    <input type="text" value={memId} readOnly style={{ flex: '1', padding: '8px', border: '1px solid #ccc' }} />
                </div>

                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '15px' }}>
                    <label style={{ flex: '0 0 150px', backgroundColor: '#cce5ff', padding: '10px' }}>제목:</label>
                    <input type="text" value={title} onChange={(evt) => setTitle(evt.target.value)} ref={titleRef} style={{ flex: '1', padding: '8px', border: '1px solid #ccc' }} />
                </div>
                {/* 이미지 영역*/}
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
                    <img 
                        src="/exchange/ex1.png" 
                        alt="교환 이미지 1" 
                        onClick={() => handleImageClick(1)}
                        style={{ 
                            width: '32%', 
                            height: 'auto', 
                            borderRadius: '8px',
                            cursor: 'pointer',
                            transition: 'all 0.2s',
                            border: selectedImage === 1 ? '3px solid #007bff' : '3px solid transparent',
                            boxShadow: selectedImage === 1 ? '0 0 10px rgba(0,123,255,0.5)' : 'none'
                        }}
                    />
                    <img 
                        src="/exchange/ex2.png" 
                        alt="교환 이미지 2" 
                        onClick={() => handleImageClick(2)}
                        style={{ 
                            width: '32%', 
                            height: 'auto', 
                            borderRadius: '8px',
                            cursor: 'pointer',
                            transition: 'all 0.2s',
                            border: selectedImage === 2 ? '3px solid #007bff' : '3px solid transparent',
                            boxShadow: selectedImage === 2 ? '0 0 10px rgba(0,123,255,0.5)' : 'none'
                        }}
                    />
                    <img 
                        src="/exchange/ex3.png" 
                        alt="교환 이미지 3" 
                        onClick={() => handleImageClick(3)}
                        style={{ 
                            width: '32%', 
                            height: 'auto', 
                            borderRadius: '8px',
                            cursor: 'pointer',
                            transition: 'all 0.2s',
                            border: selectedImage === 3 ? '3px solid #007bff' : '3px solid transparent',
                            boxShadow: selectedImage === 3 ? '0 0 10px rgba(0,123,255,0.5)' : 'none'
                        }}
                    />
                </div>

                <button type='button' onClick={handleSenderInfo} style={{ margin: '5px' }}>내 정보 불러오기</button>

                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '15px' }}>
                    <label style={{ flex: '0 0 150px', backgroundColor: '#cce5ff', padding: '10px' }}>보내는 분:</label>
                    <input type="text" value={sender} onChange={(evt) => setSender(evt.target.value)} ref={senderRef}  style={{ flex: '1', padding: '8px', border: '1px solid #ccc' }} />
                </div>
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '15px' }}>
                    <label style={{ flex: '0 0 150px', backgroundColor: '#cce5ff', padding: '10px' }}>받는 분:</label>
                    <input type="text" value={receiver} onChange={(evt) => setReceiver(evt.target.value)} ref={receiverRef}  style={{ flex: '1', padding: '8px', border: '1px solid #ccc' }} />
                </div>  

                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '15px' }}>
                    <label style={{ flex: '0 0 150px', backgroundColor: '#cce5ff', padding: '10px' }}>우편번호:</label>
                    <input type="text" value={post} readOnly style={{ flex: '1', padding: '8px', border: '1px solid #ccc' }} />
                    <button type="button" onClick={handleDaumPost} style={{ marginLeft: '10px' }}>우편번호 찾기</button>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '15px' }}>
                    <label style={{ flex: '0 0 150px', backgroundColor: '#cce5ff', padding: '10px' }}>주소:</label>
                    <input type="text" value={addr1} readOnly style={{ flex: '1', padding: '8px', border: '1px solid #ccc' }} />
                </div>

                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '15px' }}>
                    <label style={{ flex: '0 0 150px', backgroundColor: '#cce5ff', padding: '10px' }}>상세주소:</label>
                    <input type="text" value={addr2} onChange={(evt) => setAddr2(evt.target.value)} style={{ flex: '1', padding: '8px', border: '1px solid #ccc' }} />
                </div>

                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '15px' }}>
                    <label style={{ flex: '0 0 150px', backgroundColor: '#cce5ff', padding: '10px' }}>전화번호:</label>
                    <input type="text" value={tel} onChange={(evt) => setTel(evt.target.value)} ref={telRef}    style={{ flex: '1', padding: '8px', border: '1px solid #ccc' }} />
                </div>

                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '15px' }}>
                    <label style={{ flex: '0 0 150px', backgroundColor: '#cce5ff', padding: '10px' }}>요청 및 <br/> 배송 메세지:</label>
                    <textarea 
                        value={content} 
                        onChange={(evt) => {
                            const newContent = evt.target.value;
                            if (!newContent.trim()) {
                                setContent(defaultMessage);
                            } else if (newContent !== defaultMessage) {
                                setContent(newContent);
                            }
                        }}
                        ref={contentRef} 
                        style={{ 
                            flex: '1', 
                            padding: '8px', 
                            border: '1px solid #ccc', 
                            minHeight: '100px',
                            color: content === defaultMessage ? '#888' : '#000'
                        }} 
                    />
                </div>

                <div style={{ textAlign: 'center', marginTop: '20px' }}>
                    <button type="submit" style={{ margin: '5px' }}>등록하기</button>
                    <button type='button' onClick={handleTextReset} style={{ margin: '5px' }}>다시작성</button>
                    <button type='button' onClick={() => window.location.href = '/exchange/list'} style={{ margin: '5px' }}>작성취소</button>
                </div>
            </form>
        </div>
    );
};

export default ExCreated;
