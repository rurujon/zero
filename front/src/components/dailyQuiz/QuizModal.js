import React,{useEffect, useState} from 'react';
import Modal from 'react-modal';
import './QuizModal.css';
import Quiz from './Quiz'
import QuizX from './QuizX';
import QuizO from './QuizO';
import QuizResult from './QuizResult';
Modal.setAppElement('#root');


const QuizModal = () => {

    

    const [isOpen, setIsOpen] = useState(false);

    //사용자의 O,X
    const [result, setResult] = useState("ON");

    const [explanation, setExplanation] = useState("null");
    //문제의 정답 O,X
    const [answer, setAnswer] = useState("null");


    return (
        <>
            <div>
                {answer} + {result}
            </div>

            <button onClick={()=> setIsOpen(true)}>모달 열기</button>
            <div className='bg'></div>
            
            <Modal 
                isOpen={isOpen}
                //onRequestClose = {() => setIsOpen(true)} 
                contentLabel = "QOX"
                className={result ==='ON' ? 'modal' : 'smallModal'}
            >
                

            {
                result === "ON" ? (
                    <Quiz setIsOpen={setIsOpen} setResult={setResult} setAnswer={setAnswer} setExplanation={setExplanation}/>
                    
                ) : <QuizResult setIsOpen={setIsOpen} answer={answer} result={result} explanation={explanation}/>
            }
            </Modal>
        </>
    );
};

export default QuizModal;