import React from 'react';
import "./QuizModal.css"
const QuizOX = ({setResult}) => {
    return (
    <div className='OX'>
        <div className='oxBox'>
            <div className='btn'>
                <qbutton onClick={()=> setResult("O")}>
                    <h1>O</h1>
                </qbutton>
            </div>
            <div className='btn'>
                <qbutton onClick={()=> setResult("X")}><h1>X</h1></qbutton>
            </div>
                <span></span>
        </div>
    </div>
    );
};

export default QuizOX;
