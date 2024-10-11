import React, { useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css'

const RegisterPage = ({ onRegisterSuccess }) => {
    const [member, setMember] = useState({
        memId: '',
        pwd: '',
        memName: '',
        email: '',
        tel: '',
        post: '',
        addr1: '',
        addr2: ''
    });

    const handleChange = (e) => {
        setMember({
            ...member,
            [e.target.name]: e.target.value
        });
    };

    const handleRegister = () => {
        // 간단한 유효성 검사
        if (!member.memId || !member.pwd || !member.memName || !member.email || !member.tel || !member.post || !member.addr1 || !member.addr2) {
            alert('모든 항목을 입력하세요.');
            return;
        }

        axios.post('/api/members/register', member)
            .then(response => {
                alert(response.data);
                onRegisterSuccess();
            })
            .catch(error => {
                console.error(error);
                alert('회원가입 중 오류가 발생했습니다.');
            });
    };

    const loadDaumPostcodeScript = () => {
        return new Promise((resolve) => {
            const script = document.createElement('script');
            script.src = "//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js";
            script.onload = resolve;
            document.body.appendChild(script);
        });
    };

    const handleDaumPost = async () => {
        if (!window.daum) {
            await loadDaumPostcodeScript();
        }

        new window.daum.Postcode({
            oncomplete: function(data) {
                let addr = '';
                if (data.userSelectedType === 'R') {
                    addr = data.roadAddress;
                } else {
                    addr = data.jibunAddress;
                }

                setMember(prevState => ({
                    ...prevState,
                    post: data.zonecode,
                    addr1: addr
                }));

                document.getElementById('addr2').focus();
            }
        }).open();
    };

    return (
        <div className="container" style={{marginBottom:'15px', margin:'15px'}}>
            <h2>회원가입</h2><br/>
            <form>
                <div class="row mb-3" style={{marginBottom:'15px'}}>
                <label class="col-sm-2 col-form-label col-form-label-sm">아이디</label>
                <div class="col-sm-10">
                <input type="text" name="memId" value={member.memId} onChange={handleChange}/>
                </div>
                </div>
                
                <div class="row mb-3" style={{marginBottom:'15px'}}>
                <label class="col-sm-2 col-form-label col-form-label-sm">비밀번호</label>
                <div class="col-sm-10">
                <input type="password" name="pwd" value={member.pwd} onChange={handleChange}/><br />
                </div>
                </div>

                <div class="row mb-3" style={{marginBottom:'15px'}}>
                <label class="col-sm-2 col-form-label col-form-label-sm">이름</label>
                <div class="col-sm-10">
                <input type="text" name="memName" value={member.memName} onChange={handleChange}/><br />
                </div>
                </div>

                <div class="row mb-3" style={{marginBottom:'15px'}}>
                <label class="col-sm-2 col-form-label col-form-label-sm">이메일</label>
                <div class="col-sm-10">
                <input type="email" name="email" value={member.email} onChange={handleChange}/><br />
                </div>
                </div>

                <div class="row mb-3" style={{marginBottom:'15px'}}>
                <label class="col-sm-2 col-form-label col-form-label-sm">전화번호</label>
                <div class="col-sm-10">
                <input type="tel" name="tel" value={member.tel} onChange={handleChange} /><br />
                </div>
                </div>

                <div class="row mb-3" style={{marginBottom:'15px'}}>
                <label class="col-sm-2 col-form-label col-form-label-sm">우편번호</label>
                <div class="col-sm-10">
                <input type="text" id="post" name="post" value={member.post} readOnly/>
                <button type="button" onClick={handleDaumPost} class="btn btn-secondary btn-sm" style={{marginLeft:'5px'}}>우편번호 찾기</button><br/>
                </div>
                </div>

                {/* <input type="button" onClick={handleDaumPost} value="우편번호 찾기" /><br /> */}

                <div class="row mb-3" style={{marginBottom:'15px'}}>
                <label class="col-sm-2 col-form-label col-form-label-sm">주소</label>
                <div class="col-sm-10">
                <input type="text" id="addr1" name="addr1" value={member.addr1} onChange={handleChange}/><br />
                </div>
                </div>

                <div class="row mb-3" style={{marginBottom:'15px'}}>
                <label class="col-sm-2 col-form-label col-form-label-sm">상세주소</label>
                <div class="col-sm-10">
                <input type="text" id="addr2" name="addr2" value={member.addr2} onChange={handleChange}/><br/>
                </div>
                </div>

                <div style={{marginBottom:'15px'}}>
                <button type="button" onClick={handleRegister} class="btn btn-primary btn-sm">회원가입하기</button>
                </div>

                <div style={{marginBottom:'15px'}}>
                <button class="btn btn-outline-secondary">
                <a href="/oauth2/authorization/google">
                    <img src="/images/login/google.png" alt="Google Login" style={{ width: '30px', height: '30px' }}/>
                    &nbsp;&nbsp;Google로 가입하기
                </a>
                </button><br/>
                </div>

                <div style={{marginBottom:'15px'}}>
                <button class="btn btn-outline-warning">
                <a href="/oauth2/authorization/kakao">
                    <img src="/images/login/kakao.png" alt="Kakao Login" style={{ width: '30px', height: '30px' }}/>
                    &nbsp;&nbsp;카카오로 가입하기
                </a>
                </button><br/>
                </div>

                <div style={{marginBottom:'15px'}}>
                <button class="btn btn-outline-success">
                <a href="/oauth2/authorization/naver">
                    <img src="/images/login/naver.png" alt="Naver Login" style={{ width: '30px', height: '30px' }}/>
                    &nbsp;&nbsp;네이버로 가입하기
                </a>
                </button>
                </div>

                {/* <button type="button" onClick={() => window.location.href = '/'}>돌아가기</button> */}
            </form>
        </div>
    );
};

export default RegisterPage;
