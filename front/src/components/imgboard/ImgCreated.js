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

    // AuthContext에서 token, memId, role 가져오기
    const { token, memId, role } = useContext(AuthContext);


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
            navigate('/login');
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
                        params: { imgPostId }
                    });
                    
                    const { imgPost, images: existingImages } = response.data;
                    const { memId: postMemId, title, content, cate, auth} = imgPost;

                    if (postMemId !== memId && role !== 'ADMIN') {
                        alert("본인이 작성한 게시물만 수정할 수 있습니다.");
                        navigate('/imgboard/list');

                        return;

                    }else if (auth === 1) {
                        alert("인증된 게시물은 수정할 수 없습니다");
                        navigate(`/imgboard/article?imgPostId=${imgPostId}`);
                        return;

                    }

                    setTitle(title);
                    setContent(content);
                    setCate(cate);

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
    }, [imgPostId, updatedMode, memId, role, navigate]);

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
                    headers: { 'Content-Type': 'multipart/form-data' }
                });
                alert(response.data);
                window.location.href = '/imgboard/list';
            } catch (error) {
                alert('게시물 등록 중 오류가 발생했습니다: ' + error.message);
            }
        }
    };

    const handleUpdateSubmit = async (evt) => {
        evt.preventDefault();
        const nonEmptyImages = images.filter(img => img !== null);

        // 기존 이미지 존재 확인
        const existingImagesCount = imagePreviews.filter(preview => preview !== null).length;

        if (validateForm(nonEmptyImages, existingImagesCount)) {
            const formData = new FormData();
            formData.append('memId', memId);
            formData.append('cate', cate);
            formData.append('title', title);
            formData.append('content', content);

            // 이미지 파일을 포함하지 않고 업데이트 요청
            try {
                const response = await axios.post('/imgboard/updated', formData, {
                    params: { imgPostId }
                });
                alert(response.data);
                window.location.href = '/imgboard/list';
            } catch (error) {
                alert('게시물 수정 중 오류가 발생했습니다: ' + error.message);
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

                {!updatedMode && ( // created
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
                )}

                {updatedMode && 
                    <div>
                        <label>이미지 선택:</label>
                        {imagePreviews.map((preview, index) => (
                            <div key={index}>
                                {preview && (
                                    <img
                                        src={preview}
                                        alt='기존이미지 미리보기'
                                        style={{ width: '100px', height: '100px', objectFit: 'cover' }}
                                    />
                                )}
                            </div>
                        ))}
                    </div>
                }

                <button type="submit">{updatedMode ? '수정하기' : '등록하기'}</button>
                <button type='button' onClick={() => window.location.href = '/imgboard/list'}>작성취소</button>
            </form>
        </div>
    );
};

export default ImgCreated;
