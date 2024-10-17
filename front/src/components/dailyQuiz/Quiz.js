import React, { useState } from 'react';
import Modal from 'react-modal';
import QuizOX from './QuizOX';
import QuizItem from './QuizItem';
const Quiz = ({isOpen, setIsOpen, result, setResult, setAnswer}) => {

    const [quiz, setQuiz] = useState(null);


    

    return (
        <>

            <div>
                <button onClick={()=> setIsOpen(false)}className="close">나가기</button>
            </div>

            <QuizItem setQuiz={setQuiz} quiz={quiz}  setAnswer={setAnswer}/>

            <QuizOX setResult={setResult}/>   
                         
        </>
    );
};

export default Quiz;