import React, { useEffect, useState } from "react";
import Paystep1 from "./Paystep1";
import Paystep2 from "./Paystep2";
import Paystep3 from "./Paystep3";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import './Pay.css';

const Pay = () => {
  const [amount, setAmount] = useState("");
  const [step, setStep] = useState(1); 
  const navigate = useNavigate();

  const amountChange = (event) => {
    setAmount(event.target.value); 
  };

  const [memId] = useState(localStorage.getItem('memId'));
  const [memberInfo, setMemberInfo] = useState({
    memId: memId,
    memName: '',
    email: '',
    tel: '',
    post: '',
    addr1: '',
    addr2: ''
  });

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://cdn.iamport.kr/v1/iamport.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const requestPay = () => {
    const { IMP } = window;
    IMP.init("imp51775781"); 
    
    const now = new Date();
    const createdAt = now.toISOString().replace("Z", "");
    const merchantUid = `order_${createdAt.replace(/[-:.TZ]/g, "")}`;
    
    IMP.request_pay(
      {
        pg: "html5_inicis",
        pay_method: "card",
        merchant_uid: merchantUid,
        name: `후원금`,
        amount: amount,
        buyer_email: memberInfo.email,
        buyer_name: memberInfo.memName,
        buyer_tel: memberInfo.tel,
        buyer_addr: `${memberInfo.addr1} ${memberInfo.addr2}`,
        buyer_postcode: memberInfo.post,
      },
      async function (response) {
          const paymentData = {
              orderId: response.imp_uid,
              pgTid: response.merchant_uid,
              paymentMethod: 'card',
              amount: amount,
              buyerId: memberInfo.memId,
              memName: memberInfo.memName,
              buyerEmail: memberInfo.email,
              buyerTel: memberInfo.tel,
              status: response.success ? '성공' : '실패',
              failReason: response.error_msg,
          };

          if (response.success) {
              await axios.post('/payment/paymentHistory', paymentData);
              navigate('/success', { state: { amount, memberInfo, response } });
          } else {
              await axios.post('/payment/paymentHistory', paymentData);
              navigate('/failure', { state: { error: response.error_msg, response } });
          }
      }
    );
  };

  const renderStep = () => {
    if (step === 1) {
        return <Paystep1 amountChange={amountChange} setStep={setStep} />;
    } else if (step === 2) {
        return <Paystep2 setStep={setStep} memberInfo={memberInfo} setMemberInfo={setMemberInfo} />;
    } else {
        return <Paystep3 setStep={setStep} requestPay={requestPay} amount={amount} memberInfo={memberInfo} />;
    }
  };

  return (
    <div className="pay-container">
      {renderStep()}
    </div>
  );
};

export default Pay;
