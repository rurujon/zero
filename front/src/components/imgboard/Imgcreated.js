// 문제 1 db에 이미지 updated  안됌 


import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';

const ImgCreated = () => {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const imgPostId = queryParams.get('imgPostId'); // updated 시 받는 imgPostId
    const updatedMode = Boolean(imgPostId); // imgPostId가 있으면 updatedMode

    const [memId, setMemId] = useState('testuser');
    const [cate, setCate] = useState('');
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [images, setImages] = useState(Array(3).fill(null));
    const [imagePreviews, setImagePreviews] = useState(Array(3).fill(null));
    const [showInput, setShowInput] = useState(Array(3).fill(false)); // 입력 필드 표시 상태


    const [loading, setLoading] = useState(updatedMode);

    const fileInputRefs = useRef([]);
    const titleRef = useRef(null);
    const contentRef = useRef(null);

    useEffect(() => {
        if (updatedMode) {
            const fetchArticle = async () => {
                try {
                    const response = await axios.get('/imgboard/updated', {
                        params: { imgPostId } // imgPostId를 쿼리 파라미터로 전송
                    });
                    const { imgPost, images: existingImages } = response.data; // imgPost와 images 추출
                    const { memId, title, content, cate } = imgPost;
                    
                    setMemId(memId);
                    setTitle(title); // 기존 제목 설정
                    setContent(content); // 기존 내용 설정
                    setCate(cate); // 기존 카테고리 설정

                    // 기존 이미지 미리보기 설정
                    const newPreviews = existingImages.map(img => `/images/${img.saveFileName}`);
                    setImagePreviews(newPreviews);
                    setLoading(false); // 데이터 로딩 완료
                } catch (error) {
                    alert('게시물 데이터를 불러오는 중 오류가 발생했습니다.');
                    setLoading(false); // 데이터 로딩 완료
                }
            };

            fetchArticle(); // 수정 모드일 때 기존 게시물 데이터 fetch
        }
    }, [imgPostId, updatedMode]);

    const handleTextReset = () => {
        setCate('');
        setTitle('');
        setContent('');
    };

    // 등록(INSERT) 처리 =============================================
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
                    headers: { 'Content-Type': 'multipart/form-data' }
                });
                alert(response.data);
                window.location.href = '/imgboard/list';
            } catch (error) {
                alert('게시물 등록 중 오류가 발생했습니다: ' + error.message);
            }
        }
    };

    // 수정(UPDATE) 처리======================================
    const handleExImageRemove = (index) => {
        const newPreviews = [...imagePreviews];
        newPreviews[index] = null;
        setImagePreviews(newPreviews);
    
        setShowInput((prev) => {
            const newShowInput = [...prev]; //이전 상태 배열을 복사
            newShowInput[index] = true; // 해당 인덱스의 showInput을 true로 설정
            return newShowInput;
        });
    
        if (fileInputRefs.current[index]) {
            fileInputRefs.current[index].value = '';
        }
    };

    const handleUpdateSubmit = async (evt) => {
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
                const response = await axios.post('/imgboard/updated', formData, {
                    params: { imgPostId }, // imgPostId를 쿼리 파라미터로 전달
                    headers: { 'Content-Type': 'multipart/form-data' }
                });
                alert(response.data);
                window.location.href = '/imgboard/list';
            } catch (error) {
                alert('게시물 수정 중 오류가 발생했습니다: ' + error.message);
            }
        }
    };

    // 유효성 검사 함수
    const validateForm = (nonEmptyImages) => {
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
        if (nonEmptyImages.length === 0) {
            alert("인증 이미지파일을 최소 1개 이상 업로드해야 합니다.");
            return false;
        }
        return true;
    };

    if (loading) {
        return <p>로딩 중...</p>;
    }

    return (
        <div>
            <h1>{updatedMode ? '이미지 게시물 수정' : '이미지 게시물 등록'}</h1>
            <form onSubmit={updatedMode ? handleUpdateSubmit : handleInsertSubmit} method='post'>
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
                
                {/*  여기에 updatedMode 일때 기존 파일 이미지 나오고 이미지 삭제시 파일 선택하는 input 나오게 코딩 해  */}
                
                {updatedMode && 
                 <div>
                 <label>이미지 선택:</label>
                 {images.map((image, index) => (
                     <div key={index}>
                         {imagePreviews[index] && (
                             <div>
                                 <img
                                     src={imagePreviews[index]}
                                     alt='기존이미지 미리보기'
                                     style={{ width: '100px', height: '100px', objectFit: 'cover' }}
                                 />
                                 <button type="button" onClick={() => handleExImageRemove(index)}>기존파일 취소</button>
                             </div>
                         )}
                          {showInput[index] && (
                                    <input
                                        type="file"
                                        ref={el => fileInputRefs.current[index] = el}
                                        onChange={(evt) => handleImageChange(index, evt)}
                                        accept="image/*"
                                    />
                                )}
                     </div>
                     
                     
                 ))}
             </div> }

                { !updatedMode &&
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
                </div> }
                <button type="submit">{updatedMode ? '수정하기' : '등록하기'}</button>
                <button type='button' onClick={() => window.location.href = '/imgboard/list'}>작성취소</button>
            </form>
        </div>
    );
};

export default ImgCreated; 