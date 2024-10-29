import React from 'react';

const Paystep3 = ({setStep,requestPay}) => {

    const prestep = () =>{
        setStep(1)
    }

    return (
        <div>
            Paystep3
            <button onClick={requestPay}>결제하기1</button>
        </div>
    );
};

export default Paystep3;