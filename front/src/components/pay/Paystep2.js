import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Pay.css';

const Paystep2 = ({ setStep, memberInfo, setMemberInfo }) => {
    const [isMember, setIsMember] = useState(false);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setMemberInfo(prevState => ({ ...prevState, [name]: value }));
    };

    const nextStep = () => {
        setStep(3);
    };

    const prevStep = () => {
        setStep(1);
    };

    const getUserInfo = () => {
        axios.get('/member/info')
            .then(response => {
                if(response && response.data) setMemberInfo(response.data);
                setIsMember(true);
            })
            .catch(error => {
                console.error('회원 정보 조회 실패: ', error);
            });
    };

    useEffect(() => {
        getUserInfo();
    }, []);

    return ( 
        <div className="paystep-container">
            <label>회원 구분</label>
            <hr />
            <div className="input-group">
                <div className="member-type-group">
                    <input 
                        type="radio" 
                        name="memberType" 
                        value="회원" 
                        checked={isMember} 
                        disabled 
                    />
                    <label>회원</label>
                    <input 
                        type="radio" 
                        name="memberType" 
                        value="비회원" 
                        checked={!isMember} 
                        disabled 
                    />
                    <label>비회원</label>
                </div>
            </div>

            <div className="input-group">
                <label>후원자 이름</label>
                <input 
                    type="text" 
                    name="memName" 
                    value={memberInfo.memName} 
                    onChange={handleChange} 
                    placeholder="이름" 
                />
            </div>

            <div className="input-group">
                <label>전화번호</label>
                <input 
                    type="text" 
                    value={memberInfo.tel} 
                    onChange={(e) => setMemberInfo({ ...memberInfo, tel: e.target.value })} 
                />
            </div>

            <div className="input-group">
                <label>이메일</label>
                <input 
                    type="text" 
                    value={memberInfo.email} 
                    onChange={(e) => setMemberInfo({ ...memberInfo, email: e.target.value })} 
                />
            </div>

            <button onClick={prevStep} className="prev-step-btn">이전단계</button>
            <button onClick={nextStep} className="next-step-btn">다음단계</button>
        </div>
    );
};

export default Paystep2;
