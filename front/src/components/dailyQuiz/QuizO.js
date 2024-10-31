import React, { useState } from 'react';
import './QuizModal.css';
import axios from 'axios';
//퀴즈가 정답인 경우
const QuizO = ({setIsOpen, explanation, member, result, quizId}) => {


    //정답: 5포인트 상승
    const uppoint = async () => {
        try {
            const response = await axios.post('http://localhost:8080/api/point/update', {
                memId: member.memId,
                oper: '+',  // 또는 '-'
                updown: 5, // 추가하거나 차감할 포인트 수
                reason: '일일 퀴즈 정답' // 변경 사유
            });
            console.log('포인트 업데이트 성공:', response.data);

            await insertQH();

            setIsOpen(false)    //퀴즈 정답 후 모달 닫기
        } catch (error) {
            console.error('포인트 업데이트 실패:', error.response ? error.response.data : error.message);
        }
    };

    // 문제 결과를 전송
    const insertQH = async () => {
        alert(quizId)
        try{
            const response = await axios.post('http://localhost:8080/insertQH', {
                memId: member.memId,
                quizid: quizId,
                quizResult: "정답"
            });
            if(response) alert("정상")
        }catch(error){
            console.error('퀴즈 히스토리 입력 실패:', error.response ? error.response.data : error.message);
        }
    }

    return (
        <>
            <div className="expl">
                <div className="minimodal-headerr">
                    <fieldset style={{border:'none'}}>
                        <legend>정답입니다!</legend>
                        <fieldset>
                            <legend>해설</legend>
                            <h2>{explanation}</h2>
                    </fieldset>
                    </fieldset>
                </div>
                <div style={{width:'80%',display:'felx', justifyContent:'center', alignContent:'center'}}>
                    <button onClick={() => {uppoint()}} 
                className="point-button">포인트 받기</button>
                </div>
            </div>
        </>
    );
};

export default QuizO;