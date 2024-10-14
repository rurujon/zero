import React, { useState } from 'react';
import axios from 'axios';

const LoginPage = ({ onLogin }) => {
    const [memId, setMemId] = useState('');
    const [pwd, setPwd] = useState('');

    const handleLogin = () => {
        axios.post('/member/login', null, {
            params: { memId, pwd },
            withCredentials: true // 이 옵션을 추가하여 쿠키를 받을 수 있게 함
        })
            .then(response => {
                if (response.data === '로그인 성공') {
                    onLogin(memId);
                } else {
                    alert('로그인 실패');
                }
            })
            .catch(error => {
                console.error(error);
                alert('로그인 중 오류가 발생했습니다.');
            });
    };

    return (
        <div>
            <h2>로그인</h2>
            <input type="text" placeholder="아이디" value={memId} onChange={(e) => setMemId(e.target.value)}/>
            <input type="password" placeholder="비밀번호" value={pwd} onChange={(e) => setPwd(e.target.value)}/>
            <button onClick={handleLogin}>로그인</button><br />

        </div>
    );
};

export default LoginPage;
