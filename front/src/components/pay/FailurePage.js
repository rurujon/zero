import React from 'react';
import { useLocation } from 'react-router-dom';
import './SuccessFailurePage.css';

const FailurePage = () => {
  const location = useLocation();
  const { error, response } = location.state;

  return (
    <div className="failure-page">
      <h1 className="title">결제 실패</h1>
      <p className="info">실패 원인: <span className="highlight">{error}</span></p>
      <h2 className="subtitle">응답 정보:</h2>
      <ul className="response-list">
        <li><strong>성공 여부: </strong>{response.success ? '성공' : '실패'}</li>
        <li><strong>imp_uid: </strong>{response.imp_uid}</li>
        <li><strong>merchant_uid: </strong>{response.merchant_uid}</li>
        <li><strong>결제 방법: </strong>{response.pay_method}</li>
        <li><strong>PG 제공자: </strong>{response.pg_provider}</li>
        <li><strong>PG 타입: </strong>{response.pg_type}</li>
        <li><strong>오류 메시지: </strong>{response.error_msg}</li>
      </ul>
      <a href="http://localhost:3000/mainpage" className="back-btn">메인 페이지로 돌아가기</a>
    </div>
  );
};

export default FailurePage;
