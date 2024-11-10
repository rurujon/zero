import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import './NoticeDetail.css';
import styled from 'styled-components';

const NoticeContent = styled.div`
    img {
        max-width: 100%;
        height: auto;
    }
`;

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
        <div className="notice-detail container mt-5">
            <h2 className="title" style={{marginBottom: '30px'}}>{notice.title}</h2>
            <div className='notice-r'>
                <span className="label">작성자: {notice.author}</span>
                <span className="label">작성일: {new Date(notice.createdAt).toLocaleString()}</span>
                <span className="label">조회수: {notice.views}</span>
            </div>
            <hr />
            <NoticeContent dangerouslySetInnerHTML={{ __html: notice.content }} />
            <Button onClick={() => navigate('/notices')} className="mt-3">목록으로</Button>
        </div>
    );
};

export default NoticeDetail;
