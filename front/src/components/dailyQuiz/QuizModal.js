import React,{useCallback, useContext, useEffect, useState} from 'react';
import Modal from 'react-modal';
import './QuizModal.css';
import Quiz from './Quiz'
import QuizResult from './QuizResult';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../login/context/AuthContext';
import { adjustWindowSize } from '../login/utils/Sizing';
Modal.setAppElement('#root');


const QuizModal = ({isOpen, setIsOpen}) => {
    const [member, setMember] = useState(null);

    const {token} = useContext(AuthContext);

    const fetchMemberInfo = useCallback(() => {
        axios.get('/member/info', {
            headers: { Authorization: `Bearer ${token}` }
        })
            .then(response => {
                setMember(response.data);
                adjustWindowSize(window, response.data);
            })
            .catch(error => {
                console.error('회원 정보 조회 실패:', error);
            });
    }, [token]);

    useEffect(() => {
        if (token) {
            fetchMemberInfo();
        }
    }, [fetchMemberInfo, token]);

    const navigate = useNavigate(); // navigate 훅 추가

    //사용자의 O,X
    const [result, setResult] = useState("ON");

    const [explanation, setExplanation] = useState("null");
    //문제의 정답 O,X
    const [answer, setAnswer] = useState("null");

    useEffect(() => {
        // 모달이 열릴 때 memId가 없으면 로그인 페이지로 이동
        if (isOpen && !member) {
            alert("로그인 한 사용자만 일일퀴즈가 가능합니다!");
            navigate("/login");
            setIsOpen(false); // 모달 닫기
        }
    }, [isOpen, member, navigate, setIsOpen]);



    
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
                    
                ) : <QuizResult setIsOpen={setIsOpen} answer={answer} result={result} explanation={explanation} member={member}/>
            }
            </Modal>
        </>
    );
};

export default QuizModal;