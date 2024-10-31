import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import QuizOX from './QuizOX';
import QuizItem from './QuizItem';
const Quiz = ({ setIsOpen,  setResult, setAnswer, setExplanation, setQuizId}) => {

    const [quiz, setQuiz] = useState(null);
    
    useEffect(()=> {
        if(quiz){
            alert(quiz.id)
            setQuizId(quiz.id)
            setAnswer(quiz.answer)
        
            setExplanation(quiz.explanation)
        }
    },[quiz, setAnswer, setExplanation,setQuizId])
    

    return (
        <>

            <div>
                <button onClick={()=> setIsOpen(false)}className="close">나가기</button>
            </div>

            <QuizItem setQuiz={setQuiz} quiz={quiz}/>
            <QuizOX setResult={setResult}/>   
                         
        </>
    );
};

export default Quiz;