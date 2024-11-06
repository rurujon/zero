import React, { useState, useRef, useEffect, useContext } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../login/context/AuthContext';

const ImgCreated = () => {
    const navigate = useNavigate(); // navigate 훅 추가
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const imgPostId = queryParams.get('imgPostId'); // updated 시 받는 imgPostId
    const updatedMode = Boolean(imgPostId); // imgPostId가 있으면 updatedMode

    // AuthContext에서 token만 가져오기
    const { token } = useContext(AuthContext);

    // token에서 memId와 role 가져오기
    const getTokenInfo = (token) => {
        if (token) {
            const payloadBase64 = token.split('.')[1];
            const decodedPayload = JSON.parse(atob(payloadBase64));
            return {
                memId: decodedPayload.sub,
                role: decodedPayload.role
            };
        }
        return { memId: null, role: null };
    };

    const { memId, role } = getTokenInfo(token);

    const [cate, setCate] = useState('');
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [images, setImages] = useState(Array(3).fill(null));
    const [imagePreviews, setImagePreviews] = useState(Array(3).fill(null));
    const [loading, setLoading] = useState(true);

    const fileInputRefs = useRef([]);
    const titleRef = useRef(null);
    const contentRef = useRef(null);
   

    useEffect(() => {
        if (!token) { 
            alert('로그인이 필요합니다.');
            navigate('/mainpage');
        } else {
            setLoading(false);
        }
    }, [token, navigate]);

    useEffect(() => {
        if (updatedMode) {
            const fetchArticle = async () => {
                setLoading(true);
                try {
                    const response = await axios.get('/imgboard/updated', {
                        params: { imgPostId },
                        headers: {
                            'Authorization': `Bearer ${token}`
                        }
                    });
                    
                    const { imgPost, images: existingImages } = response.data;
                    const { memId: postMemId, title, content, cate, auth } = imgPost;

                    if (postMemId !== memId && role !== 'ADMIN') {
                        alert("본인이 작성한 게시물만 수정할 수 있습니다.");
                        navigate('/imgboard/list');
                        return;
                    } else if (auth === 1) {
                        alert("인증된 게시물은 수정할 수 없습니다");
                        navigate(`/imgboard/article?imgPostId=${imgPostId}`);
                        return;
                    }

                    setTitle(title);
                    setContent(content);
                    setCate(cate);

                    const newPreviews = existingImages.map(img => `/images/imgboard/${img.saveFileName}`);
                    setImagePreviews(newPreviews);
                    
                } catch (error) {
                  
                        alert('게시물 데이터를 불러오는 중 오류가 발생했습니다.');
                    
                } finally {
                    setLoading(false);
                }
            };

            fetchArticle();
        }
    }, [imgPostId, updatedMode, memId, role, navigate, token]);

    const handleTextReset = () => {
        setCate('');
        setTitle('');
        setContent('');
    };

    //파일선택
    const handleImageChange = (index, evt) => {
        const file = evt.target.files[0];
        const newImages = [...images];
        const newPreviews = [...imagePreviews];

        if (file) {
            newImages[index] = file;
            newPreviews[index] = URL.createObjectURL(file);
        } else {
            newImages[index] = null;
            newPreviews[index] = null;
        }

        setImages(newImages);
        setImagePreviews(newPreviews);
    };

    //선택파일 취소 
    const handleImageRemove = (index) => {
        const newImages = [...images];
        const newPreviews = [...imagePreviews];

        newImages[index] = null;
        newPreviews[index] = null;

        setImages(newImages);
        setImagePreviews(newPreviews);

        if (fileInputRefs.current[index]) {
            fileInputRefs.current[index].value = '';
        }
    };

    const handleInsertSubmit = async (evt) => {
        evt.preventDefault();
        const nonEmptyImages = images.filter(img => img !== null);

        if (validateForm(nonEmptyImages)) {
            const formData = new FormData();
            formData.append('memId', memId);
            formData.append('cate', cate);
            formData.append('title', title);
            formData.append('content', content);

            for (let img of nonEmptyImages) {
                formData.append('images', img);
            }

            try {
                const response = await axios.post('/imgboard/created', formData, {
                    headers: { 
                        'Content-Type': 'multipart/form-data',
                        'Authorization': `Bearer ${token}`
                    }
                });
                alert(response.data);
                window.location.href = '/imgboard/list';
            } catch (error) {
                if (error.response?.status === 401) {
                    alert('로그인이 필요한 서비스입니다.');
                    navigate('/login');
                } else {
                    alert('게시물 등록 중 오류가 발생했습니다: ' + error.message);
                }
            }
        }
    };

    const handleUpdateSubmit = async (evt) => {
        evt.preventDefault();
        const nonEmptyImages = images.filter(img => img !== null);
        const existingImagesCount = imagePreviews.filter(preview => preview !== null).length;

        if (validateForm(nonEmptyImages, existingImagesCount)) {
            const formData = new FormData();
            formData.append('memId', memId);
            formData.append('cate', cate);
            formData.append('title', title);
            formData.append('content', content);

            try {
                const response = await axios.post('/imgboard/updated', formData, {
                    params: { imgPostId },
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                alert(response.data);
                window.location.href = '/imgboard/list';
            } catch (error) {
                if (error.response?.status === 401) {
                    alert('로그인이 필요한 서비스입니다.');
                    navigate('/login');
                } else {
                    alert('게시물 수정 중 오류가 발생했습니다: ' + error.message);
                }
            }
        }
    };

    //유효성 검사
    const validateForm = (nonEmptyImages, existingImagesCount) => {
        if (cate === "") {
            alert("인증 유형을 선택하세요.");
            return false;
        }
        if (!title) {
            alert("제목을 필수로 입력해야합니다.");
            titleRef.current.focus();
            return false;
        }
        if (!content) {
            alert("내용을 필수로 입력해야합니다.");
            contentRef.current.focus();
            return false;
        }
        if (!updatedMode && (nonEmptyImages.length === 0)) {
            alert("이미지를 최소 1개 이상 업로드해야 합니다.");
            return false;
        }
        return true;
    };

    if (loading) {
        return <p>로딩 중...</p>;
    }
    return (
        <div style={{ padding: '20px', backgroundColor: '#f9f9f9', borderRadius: '8px', maxWidth: '800px', margin: 'auto' }}>
            <h1 style={{ textAlign: 'center' }}>이미지 게시물 등록</h1>
            <form onSubmit={updatedMode ? handleUpdateSubmit : handleInsertSubmit} method='post'>
                <div style={{ marginBottom: '15px' }}>
                    <label style={{ display: 'block', backgroundColor: '#cce5ff', padding: '10px' }}>사용자 ID:</label>
                    <input type="text" value={memId} readOnly style={{ width: '100%', padding: '8px', border: '1px solid #ccc' }} />
                </div>
    
                <div style={{ marginBottom: '15px' }}>
                    <label style={{ display: 'block', backgroundColor: '#cce5ff', padding: '10px' }}>인증유형:</label>
                    <select value={cate} onChange={(evt) => setCate(evt.target.value)} style={{ width: '100%', padding: '8px', border: '1px solid #ccc' }}>
                        <option value="">인증 유형을 선택하세요</option>
                        <option value="tum">텀블러 이용</option>
                        <option value="buy">물품 구매</option>
                        <option value="group">단체활동 참여</option>
                    </select>
                </div>
    
                <div style={{ marginBottom: '15px' }}>
                    <label style={{ display: 'block', backgroundColor: '#cce5ff', padding: '10px' }}>제목:</label>
                    <input type="text" value={title} onChange={(evt) => setTitle(evt.target.value)} ref={titleRef} style={{ width: '100%', padding: '8px', border: '1px solid #ccc' }} />
                </div>
    
                <div style={{ marginBottom: '15px' }}>
                    <label style={{ display: 'block', backgroundColor: '#cce5ff', padding: '10px' }}>내용:</label>
                    <textarea value={content} onChange={(evt) => setContent(evt.target.value)} ref={contentRef} style={{ width: '100%', padding: '8px', border: '1px solid #ccc' }} />
                </div>
    
                <div style={{ marginBottom: '15px' }}>
                    <button type='button' onClick={handleTextReset} style={{ margin: '5px' }}>다시작성</button>
                </div>
    
             { !updatedMode && 
                <div style={{ marginBottom: '15px' }}>
                    <label style={{ display: 'block', backgroundColor: '#cce5ff', padding: '10px' }}>이미지 선택:</label>
                    {images.map((image, index) => (
                        <div key={index} style={{ marginBottom: '10px' }}>
                            <input
                                type="file"
                                ref={el => fileInputRefs.current[index] = el}
                                onChange={(evt) => handleImageChange(index, evt)}
                                accept="image/*"
                                style={{ marginBottom: '5px' }}
                            />
                            {imagePreviews[index] && (
                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                    <img
                                        src={imagePreviews[index]}
                                        alt='선택이미지 미리보기'
                                        style={{ width: '100px', height: '100px', objectFit: 'cover', marginRight: '10px' }}
                                    />
                                    <button type="button" onClick={() => handleImageRemove(index)}>파일 선택 취소</button>
                                </div>
                            )}
                        </div>
                    ))}
                </div> }
    
                {updatedMode && (
                    <div style={{ marginBottom: '15px' }}>
                        <label style={{ display: 'block', backgroundColor: '#cce5ff', padding: '10px' }}>이미지 선택:</label>
                        {imagePreviews.map((preview, index) => (
                            <div key={index}>
                                {preview && (
                                    <img
                                        src={preview}
                                        alt='기존이미지 미리보기'
                                        style={{ width: '100px', height: '100px', objectFit: 'cover', margin: '5px' }}
                                    />
                                )}
                            </div>
                        ))}
                    </div>
                )}
    
                <div style={{ textAlign: 'center', marginTop: '20px' }}>
                    <button type="submit" style={{ margin: '5px' }}>{updatedMode ? '수정하기' : '등록하기'}</button>
                    <button type='button' onClick={() => window.location.href = '/imgboard/list'} style={{ margin: '5px' }}>작성취소</button>
                </div>
            </form>
        </div>
    );
    
    
};

export default ImgCreated;
