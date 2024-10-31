import React from 'react';
import axios from 'axios';
import './QuizModal.css';
// 퀴즈가 오답인경우
const QuizX = ({setIsOpen, explanation,member, result, quizId}) => {

// 문제 결과를 전송
const insertQH = async () => {
    alert(quizId)
    try{
        const response = await axios.post('http://localhost:8080/insertQH', {
            memId: member.memId,
            quizid: quizId,
            quizResult: "오답"
        });
        if(response) alert("정상")
    }catch(error){
        console.error('퀴즈 히스토리 입력 실패:', error.response ? error.response.data : error.message);
    }
    setIsOpen(false)
}

    return (
        <>
            <div>
                <button onClick={()=> insertQH()}className="close">나가기</button>
            </div>
            <div>
                {explanation}
            </div>

        </>
    );
};

export default QuizX;