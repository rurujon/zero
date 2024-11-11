import React from 'react';
import "./QuizModal.css"
const QuizOX = ({setResult}) => {
    return (
    <div className='OX'>
        <div className='oxBox'>
            <div className='btn'>
                <button onClick={()=> setResult("O")}>O</button>
            </div>
            <div className='btn'>
                <button onClick={()=> setResult("X")}>X</button>
            </div>
                <span></span>
        </div>
    </div>
    );
};

export default QuizOX;