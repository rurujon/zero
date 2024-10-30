import React from 'react';
import QuizO from './QuizO';
import QuizX from './QuizX';

const QuizResult = ({setIsOpen, answer, result,explanation,member}) => {
    return (
        <>

            {
                answer===result ? <QuizO setIsOpen={setIsOpen} explanation={explanation} member={member}/>
                :
                <QuizX setIsOpen={setIsOpen} explanation={explanation} member={member}/>
            }
        </>
    );
};

export default QuizResult;