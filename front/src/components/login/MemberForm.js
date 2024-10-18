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

    const [phoneNumber, setPhoneNumber] = useState('');
    const [verificationCode, setVerificationCode] = useState('');
    const [isVerified, setIsVerified] = useState(false);
    const [isPhoneVerificationRequired, setIsPhoneVerificationRequired] = useState(false);

    const checkDuplicateId = () => {
        if (!member.memId || member.memId.trim() === '') {
            alert('아이디를 입력해주세요.');
            return;
        }

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

        if (name === 'memId') {
            setIsChecked(false);
        }

        if (isEditing && name === 'pwd' && value.trim() === '') {
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
        if (!isEditing && !isVerified) {
            alert('휴대폰 인증을 완료해주세요.');
            return;
        }

        if (isEditing && isPhoneVerificationRequired && !isVerified) {
            alert('휴대폰 재인증을 완료해주세요.');
            return;
        }

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

        if (validateForm()) {
            const url = isEditing ? `/member/update/${member.memId}` : '/member/register';
            const data = {
                ...member,
                pwd: isEditing && !member.pwd ? undefined : member.pwd,
                tel: isPhoneVerificationRequired ? phoneNumber : member.tel
            };

            axios.post(url, member, { withCredentials: true })
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

    const handleSendVerification = () => {
        axios.post('/api/auth/send-verification', { phoneNumber }, { withCredentials: true })
            .then(() => alert('인증번호가 발송되었습니다.'))
            .catch(error => console.error('인증번호 발송 실패:', error));
    };

    const handleVerifyCode = () => {
        axios.post('/api/auth/verify-code', { phoneNumber, code: verificationCode })
            .then(response => {
                if (response.data.isValid) {
                    setIsVerified(true);
                    alert('인증이 완료되었습니다.');
                } else {
                    alert('인증번호가 올바르지 않습니다.');
                }
            })
            .catch(error => console.error('인증 실패:', error));
    };

    const handlePhoneReauthentication = () => {
        setIsPhoneVerificationRequired(true);
        setIsVerified(false);
        setPhoneNumber('');
        setVerificationCode('');
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
                    <label className="col-sm-2 col-form-label col-form-label-sm">핸드폰 번호</label>
                    <div className="col-sm-10">
                        <input type="tel" name="tel" className="form-control" value={isEditing && !isPhoneVerificationRequired ? member.tel : phoneNumber} placeholder=' (변경시에만 입력)' onChange={e => isPhoneVerificationRequired ? setPhoneNumber(e.target.value) : handleInputChange(e)} readOnly={isEditing && !isPhoneVerificationRequired} />
                        {isEditing && !isPhoneVerificationRequired && (
                            <button type="button" onClick={handlePhoneReauthentication} className="btn btn-secondary btn-sm mt-2">핸드폰 재인증</button>
                        )}
                        {(isPhoneVerificationRequired || !isEditing) && (
                            <button type="button" onClick={handleSendVerification} className="btn btn-secondary btn-sm mt-2">인증번호 발송</button>
                        )}
                    </div>
                </div>
                {(isPhoneVerificationRequired || !isEditing) && (
                    <div className="row mb-3">
                        <label className="col-sm-2 col-form-label col-form-label-sm">인증번호</label>
                        <div className="col-sm-10">
                            <input type="text" className="form-control" value={verificationCode} onChange={e => setVerificationCode(e.target.value)} />
                            <button type="button" onClick={handleVerifyCode} className="btn btn-secondary btn-sm mt-2">인증하기</button>
                        </div>
                    </div>
                )}

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
