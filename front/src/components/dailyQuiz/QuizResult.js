import React from 'react';
import QuizO from './QuizO';
import QuizX from './QuizX';

const QuizResult = ({setIsOpen, answer, result,explanation}) => {
    return (
        <>

            {
                answer===result ? <QuizO setIsOpen={setIsOpen} explanation={explanation}/>
                :
                <QuizX setIsOpen={setIsOpen} explanation={explanation}/>
            }
        </>
    );
};

export default QuizResult;