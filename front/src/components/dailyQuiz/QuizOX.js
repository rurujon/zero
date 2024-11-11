import React from 'react';
import "./QuizModal.css"
const QuizOX = ({setResult}) => {
    return (
    <div className='OX'>
        <div className='oxBox'>
            <div className='btn'>
                <qbutton onClick={()=> setResult("O")}>O</qbutton>
            </div>
            <div className='btn'>
                <qbutton onClick={()=> setResult("X")}>X</qbutton>
            </div>
                <span></span>
        </div>
    </div>
    );
};

export default QuizOX;
