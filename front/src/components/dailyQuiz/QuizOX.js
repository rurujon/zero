import React from 'react';

const QuizOX = ({setResult}) => {
    return (
    <div className='OX'>
        <div className='oxBox'>
            <div className='btn'>
                <button onClick={()=> setResult("O")}>O</button>
                <button onClick={()=> setResult("X")}>X</button>
            </div>
        </div>
    </div>
    );
};

export default QuizOX;