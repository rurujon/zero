import React, { useEffect, useState } from "react";
import Paystep1 from "./Paystep1"
import Paystep2 from "./Paystep2"
import Paystep3 from "./Paystep3"

import {useNavigate   } from "react-router-dom";
import axios from "axios";
const Pay = () => {
    const [amount, setAmount] = useState("");
    const [step, setStep] = useState(1); 
    const navigate = useNavigate();

  //   const toDonate = () => {
  //     console.log("후원하기 버튼 클릭됨"); // 로그 추가
  //     navigate('/donate');
  // };

    const amountChange = (event) => {
      setAmount(event.target.value); // 선택된 라디오 버튼의 값을 amount에 저장
    };

    const [memId] = useState(localStorage.getItem('memId'));

    const [memberInfo, setMemberInfo] = useState({//회원 데이터 저장
      memId:memId,
      memName: '',
      email: '',
      tel: '',
      post: '',
      addr1: '',
      addr2: ''
  }); // 모든 회원 정보를 담은 객체 상태

  useEffect(() => {
    // SDK 로드
    const script = document.createElement("script");
    script.src = "https://cdn.iamport.kr/v1/iamport.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const requestPay = () => {
    const { IMP } = window; // 'iamport'를 global로 접근
    IMP.init("imp51775781"); // 가맹점 식별코드
    
    // 현재 날짜와 시간을 가져와서 포맷
    const now = new Date();
    const createdAt = now.toISOString().replace("Z", ""); // 'Z' 제거 -> 'yyyy-MM-ddTHH:mm:ss.SSS' 형식
    const merchantUid = `oder_${createdAt.replace(/[-:.TZ]/g, "")}`; // oder_와 함께 정리된 고유 ID 생성
    
    

    IMP.request_pay(
      {
        // pg: "kakaopay.TC0ONETIME", // 결제 대행사 코드
        pg: "html5_inicis", // 결제 대행사 코드
        pay_method: "card", // 결제 방법
        merchant_uid: merchantUid, // 주문 고유 번호
        name:`후원금`, // 상품 이름
        amount: amount, // 상품 가격
        buyer_email: memberInfo.email, // 로그인한 사람의 이메일
        buyer_name: memberInfo.memName, // 로그인한 사람의 이름
        buyer_tel: memberInfo.tel, // 로그인한 사람의 전화번호
        buyer_addr: `${memberInfo.addr1} ${memberInfo.addr2}`, // 주소
        buyer_postcode: memberInfo.post, // 우편번호
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
            // paymentData를 서버에 전송

                await axios.post('/payment/paymentHistory', paymentData);
                
                // 성공 페이지로 이동
                console.error("Payment history save :" );
                navigate('/success', { state: { amount, memberInfo, response } });
            
        } else {
          await axios.post('/payment/paymentHistory', paymentData);

            // 실패 페이지로 이동
            navigate('/failure', { state: { error: response.error_msg, response } });
        }
      }
    );
  };



  const render = () => {
    if (step === 1) {
        return <Paystep1 amountChange={amountChange} setStep={setStep} />;
    } else if (step === 2) {
        return <Paystep2 setStep={setStep} memberInfo={memberInfo} setMemberInfo={setMemberInfo} />;
    } else {
        return <Paystep3 setStep={setStep} requestPay={requestPay} amount={amount} memberInfo={memberInfo}/>;
    }
};
 

  return (
    <div>
      <div className="App">
      {render()} {/* 단계별 컴포넌트 렌더링 */}
      </div>
    </div>
  );
};

export default Pay;
