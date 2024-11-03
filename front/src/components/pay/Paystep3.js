import React from 'react';

const Paystep3 = ({setStep,requestPay,amount,memberInfo}) => {

    const prestep = () =>{
        setStep(1)
    }

    return (
        <div>
            <div>
                <ul>
                    <di>{memberInfo.memId}</di>
                    <dl>{amount}</dl>
                    <dl>{memberInfo.email}</dl>
                    <dl>{memberInfo.tel}</dl>
                </ul>
                <button onClick={prestep}>이전단계</button>
            </div>
            <div>
                <button onClick={requestPay}>결제하기1</button>
            </div>
        </div>
    );
};

export default Paystep3;