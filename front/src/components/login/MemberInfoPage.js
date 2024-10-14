import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const MemberInfoPage = () => {
    const [memberInfo, setMemberInfo] = useState(null);
    const navigate = useNavigate();

    const fetchMemberInfo = useCallback(async () => {
        try {
            const response = await axios.get('/member/info', { withCredentials: true });
            setMemberInfo(response.data);
        } catch (error) {
            console.error('회원 정보를 가져오는 데 실패했습니다:', error);
            alert('회원 정보를 가져오는 데 실패했습니다. 다시 로그인해주세요.');
            navigate('/');
        }
    }, [navigate]);

    useEffect(() => {
        fetchMemberInfo();
    }, [fetchMemberInfo]);

    if (!memberInfo) {
        return <div>로딩 중...</div>;
    }

    return (
        <div>
            <h2>회원 정보</h2>
            <p><strong>아이디:</strong> {memberInfo.memId}</p>
            <p><strong>이름:</strong> {memberInfo.memName}</p>
            <p><strong>이메일:</strong> {memberInfo.email}</p>
            <p><strong>전화번호:</strong> {memberInfo.tel}</p>
            <p><strong>주소:</strong> {memberInfo.addr1} {memberInfo.addr2}</p>
            <p><strong>포인트:</strong> {memberInfo.point}</p>
            <p><strong>등급:</strong> {memberInfo.grade}</p>
            <button onClick={() => navigate('/')}>홈으로 돌아가기</button>
        </div>
    );
};

export default MemberInfoPage;
