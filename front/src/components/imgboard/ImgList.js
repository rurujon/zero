import React, { useEffect, useState } from 'react';
import axios from 'axios';

function ImgList() {
    const [imgPosts, setImgPosts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);

    useEffect(() => {
        fetchImgPosts();
    }, [currentPage]);

    const fetchImgPosts = () => {
        axios.get(`/imgboard/list?page=${currentPage}&size=12`)
            .then(response => {
                setImgPosts(response.data.imgBoardList);
                setTotalPages(response.data.totalPages);
                console.log(response.data);
            })
            .catch(error => {
                console.error('이미지를 찾을 수 없습니다.', error);
            });
    };

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    return (
        <div>
            <h2>인증게시판 리스트</h2>
            {/* ...이미지 리스트 출력 부분... */}
            <div>
                <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
                    ◀ 이전
                </button>
                {[...Array(totalPages).keys()].map(num => (
                    <button key={num} onClick={() => handlePageChange(num + 1)} disabled={currentPage === num + 1}>
                        {num + 1}
                    </button>
                ))}
                <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>
                    다음 ▶
                </button>
            </div>
        </div>
    );
}

export default ImgList;
