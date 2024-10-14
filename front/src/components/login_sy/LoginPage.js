import React, { useState } from 'react';
import axios from 'axios';


const LoginPage = ({ onLogin }) => {
    const [memId, setMemId] = useState('');
    const [pwd, setPwd] = useState('');

    const handleLogin = () => {
        axios.post('/api/members/login', null, { params: { memId, pwd } })
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
        <dl class="shadow-box">
            <br/>
            <div class="dl-item"><h2>로그인</h2></div><br/>
            <div class="dl-item">
            <dt>아이디</dt>
            <dd><input type="text" class="form-control" value={memId} onChange={(e) => setMemId(e.target.value)} style={{width:'500px'}}/></dd>
            </div>
            <div class="dl-item">
            <dt>비밀번호</dt>
            <dd><input type="password" class="form-control" value={pwd} onChange={(e) => setPwd(e.target.value)} style={{width:'500px'}}/></dd>
            </div>
            <div class="dl-item" style={{marginBottom:'15px'}}><button onClick={handleLogin} class="btn btn-outline-secondary">로그인하기</button></div><br/>
            
             <div class="dl-item">
                {/* 구글 로그인 이미지 버튼 */}
                <a href="/oauth2/authorization/google">
                    <img src="\images\login\google.png" alt="Google Login" style={{ width: '50px', height: '50px' }}/>
                </a>&nbsp;&nbsp;

                {/* 카카오 로그인 이미지 버튼 */}
                <a href="/oauth2/authorization/kakao">
                    <img src="/images/login/kakao.png" alt="Kakao Login" style={{ width: '50px', height: '50px' }}/>
                </a>&nbsp;&nbsp;

                {/* 네이버 로그인 이미지 버튼 */}
                <a href="/oauth2/authorization/naver">
                    <img src="/images/login/naver.png" alt="Naver Login" style={{ width: '50px', height: '50px' }}/>
                </a>
            
        </div>
        </dl>
    );
};

export default LoginPage;
