import React, { useState, useRef } from 'react';
import axios from 'axios';

const ImgCreated = () => {

    const [memId, setMemId] = useState('user(-)');
    const [cate, setCate] = useState('');
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    
    const [images, setImages] = useState(Array(3).fill(null));
    const [imagePreviews, setImagePreviews] = useState(Array(3).fill(null)); //이미지 미리보기 

    const fileInputRefs = useRef([]);  //선택취소시 


    const handleTextReset = ()=>{
        setCate('')
        setTitle('')
        setContent('')
    }

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

    const handleImageRemove = (index) => { //선택 파일 취소 

        const newImages = [...images];
        const newPreviews = [...imagePreviews];

        newImages[index] = null;
        newPreviews[index] = null;

        setImages(newImages);
        setImagePreviews(newPreviews);

        //  file inputbox값을 초기화
        if (fileInputRefs.current[index]) {
            fileInputRefs.current[index].value = '';
        }
    };

    const handleSubmit = async (evt) => {
        
        evt.preventDefault();
        const nonEmptyImages = images.filter(img => img !== null);
        
        //유효성 검사
        if(!title){
            alert("제목을 필수로 입력해야합니다.")
            
        }

        if (nonEmptyImages.length === 0) {
            alert("인증 이미지 파일을 최소 1개 이상 업로드해야 합니다.");
            return;
        }

        for (let img of nonEmptyImages) {
            if (img.size > 1 * 1024 * 1024) {
                alert("인증 이미지 파일 크기는 최대 10MB까지 허용됩니다.");
                return;
            }
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
            const response = await axios.post('/imgboard/created', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            alert( response.data);

        } catch (error) {
            
            alert(`게시물 등록 중 오류가 발생했습니다 : ${error.message}`);
        }
    };

    return (
        <div style={{ maxWidth: '600px', margin: '0 auto', padding: '20px', border: '1px solid #ccc', borderRadius: '10px', backgroundColor: '#f9f9f9' }}>
            <h1 style={{ textAlign: 'center', color: '#333' }}>이미지 게시물 등록</h1>
            <form onSubmit={handleSubmit}>
                <div style={{ marginBottom: '20px' }}>
                    <label style={{ display: 'block', marginBottom: '5px' }}>사용자 ID:</label>
                    <input
                        type="text"
                        value={memId}
                        readOnly
                        style={{ width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }}
                    />
                </div>
                <div style={{ marginBottom: '20px' }}>
                    <label style={{ display: 'block', marginBottom: '5px' }}>인증유형:</label>
                    <select
                        value={cate}
                        onChange={(evt) => setCate(evt.target.value)}
                        style={{ width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }}
                    >
                        <option value="">인증 유형을 선택하세요</option>
                        <option value="tum">텀블러 이용</option>
                        <option value="buy">물품 구매</option>
                        <option value="group">단체 활동</option>
                    </select>
                </div>
                <div style={{ marginBottom: '20px' }}>
                    <label style={{ display: 'block', marginBottom: '5px' }}>제목:</label>
                    <input
                        type="text"
                        value={title}
                        onChange={(evt) => setTitle(evt.target.value)}
                        style={{ width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }}
                    />
                </div>
                <div style={{ marginBottom: '20px' }}>
                    <label style={{ display: 'block', marginBottom: '5px' }}>내용:</label>
                    <textarea
                        value={content}
                        onChange={(evt) => setContent(evt.target.value)}
                        style={{ width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }}
                    />
                </div>
                <button type='button' onClick={handleTextReset} style={{ marginBottom: '20px', padding: '10px 15px', backgroundColor: '#f44336', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
                    다시작성
                </button>

                <div style={{ marginBottom: '20px' }}>
                    <label style={{ display: 'block', marginBottom: '5px' }}>이미지 선택:</label>
                    {images.map((image, index) => (
                        <div key={index} style={{ marginBottom: '10px' }}>
                            <input
                                type="file"
                                ref={el => fileInputRefs.current[index] = el}
                                onChange={(evt) => handleImageChange(index, evt)}
                                accept="image/*"
                                style={{ display: 'block', marginBottom: '5px' }}
                            />
                            {imagePreviews[index] && (
                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                    <img
                                        src={imagePreviews[index]}
                                        alt='선택이미지 미리보기'
                                        style={{ width: '100px', height: '100px', objectFit: 'cover', marginRight: '10px' }}
                                    />
                                    <button type="button" onClick={() => handleImageRemove(index)} style={{ padding: '5px 10px', backgroundColor: '#f44336', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
                                        파일 선택 취소
                                    </button>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
                <button type="submit" style={{ padding: '10px 15px', backgroundColor: '#4CAF50', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer', marginRight: '10px' }}>
                    등록하기
                </button>
                <button type='button' onClick={() => window.location.href = '/imgboard/list.action'} style={{ padding: '10px 15px', backgroundColor: '#f44336', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
                    작성취소
                </button>
            </form>
        </div>
    );
};

export default ImgCreated;