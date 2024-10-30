import React,{useEffect, useState} from 'react';
import Modal from 'react-modal';
import './QuizModal.css';
import Quiz from './Quiz'
import QuizResult from './QuizResult';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
Modal.setAppElement('#root');


const QuizModal = ({isOpen, setIsOpen}) => {
    const [memId, setMemId] = useState(localStorage.getItem('memId')); // localStorage에서 memId 가져오기
    const navigate = useNavigate(); // navigate 훅 추가

    //사용자의 O,X
    const [result, setResult] = useState("ON");

    const [explanation, setExplanation] = useState("null");
    //문제의 정답 O,X
    const [answer, setAnswer] = useState("null");

    useEffect(() => {
        // memId가 없으면 로그인 페이지로 이동
        //alert 두번 뜸 (-)
        if (!memId) {
             
            alert("로그인 한 사용자만 일일퀴즈 가능합니다!");       
            navigate("/login");
        }
    }, [memId, navigate]);



    
    return (
        <>
            {/* <div>
                {answer} + {result}
            </div> */}

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