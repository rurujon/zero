import React from 'react';
import './Pay.css';

const Paystep3 = ({ setStep, requestPay, amount, memberInfo }) => {
    const prevStep = () => {
        setStep(2);
    };

    return (
        <div className="paystep-container">
            <div className="payment-info">
                <h3>결제 정보</h3>
                <ul>
                    <li>회원 ID: {memberInfo.memId}</li>
                    <li>후원금액: {amount} 원</li>
                    <li>이메일: {memberInfo.email}</li>
                    <li>전화번호: {memberInfo.tel}</li>
                </ul>
            </div>

            <button onClick={prevStep} className="prev-step-btn">이전단계</button>
            <button onClick={requestPay} className="pay-btn">결제하기</button>
        </div>
    );
};

export default Paystep3;
