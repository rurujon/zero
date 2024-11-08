import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import './NoticeDetail.css'; // 수정된 CSS 파일 불러오기

const NoticeDetail = () => {
    const [notice, setNotice] = useState(null);
    const { noticeId } = useParams();
    const navigate = useNavigate();

    const fetchNotice = useCallback(async () => {
        try {
            const response = await axios.get(`/api/notices/${noticeId}`);
            setNotice(response.data);
        } catch (error) {
            console.error('공지사항 상세 조회 실패:', error);
            alert('공지사항을 불러오는 데 실패했습니다.');
        }
    }, [noticeId]);

    useEffect(() => {
        fetchNotice();
    }, [fetchNotice]);

    if (!notice) return <div>Loading...</div>;

    return (
        <div className="notice-detail container mt-5"> {/* 공지사항 상세 페이지의 스타일 적용 */}
            <h2 className="title" style={{marginBottom: '30px'}}>{notice.title}</h2> {/* 제목에서 밑줄 제거 */}
            <p className="label">작성자: {notice.author}</p> {/* 라벨 스타일 적용 */}
            <p className="label">작성일: {new Date(notice.createdAt).toLocaleString()}</p>
            <p className="label">조회수: {notice.views}</p>
            <hr />
            <div className="content-box" dangerouslySetInnerHTML={{ __html: notice.content }} /> {/* 내용 박스 스타일 적용 */}
            <Button onClick={() => navigate('/notices')} className="mt-3">목록으로</Button>
        </div>
    );
};

export default NoticeDetail;
