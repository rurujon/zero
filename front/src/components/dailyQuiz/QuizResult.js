import React from 'react';
import QuizO from './QuizO';
import QuizX from './QuizX';

const QuizResult = ({setIsOpen, answer, result}) => {
    return (
        <>
            <div>
                <button onClick={()=> setIsOpen(false)}className="close">나가기</button>
            </div>
            {
                answer===result ? <QuizO/>
                :
                <QuizX/>
            }
        </>
    );
};

export default QuizResult;