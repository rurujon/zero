import React, { useEffect, useState } from "react";
import Paystep1 from "./Paystep1"
import Paystep2 from "./Paystep2"
import Paystep3 from "./Paystep3"
import SuccessPage from "./SuccessPage ";// 성공 페이지 컴포넌트
import FailurePage from "./FailurePage"; // 실패 페이지 컴포넌트
import {Route, Routes,useNavigate   } from "react-router-dom";
const Pay = () => {
    const [amount, setAmount] = useState("");
    const [step, setStep] = useState(1); 
    const navigate = useNavigate();

    const toDonate = () => {
      console.log("후원하기 버튼 클릭됨"); // 로그 추가
      navigate('/donate');
  };

    const amountChange = (event) => {
      setAmount(event.target.value); // 선택된 라디오 버튼의 값을 amount에 저장
    };

    const [memberInfo, setMemberInfo] = useState({//회원 데이터 저장
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
    
    IMP.request_pay(
      {
        // pg: "kakaopay.TC0ONETIME", // 결제 대행사 코드
        pg: "naverpay", // 결제 대행사 코드
        pay_method: "card", // 결제 방법
        merchant_uid: `payment-${crypto.randomUUID()}`, // 주문 고유 번호
        name:`후원금`, // 상품 이름
        amount: amount, // 상품 가격
        buyer_email: memberInfo.email, // 로그인한 사람의 이메일
        buyer_name: memberInfo.memName, // 로그인한 사람의 이름
        buyer_tel: memberInfo.tel, // 로그인한 사람의 전화번호
        buyer_addr: `${memberInfo.addr1} ${memberInfo.addr2}`, // 주소
        buyer_postcode: memberInfo.post, // 우편번호
      },
      function (response) {
        if (response.success) {
          // 성공 페이지로 이동
          navigate('/success', { state: { amount, memberInfo } });
        } else {
          // 실패 페이지로 이동
          navigate('/failure', { state: { error: response.error_msg } });
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
