import axios from 'axios';
import React, { useEffect } from 'react';

const QuizItem = ({setQuiz, quiz}) => {

    useEffect(()=> {
        //boot호출
        axios.get('http://localhost:8080/getQuiz')
        .then(response => {

            // quiz가 로딩된 후 answer을 설정
            if (response.data) {
                setQuiz(response.data);
                console.log('response.data넘어옴 ----------------'+response.data);
                
            }
        })
        .catch(error => {
            console.error("데이터 없음 ㅋㅋ", error);
        })
    },[setQuiz])

    return (
        <div className='Quiz'>
                <div className='box'>
                    {/* <span className='span'>오늘의 O,X퀴즈</span> */}
                    <span style={{paddingTop:'30px', marginBottom:'0%'}}>
                        <p style={{fontSize: '50px',}}>Q.</p>
                    </span>
                    <span className='span'>
                        {quiz ? ( // quiz가 null이 아닐 때만 렌더링ㄴ
                            <span>
                            
                            <h4 key={quiz.id}>{quiz.question}</h4>
                            </span>
                        ) : (
                            <h4>퀴즈를 불러오는 중입니다...</h4> // 로딩 메시지 또는 기본 메시지
                        )}
                    </span>
                    </div>
            </div>
    );
};

export default QuizItem;