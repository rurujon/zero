import React, { useState } from 'react';
import axios from 'axios';

const ImgCreated = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [file, setFile] = useState(null);

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('title', title);
        formData.append('content', content);
        formData.append('file', file);

        try {
            await axios.post('/imgboard/created', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            alert('게시글이 등록되었습니다.');
        } catch (error) {
            console.error('Error uploading the file', error);
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>제목</label>
                    <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
                </div>
                <div>
                    <label>내용</label>
                    <textarea value={content} onChange={(e) => setContent(e.target.value)} />
                </div>
                <div>
                    <label>파일 선택</label>
                    <input type="file" onChange={handleFileChange} />
                </div>
                <button type="submit">등록</button>
            </form>
        </div>
    );
};

export default ImgCreated;
