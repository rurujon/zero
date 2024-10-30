import React, { useState } from 'react';
import './QuizModal.css';
import axios from 'axios';
//퀴즈가 정답인 경우
const QuizO = ({setIsOpen, explanation}) => {
    const [memId, setMemId] = useState(localStorage.getItem('memId'));

    const uppoint = async (e) => {
        e.preventDefault(); // 기본 폼 제출 방지

        try {
            // 서버에 포인트 업데이트 요청 전송
            const response = await axios.post("/update", { memId }); // memId를 요청 데이터로 전달

            // 서버 응답 성공 시
            if (response.status === 200) {
                console.log("포인트가 성공적으로 업데이트되었습니다.");
                alert("포인트가 부여되었습니다.");
            }
        } catch (error) {
            // 오류 발생 시
            console.error('포인트 부여 오류', error);
            alert('포인트 부여 중 오류가 발생했습니다.');
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