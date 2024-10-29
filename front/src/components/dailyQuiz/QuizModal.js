import React,{useEffect, useState} from 'react';
import Modal from 'react-modal';
import './QuizModal.css';
import Quiz from './Quiz'
import QuizResult from './QuizResult';
import axios from 'axios';
Modal.setAppElement('#root');


const QuizModal = ({isOpen, setIsOpen}) => {

    const [memId, setMemId] = useState('');
    const [pwd, setPwd] = useState('');


    //사용자의 O,X
    const [result, setResult] = useState("ON");

    const [explanation, setExplanation] = useState("null");
    //문제의 정답 O,X
    const [answer, setAnswer] = useState("null");

    const modalOn = () => {
        axios.post('/member/login', null, {
            params: { memId, pwd }
        })
        .then(response => {
            if (response.data.upPoint === "1") {
                console.log("금일 최초 로그인")
            }
        })
        .catch(error => {
            console.error("오류오류", error)
        })
    }

    return (
        <>
            {/* <div>
                {answer} + {result}
            </div> */}

            <button onClick={()=> setIsOpen(true)}>모달 열기</button>
            <div className='bg'></div>
            
            <Modal 
                isOpen={isOpen}
                onRequestClose={setIsOpen} // 모달 닫기 
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