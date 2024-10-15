import React, { useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css'

const LoginPage = ({ onLogin }) => {
    const [memId, setMemId] = useState('');
    const [pwd, setPwd] = useState('');

    const handleLogin = () => {
        axios.post('/member/login', null, {
            params: { memId, pwd },
            withCredentials: true // 쿠키를 받을 수 있게 함
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
        <div className="container" style={{ marginBottom: '15px', margin: '15px' }}>
            <h2>로그인</h2><br />
            <form>
                <div className="dl-item">
                    <dt>아이디</dt>
                    <dd>
                        <input
                            type="text"
                            className="form-control"
                            value={memId}
                            onChange={(e) => setMemId(e.target.value)}
                            style={{ width: '400px' }}
                        />
                    </dd>
                </div>
                <div className="dl-item">
                    <dt>비밀번호</dt>
                    <dd>
                        <input
                            type="password"
                            className="form-control"
                            value={pwd}
                            onChange={(e) => setPwd(e.target.value)}
                            style={{ width: '400px' }}
                        />
                    </dd>
                </div>
                <div className="dl-item" style={{ marginBottom: '15px' }}>
                    <button
                        type="button"
                        onClick={handleLogin}
                        className="btn btn-primary btn-sm"
                    >
                        로그인
                    </button>
                </div>
            </form>
        </div>
    );
};

export default LoginPage;
