import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import MemberForm from './MemberForm';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from './context/AuthContext';

const RegisterPage = ({ onRegisterCancel }) => {
    const [terms, setTerms] = useState('');
    const [privacy, setPrivacy] = useState('');
    const navigate = useNavigate();
    const { login } = useContext(AuthContext);

    useEffect(() => {
        fetchTerms();
        fetchPrivacy();
    }, []);

    const fetchTerms = async () => {
        try {
            const response = await axios.get('/member/terms');
            setTerms(response.data);
        } catch (error) {
            console.error('이용약관을 불러오는 중 오류 발생:', error);
        }
    };

    const fetchPrivacy = async () => {
        try {
            const response = await axios.get('/member/privacy');
            setPrivacy(response.data);
        } catch (error) {
            console.error('개인정보 동의서를 불러오는 중 오류 발생:', error);
        }
    };

    const handleRegisterSuccess = async (memberData) => {
        if (!memberData || typeof memberData !== 'object') {
            alert('회원가입 중 오류가 발생했습니다.');
            return;
        }

        alert('회원가입이 성공적으로 완료되었습니다.');

        try {
            // 회원가입 성공 후 자동 로그인 시도
            const response = await axios.post('/member/login', null, { params: { memId: memberData.memId, pwd: memberData.pwd } });
            if (response.data.token) {
                login(response.data.token, memberData.memId);
                navigate('/member-info'); // 로그인된 회원의 페이지로 이동
            } else {
                navigate('/login'); // 자동 로그인 실패 시 로그인 페이지로 이동
            }
        } catch (error) {
            console.error('자동 로그인 오류:', error);
            navigate('/login'); // 오류 발생 시 로그인 페이지로 이동
        }
    };

    const handleCancel = () => {
        onRegisterCancel();
    };

    return (
        <div>
            <MemberForm
                onSubmit={handleRegisterSuccess}
                onCancel={handleCancel}
                isEditing={false}
                termsContent={terms}
                privacyContent={privacy}
            />
        </div>
    );
};

export default RegisterPage;
