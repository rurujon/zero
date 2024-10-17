import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ImgList = () => {
    const [imgBoardList, setImgBoardList] = useState([]);

    useEffect(() => {
        const fetchImgBoards = async () => {
            try {
                const response = await axios.get('/imgboard/list');
                setImgBoardList(response.data);
            } catch (error) {
                console.error('Error fetching the list', error);
            }
        };

        fetchImgBoards();
    }, []);

    return (
        <div>
            <h1>이미지 게시판 목록</h1>
            <ul>
                {imgBoardList.map((imgBoard) => (
                    <li key={imgBoard.imgPost.imgPostId}>
                        <h2>{imgBoard.imgPost.title}</h2>
                        <p>{imgBoard.imgPost.content}</p>
                        {imgBoard.images.map((img) => (
                            <img key={img.imgId} src={img.filePath} alt={img.originalFileName} />
                        ))}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ImgList;
