import React, { useState } from 'react';

const Paystep1 = ({amountChange,setStep}) => {
    const nextstep = () =>{
        setStep(2)
    }
    
    const handleInputChange = (event) => {
        const value = event.target.value;
        setDonateInput(value); // 입력값 상태 업데이트
        amountChange(event); // 부모 컴포넌트의 상태 업데이트
    };

    const [donateInput, setDonateInput] = useState('');

    const checkInput = donateInput !=='';

    

    return (
        <>
            <div>
                <div>
                    <input type="radio" name="regular_7" value="20000" title="2만원" id="2man"  onChange={amountChange}  disabled={checkInput}/>
                    <label htmlFor="2man">2만원</label>
                </div>
                <div>
                    <input type="radio" name="regular_7" value="30000" title="3만원" id="3man" onChange={amountChange} disabled={checkInput}/>
                    <label htmlFor="3man">3만원</label>
                </div>
                <div>
                    <input type="radio" name="regular_7" value="50000" title="5만원" id="5man" onChange={amountChange} disabled={checkInput}/>
                    <label htmlFor="5man">5만원</label>
                </div>
                <div>
                    <input type="radio" name="regular_7" value="100000" title="10만원" id="10man" onChange={amountChange} disabled={checkInput}/>
                    <label htmlFor="10man">10만원</label>
                </div>
                <div>
                <input
                        type='number'
                        name="donateInput"
                        value={donateInput} // 입력값 상태 연결
                        onChange={handleInputChange}
                    />
                    <label htmlFor="donateInput">입력</label>
                </div>
            </div>

            <button onClick={nextstep}>다음단계</button>
        </>
    );
};

export default Paystep1;