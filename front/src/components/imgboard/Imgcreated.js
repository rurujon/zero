import React, { useState } from 'react';
import axios from 'axios';

const ImgCreated = () => {
    const [memId, setMemId] = useState('');
    const [cate, setCate] = useState('');
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [images, setImages] = useState(Array(3).fill(null));

    const handleImageChange = (index, e) => {
        const newImages = [...images];
        newImages[index] = e.target.files[0]; 
        setImages(newImages);
        
        setTimeout(() => {
            setImages([...newImages]);
        }, 0);
    };

/*      const handleImageReset = (index) => {
        const newImages = [...images];
        newImages[index] = null; // 해당 인덱스의 이미지를 null로 리셋
        setImages(newImages);

        const fileInput = document.querySelector(`input[type="file"]:nth-of-type(${index})`);
        if (fileInput) {
            fileInput.value = ''; // 파일 입력 박스 리셋
        } 
    };
*/

    const handleSubmit = async (e) => {
        e.preventDefault();

        // null 값이 아닌 이미지 갯수 확인
        const nonEmptyImages = images.filter(img => img !== null);
     
        if ( nonEmptyImages.length===0) {
            alert("인증 이미지 파일을 최소 1개 이상 업로드해야 합니다.");
            return;
        }

        for (let img of nonEmptyImages) {
            if (img.size > 1 * 1024 * 1024) {
                alert("인증 이미지 파일 크기는 최대 1MB까지 허용됩니다.");
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
            console.log('서버 응답:', response.data);
            alert(response.data);

        } catch (error) {
            console.error('게시물 등록 중 오류 발생:', error);
            if (error.response) {
                console.error('응답 데이터:', error.response.data);
                console.error('응답 상태:', error.response.status);
                console.error('응답 헤더:', error.response.headers);
            }
            alert(`게시물 등록 중 오류가 발생했습니다: ${error.message}`);
        }
    };

    return (
        <div>
            <h1>이미지 게시물 등록</h1>
            <form onSubmit={handleSubmit} method='post'>
                <div>
                    <label>사용자 ID:</label>
                    <input
                        type="text"
                        value={memId}
                        onChange={(e) => setMemId(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>카테고리:</label>
                    <input
                        type="text"
                        value={cate}
                        onChange={(e) => setCate(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>제목:</label>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>내용:</label>
                    <textarea
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>이미지 선택:</label>
                    {/* 이미지 선택 입력 필드 3개 추가 */}
                    {images.map((image, index) => (
                        <div key={index}>
                            <input
                            type="file"
                            onChange={(e) => handleImageChange(index, e)}
                            accept="image/*"
                        />

                        </div>
                     ))}

                </div>
                <button type="submit">게시물 등록</button>
    
            </form>
        </div>
    );
};

export default ImgCreated;
