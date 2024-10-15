import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { adjustWindowSize } from './utils';

const MemberForm = ({ initialData, onSubmit, onCancel, isEditing }) => {
    const [member, setMember] = useState({
        memId: '',
        pwd: '',
        pwdConfirm: '',
        memName: '',
        email: '',
        tel: '',
        post: '',
        addr1: '',
        addr2: ''
    });

    useEffect(() => {
        if (initialData) {
            setMember(prevState => ({
                ...prevState,
                ...initialData,
                pwd: '',
                pwdConfirm: ''
            }));
            adjustWindowSize(window, initialData, true, []);
        }
    }, [initialData]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setMember(prevState => ({
            ...prevState,
            [name]: value
        }));

        // 비밀번호와 비밀번호 재확인 길이 검증
        if (name === 'pwdConfirm') {
            if (value.length > 0 && value.length === member.pwd.length && value !== member.pwd) {
                alert('비밀번호가 일치하지 않습니다.');
            }
        }

        adjustWindowSize(window, { ...member, [name]: value }, true, []);
    };

    const handleSubmit = () => {
        if (!member.memId || (!isEditing && !member.pwd) || !member.memName || !member.email || !member.tel || !member.post || !member.addr1 || !member.addr2) {
            alert('모든 항목을 입력하세요.');
            return;
        }

        // 비밀번호가 비어있지 않고, 재확인도 비어있지 않으며 길이가 동일한 경우에만 확인
        if (!isEditing && member.pwd !== member.pwdConfirm) {
            alert('비밀번호가 일치하지 않습니다.');
            return;  // 비밀번호가 일치하지 않을 경우 제출 중지
        }

        const url = isEditing ? `/member/update/${member.memId}` : '/member/register';
        const data = isEditing && !member.pwd ? { ...member, pwd: undefined } : member;

        axios.post(url, data, { withCredentials: true })
            .then(response => {
                console.log(response);
                alert(isEditing ? '회원정보가 수정되었습니다.' : '회원가입이 완료되었습니다.');
                onSubmit();
            })
            .catch(error => {
                console.error('Error:', error.response);
                alert(isEditing ? '회원정보 수정 중 오류가 발생했습니다.' : '회원가입 중 오류가 발생했습니다.');
            });
    };

    const handleDaumPost = async () => {
        if (!window.daum) {
            await new Promise((resolve) => {
                const script = document.createElement('script');
                script.src = "//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js";
                script.onload = resolve;
                document.body.appendChild(script);
            });
        }

        new window.daum.Postcode({
            oncomplete: function(data) {
                setMember(prevState => ({
                    ...prevState,
                    post: data.zonecode,
                    addr1: data.address
                }));
                adjustWindowSize(window, { ...member, post: data.zonecode, addr1: data.address }, true, []);
            }
        }).open();
    };

    return (
        <div className="container" style={{ marginBottom: '15px', margin: '15px' }}>
            <h2>{isEditing ? '회원정보 수정' : '회원가입'}</h2><br/>
            <form onSubmit={(e) => { e.preventDefault(); handleSubmit(); }}>
                <div className="row mb-3">
                    <label className="col-sm-2 col-form-label col-form-label-sm">아이디</label>
                    <div className="col-sm-10">
                        <input type="text" name="memId" className="form-control" value={member.memId || ''} onChange={handleChange} readOnly={isEditing} />
                    </div>
                </div>

                {/* 비밀번호 입력란 */}
                <div className="row mb-3">
                    <label className="col-sm-2 col-form-label col-form-label-sm">비밀번호</label>
                    <div className="col-sm-10">
                        <input type="password" name="pwd" className="form-control" placeholder={isEditing ? "비밀번호 (변경시에만 입력)" : "비밀번호"} value={member.pwd || ''} onChange={handleChange} />
                    </div>
                </div>

                {/* 비밀번호 재확인 입력란 */}
                {!isEditing && (
                    <div className="row mb-3">
                        <label className="col-sm-2 col-form-label col-form-label-sm">비밀번호 재확인</label>
                        <div className="col-sm-10">
                            <input type="password" name="pwdConfirm" className="form-control" placeholder="비밀번호 재확인" value={member.pwdConfirm || ''} onChange={handleChange} />
                        </div>
                    </div>
                )}

                {/* 나머지 입력란 */}
                <div className="row mb-3">
                    <label className="col-sm-2 col-form-label col-form-label-sm">이름</label>
                    <div className="col-sm-10">
                        <input type="text" name="memName" className="form-control" value={member.memName || ''} onChange={handleChange} />
                    </div>
                </div>

                <div className="row mb-3">
                    <label className="col-sm-2 col-form-label col-form-label-sm">이메일</label>
                    <div className="col-sm-10">
                        <input type="email" name="email" className="form-control" value={member.email || ''} onChange={handleChange} />
                    </div>
                </div>

                <div className="row mb-3">
                    <label className="col-sm-2 col-form-label col-form-label-sm">전화번호</label>
                    <div className="col-sm-10">
                        <input type="tel" name="tel" className="form-control" value={member.tel || ''} onChange={handleChange} />
                    </div>
                </div>

                <div className="row mb-3">
                    <label className="col-sm-2 col-form-label col-form-label-sm">우편번호</label>
                    <div className="col-sm-10">
                        <input type="text" id="post" name="post" className="form-control" value={member.post || ''} onChange={handleChange} readOnly />
                        <input type="button" onClick={handleDaumPost} className="btn btn-secondary btn-sm mt-2" value="우편번호 찾기" />
                    </div>
                </div>

                <div className="row mb-3">
                    <label className="col-sm-2 col-form-label col-form-label-sm">주소</label>
                    <div className="col-sm-10">
                        <input type="text" id="addr1" name="addr1" className="form-control" value={member.addr1 || ''} onChange={handleChange} />
                    </div>
                </div>

                <div className="row mb-3">
                    <label className="col-sm-2 col-form-label col-form-label-sm">상세주소</label>
                    <div className="col-sm-10">
                        <input type="text" id="addr2" name="addr2" className="form-control" value={member.addr2 || ''} onChange={handleChange} />
                    </div>
                </div>

                <div className="mt-3">
                    <button type="button" className="btn btn-primary btn-sm" onClick={handleSubmit} style={{marginBottom:'20px'}}>{isEditing ? '수정완료' : '입력완료'}</button>&nbsp;
                    <button type="button" className="btn btn-outline-primary btn-sm" onClick={onCancel} style={{marginBottom:'20px'}}>{isEditing ? '수정취소' : '가입취소'}</button>
                </div>
            </form>
        </div>
    );
};

export default MemberForm;
