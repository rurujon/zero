import React from 'react';
import './QuizModal.css';
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