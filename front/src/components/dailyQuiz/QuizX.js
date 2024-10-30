import React from 'react';
import axios from 'axios';
import './QuizModal.css';
// 퀴즈가 오답인경우
const QuizX = ({setIsOpen, explanation}) => {



    return (
        <>
            <div>
                <button onClick={()=> setIsOpen(false)}className="close">나가기</button>
            </div>
            <div>
                {explanation}
            </div>

        </>
    );
};

export default QuizX;