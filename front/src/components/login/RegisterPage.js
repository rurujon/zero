import React, { useState } from 'react';
import axios from 'axios';
import '../assets/css/loginStyle.css'

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

        axios.post('/member/register', member)
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
        <div>
            <h2>회원가입</h2>
            <form>
                <input type="text" name="memId" placeholder="아이디" value={member.memId} onChange={handleChange}/><br />
                <input type="password" name="pwd" placeholder="비밀번호" value={member.pwd} onChange={handleChange}/><br />
                <input type="text" name="memName" placeholder="이름" value={member.memName} onChange={handleChange}/><br />
                <input type="email" name="email" placeholder="이메일" value={member.email} onChange={handleChange}/><br />
                <input type="tel" name="tel" placeholder="전화번호" value={member.tel} onChange={handleChange} /><br />
                <input type="text" id="post" name="post" placeholder="우편번호" value={member.post} readOnly/>
                <input type="button" onClick={handleDaumPost} value="우편번호 찾기" /><br />
                <input type="text" id="addr1" name="addr1" placeholder="주소" value={member.addr1} onChange={handleChange}/><br />
                <input type="text" id="addr2" name="addr2" placeholder="상세주소" value={member.addr2} onChange={handleChange}/><br/>
                <button type="button" onClick={handleRegister}>회원가입하기</button>
                <div>


            </div>

                {/* <button type="button" onClick={() => window.location.href = '/'}>돌아가기</button> */}
            </form>
        </div>
    );
};

export default RegisterPage;
