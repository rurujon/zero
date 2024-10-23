import React,{useEffect, useState} from 'react';
import Modal from 'react-modal';
import './QuizModal.css';
import Quiz from './Quiz'
import QuizResult from './QuizResult';
import axios from 'axios';
Modal.setAppElement('#root');


const QuizModal = () => {

    const [memId, setMemId] = useState('');
    const [pwd, setPwd] = useState('');

    const [isOpen, setIsOpen] = useState(false);

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
            console.log(response.data + "왜 안나아오아와옹와ㅗㅇ");  // 서버 응답 확인
            if (response.data.upPoint === "1") {
                setIsOpen(true);
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

            {/* <button onClick={()=> setIsOpen(true)}>모달 열기</button> */}
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