import React, { useState, useRef } from 'react';
import axios from 'axios';

const ImgCreated = () => {

    const [memId, setMemId] = useState('');
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

        if(!memId){
            alert ("모든 항목을 최소 1개 이상 기입해야 합니다.")
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
        <div>
            <h1>이미지 게시물 등록</h1>
            <form onSubmit={handleSubmit} method='post'>
            <div>    
                <div>
                    <label>사용자 ID:</label>
                    <input
                        type="text"
                        value={memId}
                        onChange={(evt) => setMemId(evt.target.value)}
                       
                    />
                </div>
                <div>
                    <label>인증 유형:</label>
                    <input
                        type="text"
                        value={cate}
                        onChange={(evt) => setCate(evt.target.value)}
                        
                    />
                </div>
                <div>
                    <label>제목:</label>
                    <input
                        type="text"
                        value={title}
                        onChange={(evt) => setTitle(evt.target.value)}
                    />
                </div>
                <div>
                    <label>내용:</label>
                    <textarea
                        value={content}
                        onChange={(evt) => setContent(evt.target.value)}
                    />
                </div>
                <button type='button' onClick={handleTextReset}>다시작성</button>

            </div>    
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

                                    <button type="button" onClick={() => handleImageRemove(index)}>
                                        파일 선택 취소
                                    </button>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
                <button type="submit" onClick={() => window.location.href = '/imgboard/list.action'}>등록하기</button>
                <button type='button' onClick={() => window.location.href = '/imgboard/list.action'}>작성취소</button> 
        
            </form>
        </div>
    );
};

export default ImgCreated;  
