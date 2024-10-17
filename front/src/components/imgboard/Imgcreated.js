import React, { useState } from 'react';
import axios from 'axios';

const ImgCreated = () => {
    const [memId, setMemId] = useState(''); // 사용자 ID
    const [cate, setCate] = useState(''); // 카테고리
    const [title, setTitle] = useState(''); // 게시글 제목
    const [content, setContent] = useState(''); // 게시글 내용
    const [images, setImages] = useState([]); // 이미지 파일

    // 이미지 파일 선택 핸들러
    const handleImageChange = (e) => {
        setImages(Array.from(e.target.files))
    }

    //handleImageReset
    const handleImageReset = (e) =>{
        e.preventDefault();
        setImages([])
    }

    // 폼 제출 핸들러
    const handleSubmit = async (e) => {
        e.preventDefault();
 
            // 이미지 갯수 및 크기 체크
    if (images.length > 3) {
        alert("이미지 파일은 최대 3개까지 업로드할 수 있습니다.");
        return;
    }

    for (let img of images) {
        if (img.size > 1 * 1024 * 1024) {
            alert("파일 크기는 최대 1MB까지 허용됩니다.");
            return;
        }
    }





        // FormData 사용하여 데이터 전송 (이미지 파일 포함)
        const formData = new FormData();
        formData.append('memId', memId);
        formData.append('cate', cate);
        formData.append('title', title);
        formData.append('content', content);

        // 이미지 파일들 추가
        for (let i = 0; i < images.length; i++) {
            formData.append('images', images[i]);
        }

        axios.post('/imgboard/created', formData, {
            
        })
        .then((response) => {
            alert(response.data);  // 성공적으로 응답을 받으면 alert 표시
        })
        .catch((error) => {
            console.error('게시물 등록 중 오류 발생:', error);
            alert('게시물 등록 중 오류가 발생했습니다. from js:  ' + error);  // 오류 발생 시 alert 표시
        });
    }
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
                    <input type="file" multiple onChange={handleImageChange} />
                    <button onClick={handleImageReset}>파일다시선택</button>
                </div>
                <button type="submit">게시물 등록</button>
            </form>
        </div>
    )
}
export default ImgCreated;
