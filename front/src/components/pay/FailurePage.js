import React from 'react';
import { useLocation } from 'react-router-dom';

const FailurePage = () => {
    const location = useLocation();
    const { error,response } = location.state;
    return (
        <div>
            <h1>결제 실패</h1>
            <p>실패 원인: {error}</p>
            <h2>응답 정보:</h2>
            <ul>
                <li>성공 여부: {response.success ? '성공' : '실패'}</li>
                <li>imp_uid: {response.imp_uid}</li>
                <li>merchant_uid: {response.merchant_uid}</li>
                <li>결제 방법: {response.pay_method}</li>
                <li>PG 제공자: {response.pg_provider}</li>
                <li>PG 타입: {response.pg_type}</li>
                <li>오류 메시지: {response.error_msg}</li>
            </ul>
        </div>
    );
};

export default FailurePage;