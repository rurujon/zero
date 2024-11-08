import React from 'react';
import { useNavigate } from 'react-router-dom'; // useNavigate import
import './Pay.css';

const Paystep3 = ({ setStep, requestPay, amount, memberInfo, isMember }) => {
    const navigate = useNavigate(); // navigate 훅을 사용해 페이지 이동

    const prevStep = () => {
        setStep(2);
    };

    const handlePayment = () => {
        if (isMember) {
            // 회원일 경우 결제 요청
            requestPay();
        } else {
            // 비회원일 경우 로그인 페이지로 리다이렉트
            navigate('/login'); // 로그인 페이지로 이동
        }
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
            <button onClick={handlePayment} className="pay-btn">
                {isMember ? '결제하기' : '로그인 후 결제'}
            </button>
        </div>
    );
};

export default Paystep3;
