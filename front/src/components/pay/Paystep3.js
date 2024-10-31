import React from 'react';

const Paystep3 = ({setStep,requestPay,amount,memberInfo}) => {

    const prestep = () =>{
        setStep(1)
    }

    return (
        <div>
                  <div>
        <ul>
          <dl>{amount}</dl>
          <dl>{memberInfo.email}</dl>
          <dl>{memberInfo.tel}</dl>
        </ul>
      </div>
            <button onClick={requestPay}>결제하기1</button>
        </div>
    );
};

export default Paystep3;