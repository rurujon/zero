import React from 'react';
import { useLocation } from 'react-router-dom';
import './SuccessFailurePage.css';

const SuccessPage = () => {
  const location = useLocation();
  const { amount, memberInfo, response } = location.state;

  return (
    <div className="success-page">
      <h1 className="title">결제 성공</h1>
      <p className="info">결제 금액: <span className="highlight">{amount} 원</span></p>
      <p className="info">구매자 아이디: <span className="highlight">{memberInfo.memId}</span></p>
      <p className="info">구매자 이름: <span className="highlight">{memberInfo.memName}</span></p>
      <p className="info">이메일: <span className="highlight">{memberInfo.email}</span></p>
      <p className="info">전화번호: <span className="highlight">{memberInfo.tel}</span></p>
      <p className="info">주소: <span className="highlight">{memberInfo.addr1} {memberInfo.addr2}</span></p>
      <p className="response-message">{response}</p>
      <a href="http://localhost:3000/mainpage" className="back-btn">메인 페이지로 돌아가기</a>
    </div>
  );
};

export default SuccessPage;
