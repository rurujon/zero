import React,{useState} from 'react';
import Modal from 'react-modal';
import './QuizModal.css'

Modal.setAppElement('#root');





const QuizPopup = () => {

    

    const [isOpen, setIsOpen] = useState(false);

    const [result, setResult] = useState("N");

    return (
        <>
            <button onClick={()=> setIsOpen(true)}>모달 열기</button>
                <div className='bg'></div>
                    <Modal 
                        isOpen={isOpen}
                        //onRequestClose = {() => setIsOpen(true)} 
                        contentLabel = "예제 모달"
                        // className='ReactModal__Content'
                        className='modal'
                    >

                        <div>
                            <button onClick={()=> setIsOpen(false)}className="close" >나가기</button>
                        </div>

                        <div className='Quiz'>
                            <div className='box'>
                                <span className='span'>오늘의 O,X퀴즈</span>
                             </div>
                        </div>

                        <div className='OX'>
                            <div className='oxBox'>
                                <div className='btn'>
                                    <button onClick={()=> setResult("O")}>O</button>
                                    <button onClick={()=> setResult("X")}>X</button>
                                </div>
                            </div>
                        </div>
                        
                    </Modal>
        </>
    );
};

export default QuizPopup;