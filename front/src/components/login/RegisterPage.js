import React, { useState, useEffect } from 'react';
import axios from 'axios';
import MemberForm from './MemberForm';
import { useNavigate } from 'react-router-dom'; // useNavigate 훅을 추가로 가져옵니다.

const RegisterPage = ({ onRegisterCancel }) => {
    const [terms, setTerms] = useState('');
    const [privacy, setPrivacy] = useState('');
    const navigate = useNavigate(); // useNavigate 훅을 사용하여 네비게이션 기능을 추가합니다.

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

    const handleRegisterSuccess = (memberData) => {
        if (!memberData || typeof memberData !== 'object') {
            alert('회원가입 처리 중 오류가 발생했습니다.');
            return;
        }

        if (!memberData.termsAccepted || !memberData.privacyAccepted) {
            alert('이용약관과 개인정보 처리방침에 동의해야 합니다.');
            return;
        }

        alert('회원가입이 완료되었습니다.');
        navigate('/login');
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
