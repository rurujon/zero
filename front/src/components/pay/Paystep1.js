import React, { useState } from 'react';
import './Pay.css';

const Paystep1 = ({ amountChange, setStep }) => {
    const [donateInput, setDonateInput] = useState('');
    const [selectedAmount, setSelectedAmount] = useState(null);

    const nextStep = () => {
        setStep(2);
    };

    const inputChange = (event) => {
        const value = event.target.value;
        setDonateInput(value);
        amountChange(event); 
        setSelectedAmount(null); 
    };

    const radioChange = (event) => {
        const value = event.target.value;
        setSelectedAmount(value);
        setDonateInput('');
        amountChange(event); 
    };

    return (
        <div className="paystep-container">
            <fieldset>
           <legend> <label>후원 금액</label></legend>
            <div className="amount-select">
                <input 
                    type="radio" 
                    name="donationAmount" 
                    value="20000" 
                    id="20000"
                    onChange={radioChange} 
                    disabled={donateInput !== ''} 
                    
                />
                <label for="20000">2만원</label>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <input 
                    type="radio" 
                    name="donationAmount" 
                    value="30000"
                    id="30000" 
                    onChange={radioChange} 
                    disabled={donateInput !== ''} 
                    
                />
                <label for="30000">3만원</label>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <input 
                    type="radio" 
                    name="donationAmount" 
                    value="50000" 
                    id="50000"
                    onChange={radioChange} 
                    disabled={donateInput !== ''} 
                />
                <label for="50000">5만원</label>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <input 
                    type="radio" 
                    name="donationAmount" 
                    value="100000" 
                    id="100000"
                    onChange={radioChange} 
                    disabled={donateInput !== ''} 
                />
                <label for="100000">10만원</label>
        <br/>
                <input 
                    type="number" 
                    value={donateInput} 
                    onChange={inputChange} 
                    disabled={selectedAmount !== null} 
                    placeholder="직접 입력(최소100원)"
                />
            </div>
            </fieldset>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<button onClick={nextStep} className="next-step-btn">다음단계</button>
        </div>
    );
};

export default Paystep1;
