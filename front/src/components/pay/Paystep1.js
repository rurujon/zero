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
            <div className="amount-select">
                <input 
                    type="radio" 
                    name="donationAmount" 
                    value="20000" 
                    onChange={radioChange} 
                    disabled={donateInput !== ''} 
                />
                <label>2만원</label>

                <input 
                    type="radio" 
                    name="donationAmount" 
                    value="30000" 
                    onChange={radioChange} 
                    disabled={donateInput !== ''} 
                />
                <label>3만원</label>

                <input 
                    type="radio" 
                    name="donationAmount" 
                    value="50000" 
                    onChange={radioChange} 
                    disabled={donateInput !== ''} 
                />
                <label>5만원</label>

                <input 
                    type="radio" 
                    name="donationAmount" 
                    value="100000" 
                    onChange={radioChange} 
                    disabled={donateInput !== ''} 
                />
                <label>10만원</label>

                <input 
                    type="number" 
                    value={donateInput} 
                    onChange={inputChange} 
                    disabled={selectedAmount !== null} 
                    placeholder="직접 입력"
                />
            </div>

            <button onClick={nextStep} className="next-step-btn">다음단계</button>
        </div>
    );
};

export default Paystep1;
