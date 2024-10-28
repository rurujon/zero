import React, { useState } from 'react';

const Paystep1 = ({amountChange,setStep}) => {
    
    const [donateInput, setDonateInput] = useState(''); //input 상태
    const [selectedAmount, setSelectedAmount] = useState(null); // 라디오 버튼 선택 상태
    const nextstep = () =>{
        setStep(2)
    }
    
    const inputChange = (event) => {
        const value = event.target.value;
        setDonateInput(value); // 입력값 상태 업데이트
        amountChange(event); // 부모 컴포넌트의 상태 업데이트
        setSelectedAmount(null); // 선택된 라디오 버튼 값 업데이트
    };

    const radioChange = (event) => {
        const value = event.target.value;
        // 이미 선택된 라디오 버튼을 다시 클릭하면 체크 해제
        if (selectedAmount === value) {
            setSelectedAmount(null);
        } else {
            setSelectedAmount(value); // 선택된 라디오 버튼 값 업데이트
            setDonateInput(''); // 라디오 버튼 선택 시 입력값 초기화
            amountChange(event); // 부모 컴포넌트의 상태 업데이트
        }
    };
    const checkInput = donateInput !=='';
    const checkRadio = selectedAmount!==null;

    

    return (
        <>
            <div>
                <div>
                    <input 
                        type="radio" 
                        name="regular_7" 
                        value="20000" 
                        title="2만원"
                        id="2man"  
                        onChange={radioChange}  
                        disabled={checkInput}
                        
                    />
                    <label htmlFor="2man">2만원</label>
                </div>
                <div>
                    <input 
                        type="radio" 
                        name="regular_7" 
                        value="30000" 
                        title="3만원" 
                        id="3man" 
                        onChange={radioChange} 
                        disabled={checkInput}
                        
                    />
                    <label htmlFor="3man">3만원</label>
                </div>
                <div>
                    <input 
                        type="radio" 
                        name="regular_7" 
                        value="50000" 
                        title="5만원" 
                        id="5man" 
                        onChange={radioChange} 
                        disabled={checkInput}
                    />
                    <label htmlFor="5man">5만원</label>
                </div>
                <div>
                    <input 
                        type="radio" 
                        name="regular_7" 
                        value="100000" 
                        title="10만원" 
                        id="10man" 
                        onChange={radioChange} 
                        disabled={checkInput} // input에 값이 있으면 비활성화
                    />
                    <label htmlFor="10man">10만원</label>
                </div>
                <div>
                <input
                        type='number'
                        name="donateInput"
                        value={donateInput} // 입력값 상태 연결
                        onChange={inputChange}
                        disabled={checkRadio} // 라디오 버튼이 선택되면 비활성화
                    />
                    <label htmlFor="donateInput">입력</label>
                </div>
            </div>

            <button onClick={nextstep}>다음단계</button>
        </>
    );
};

export default Paystep1;