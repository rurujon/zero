import React from 'react';
import { useLocation } from 'react-router-dom';

const SuccessPage  = () => {

  const location = useLocation();
  const { amount, memberInfo } = location.state;

    return (
        <div>
        <h1>결제 성공</h1>
        <p>결제 금액: {amount} 원</p>
        <p>구매자 이름: {memberInfo.memName}</p>
        <p>이메일: {memberInfo.email}</p>
        <p>전화번호: {memberInfo.tel}</p>
        <p>주소: {memberInfo.addr1} {memberInfo.addr2}</p>
      </div>
    );
};

export default SuccessPage ;