import React, { useState } from 'react';
import './QuizModal.css';
import axios from 'axios';
//퀴즈가 정답인 경우
const QuizO = ({setIsOpen, explanation, member}) => {


    const uppoint = async () => {
        try {
            const response = await axios.post('http://localhost:8080/api/point/update', {
                memId: member.memId,
                oper: '+',  // 또는 '-'
                updown: 5, // 추가하거나 차감할 포인트 수
                reason: '일일 퀴즈 정답' // 변경 사유
            });
            console.log('포인트 업데이트 성공:', response.data);
            setIsOpen(false)
        } catch (error) {
            console.error('포인트 업데이트 실패:', error.response ? error.response.data : error.message);
        }
    };

    return (
        <>
            <div>
            <p>정답입니다!</p>
                {/* 포인트 부여 버튼 */}
                <button onClick={uppoint} className="point-button">포인트 받기</button>
                {/* 모달 닫기 버튼 */}
                <button onClick={() => setIsOpen(false)} className="close">나가기</button>
            </div>
            <div>
                {/* 정답 설명 */}
                <p>{explanation}</p>
            </div>
        </>
    );
};

export default QuizO;