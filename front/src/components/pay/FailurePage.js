import React from 'react';
import { useLocation } from 'react-router-dom';

const FailurePage = () => {
    const location = useLocation();
    const { error } = location.state;
    return (
        <div>
            <h1>결제 실패</h1>
            <p>실패 원인: {error}</p>
        </div>
    );
};

export default FailurePage;