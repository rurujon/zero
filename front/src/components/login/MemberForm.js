import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { adjustWindowSize } from './utils/Sizing';
import ValidationMessage from './ValidationMessage';
import { validateField } from './utils/validating';

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
    const [errors, setErrors] = useState({});

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

    const [memId, setMemId] = useState('');
    const [isDuplicate, setIsDuplicate] = useState(false);
    const [isChecked, setIsChecked] = useState(false);


    const checkDuplicateId = () => {

        if (!member.memId || member.memId.trim() === '') {
            alert('아이디를 입력해주세요.');
            return; // 아이디가 없으면 함수 실행 중단
        }

        // member.memId를 사용해서 중복 체크 요청을 보냄
        axios.get('/member/check-id', { params: { memId: member.memId } })
            .then(response => {
                setIsDuplicate(response.data);
                setIsChecked(true);
            })
            .catch(error => {
                console.error('아이디 중복 체크 오류:', error);
            });
    };



    const validateForm = () => {
        const newErrors = {};
        Object.keys(member).forEach(key => {
            if (key !== 'pwd' && key !== 'pwdConfirm' && member[key].trim() === '') {
                newErrors[key] = '이 필드는 필수입니다.';
            } else if (key !== 'pwdConfirm' && key !== 'post' && key !== 'addr1' && key !== 'addr2') {
                if (isEditing && key === 'pwd' && member[key].trim() === '') {
                    // 수정 모드에서 비밀번호가 비어있으면 유효성 검사 건너뛰기
                    return;
                }
                const errorMessage = validateField(key, member[key]);
                if (errorMessage) {
                    newErrors[key] = errorMessage;
                }
            }
        });

        if (!isEditing && member.pwd !== member.pwdConfirm) {
            newErrors.pwdConfirm = '비밀번호가 일치하지 않습니다.';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setMember(prev => ({ ...prev, [name]: value }));

        // 아이디 입력시 체크 초기화
        if (name === 'memId') {
            setIsChecked(false);
        }

        if (isEditing && name === 'pwd' && value.trim() === '') {
            // 수정 모드에서 비밀번호 필드가 비어있으면 에러 메시지 제거
            setErrors(prev => ({ ...prev, pwd: undefined }));
        } else {
            const errorMessage = validateField(name, value);
            setErrors(prev => ({
                ...prev,
                [name]: errorMessage || undefined
            }));

            if (!isEditing && (name === 'pwd' || name === 'pwdConfirm')) {
                if (name === 'pwd' && member.pwdConfirm && value !== member.pwdConfirm) {
                    setErrors(prev => ({ ...prev, pwdConfirm: '비밀번호가 일치하지 않습니다.' }));
                } else if (name === 'pwdConfirm' && value !== member.pwd) {
                    setErrors(prev => ({ ...prev, pwdConfirm: '비밀번호가 일치하지 않습니다.' }));
                } else {
                    setErrors(prev => ({ ...prev, pwdConfirm: undefined }));
                }
            }
        }

        adjustWindowSize(window, { ...member, [name]: value }, true, []);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!isEditing) {
            if (!isChecked) {
                alert('아이디 중복 체크를 해주세요.');
                return;
            }
            if (isDuplicate) {
                alert('이미 사용 중인 아이디입니다.');
                return;
            }
        }

        // 아이디가 중복되지 않으면 회원가입 처리 로직 실행

        if (validateForm()) {
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
                    alert(error.response?.data || (isEditing ? '회원정보 수정 중 오류가 발생했습니다.' : '회원가입 중 오류가 발생했습니다.'));
                });
        }
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
            <form onSubmit={handleSubmit}>
                <div className="row mb-3">
                    <label className="col-sm-2 col-form-label col-form-label-sm">아이디</label>
                    <div className="col-sm-10">
                        <input type="text" name="memId" className="form-control" value={member.memId || ''} onChange={handleInputChange} readOnly={isEditing} required />
                        {!isEditing && (<input type="button" onClick={checkDuplicateId} className="btn btn-primary btn-sm mt-2" value="중복 확인" />)}
                        {isChecked && (
                        <div>
                            {isDuplicate ? (
                                <span style={{ color: 'red' }}>이미 사용 중인 아이디입니다.</span>
                            ) : (
                                <span style={{ color: 'green' }}>사용 가능한 아이디입니다.</span>
                            )}
                        </div>
                    )}
                        <ValidationMessage message={errors.memId} />
                    </div>
                </div>

                <div className="row mb-3">
                    <label className="col-sm-2 col-form-label col-form-label-sm">비밀번호</label>
                    <div className="col-sm-10">
                        <input type="password" name="pwd" className="form-control" placeholder={isEditing ? "비밀번호 (변경시에만 입력)" : "비밀번호"} value={member.pwd || ''} onChange={handleInputChange} required={!isEditing} />
                        <ValidationMessage message={errors.pwd} />
                    </div>
                </div>

                {!isEditing && (
                    <div className="row mb-3">
                        <label className="col-sm-2 col-form-label col-form-label-sm">비밀번호 재확인</label>
                        <div className="col-sm-10">
                            <input type="password" name="pwdConfirm" className="form-control" placeholder="비밀번호 재확인" value={member.pwdConfirm || ''} onChange={handleInputChange} required />
                            <ValidationMessage message={errors.pwdConfirm} />
                        </div>
                    </div>
                )}

                <div className="row mb-3">
                    <label className="col-sm-2 col-form-label col-form-label-sm">이름</label>
                    <div className="col-sm-10">
                        <input type="text" name="memName" className="form-control" value={member.memName || ''} onChange={handleInputChange} required />
                        <ValidationMessage message={errors.memName} />
                    </div>
                </div>

                <div className="row mb-3">
                    <label className="col-sm-2 col-form-label col-form-label-sm">이메일</label>
                    <div className="col-sm-10">
                        <input type="email" name="email" className="form-control" value={member.email || ''} onChange={handleInputChange} required />
                        <ValidationMessage message={errors.email} />
                    </div>
                </div>

                <div className="row mb-3">
                    <label className="col-sm-2 col-form-label col-form-label-sm">전화번호</label>
                    <div className="col-sm-10">
                        <input type="tel" name="tel" className="form-control" value={member.tel || ''} onChange={handleInputChange} required />
                        <ValidationMessage message={errors.tel} />
                    </div>
                </div>

                <div className="row mb-3">
                    <label className="col-sm-2 col-form-label col-form-label-sm">우편번호</label>
                    <div className="col-sm-10">
                        <input type="text" id="post" name="post" className="form-control" value={member.post || ''} onChange={handleInputChange} readOnly required />
                        <input type="button" onClick={handleDaumPost} className="btn btn-secondary btn-sm mt-2" value="우편번호 찾기" />
                    </div>
                </div>

                <div className="row mb-3">
                    <label className="col-sm-2 col-form-label col-form-label-sm">주소</label>
                    <div className="col-sm-10">
                        <input type="text" id="addr1" name="addr1" className="form-control" value={member.addr1 || ''} onChange={handleInputChange} required />
                    </div>
                </div>

                <div className="row mb-3">
                    <label className="col-sm-2 col-form-label col-form-label-sm">상세주소</label>
                    <div className="col-sm-10">
                        <input type="text" id="addr2" name="addr2" className="form-control" value={member.addr2 || ''} onChange={handleInputChange} required />
                    </div>
                </div>

                <div className="mt-3">
                    <button type="submit" className="btn btn-primary btn-sm" style={{marginBottom:'20px'}}>{isEditing ? '수정완료' : '입력완료'}</button>&nbsp;
                    <button type="button" className="btn btn-outline-primary btn-sm" onClick={onCancel} style={{marginBottom:'20px'}}>{isEditing ? '수정취소' : '가입취소'}</button>
                </div>
            </form>
        </div>
    );
};

export default MemberForm;