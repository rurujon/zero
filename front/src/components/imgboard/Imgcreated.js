import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';

const ImgCreated = () => {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const imgPostId = queryParams.get('imgPostId'); //updated시 받는 imgPostId
    const updatedMode = Boolean(imgPostId); // imgPostId가 있으면 updatedMode

    const [memId, setMemId] = useState('testuser');
    const [cate, setCate] = useState('');
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [images, setImages] = useState(Array(3).fill(null));
    const [imagePreviews, setImagePreviews] = useState(Array(3).fill(null));
    const [loading, setLoading] = useState(updatedMode);

    const fileInputRefs = useRef([]);
    const titleRef = useRef(null);
    const contentRef = useRef(null);

    useEffect(() => {
        if (updatedMode) {
            const fetchArticle = async () => {
                try {
                    const response = await axios.get('/imgboard/updated', {
                        params: { imgPostId }
                    });
                    const { title, content, cate, images: existingImages } = response.data.imgPost;
                    
                    setTitle(title);
                    setContent(content);
                    setCate(cate);

                    // 기존 이미지 설정
                    const newPreviews = existingImages.map(img => `/images/${img.saveFileName}`);
                    setImagePreviews(newPreviews);
                    setLoading(false);
                } catch (error) {
                    alert('게시물 데이터를 불러오는 중 오류가 발생했습니다.');
                    setLoading(false);
                }
            };

            fetchArticle();
        }
    }, [imgPostId, updatedMode]);

    const handleTextReset = () => {
        setCate('');
        setTitle('');
        setContent('');
    };

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

    const handleSubmit = async (evt) => {
        evt.preventDefault();
        const nonEmptyImages = images.filter(img => img !== null);

        // 유효성 검사 ----------------------------------------------------------
        if (cate === "") {
            alert("인증 유형을 선택하세요.");
            return;
        }
        if (!title) {
            alert("제목을 필수로 입력해야합니다.");
            titleRef.current.focus();
            return; 
        }
        if (!content) {
            alert("내용을 필수로 입력해야합니다.");
            contentRef.current.focus();
            return; 
        }
        if (nonEmptyImages.length === 0) {
            alert("인증 이미지파일을 최소 1개 이상 업로드해야 합니다.");
            return;
        }

        const formData = new FormData();
        formData.append('memId', memId);
        formData.append('cate', cate);
        formData.append('title', title);
        formData.append('content', content);

        for (let img of nonEmptyImages) {
            formData.append('images', img);
        }

        try {
            const response = updatedMode
                ? await axios.put(`/imgboard/updated`, formData, {
                    params: { imgPostId },
                    headers: { 'Content-Type': 'multipart/form-data' }
                })
                : await axios.post('/imgboard/created', formData, {
                    headers: { 'Content-Type': 'multipart/form-data' }
                });

            alert(response.data);
            window.location.href = '/imgboard/list';
        } catch (error) {
            alert(`게시물 ${updatedMode ? '수정' : '등록'} 중 오류가 발생했습니다 : ${error.message}`);
        }
    };

    if (loading) {
        return <p>로딩 중...</p>;
    }

    return (
        <div>
            <h1>{updatedMode ? '이미지 게시물 수정' : '이미지 게시물 등록'}</h1>
            <form onSubmit={handleSubmit} method='post'>
                <div>
                    <label>사용자 ID:</label>
                    <input type="text" value={memId} readOnly />
                </div>
                <div>
                    <label>인증유형:</label>
                    <select value={cate} onChange={(evt) => setCate(evt.target.value)}>
                        <option value="">인증 유형을 선택하세요</option>
                        <option value="tum">텀블러 이용</option>
                        <option value="buy">물품 구매</option>
                        <option value="group">단체활동 참여</option>
                    </select>
                </div>
                <div>
                    <label>제목:</label>
                    <input type="text" value={title} onChange={(evt) => setTitle(evt.target.value)} ref={titleRef} />
                </div>
                <div>
                    <label>내용:</label>
                    <textarea value={content} onChange={(evt) => setContent(evt.target.value)} ref={contentRef} />
                </div>
                <button type='button' onClick={handleTextReset}>다시작성</button>
                
                <div>
                    <label>이미지 선택:</label>
                    {images.map((image, index) => (
                        <div key={index}>
                            <input
                                type="file"
                                ref={el => fileInputRefs.current[index] = el}
                                onChange={(evt) => handleImageChange(index, evt)}
                                accept="image/*"
                            />
                            {imagePreviews[index] && (
                                <div>
                                    <img
                                        src={imagePreviews[index]}
                                        alt='선택이미지 미리보기'
                                        style={{ width: '100px', height: '100px', objectFit: 'cover' }}
                                    />
                                    <button type="button" onClick={() => handleImageRemove(index)}>파일 선택 취소</button>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
                <button type="submit">{updatedMode ? '수정하기' : '등록하기'}</button>
                <button type='button' onClick={() => window.location.href = '/imgboard/list'}>작성취소</button>
            </form>
        </div>
    );
};

export default ImgCreated;
