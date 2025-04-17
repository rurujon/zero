import React from 'react';
import QuizO from './QuizO';
import QuizX from './QuizX';

const QuizResult = ({setIsOpen, answer, result,explanation,member, quizId}) => {
    console.log("answer"+answer + " result" + result )
    return (
        <>
            {
                answer===result ? <QuizO answer={answer}setIsOpen={setIsOpen} explanation={explanation} member={member} result={result} quizId={quizId}/>
                :
                <QuizX answer={answer} setIsOpen={setIsOpen} explanation={explanation} member={member} result={result} quizId={quizId}/>
            }
        </>
    );
};

export default QuizResult;