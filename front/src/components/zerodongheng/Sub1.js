import React from 'react';
import './Sub1.css';
const Sub1 = () => {
    return (
        <div className="cont">
      <div className="circle">
        <div className="logo">ITwill</div>
        <div className="item top-left">
          <h7>교육환경 개선</h7>
          <p>학원 이전 및 확장<br/>부서별 업무 활용공간 확대<br/>자습실 등 시설 환경 개선</p>
        </div>
        <div className="item top-right">
          <h7>내부역량 강화</h7>
          <p>우수 직업훈련 교사 확보<br/>직업상담사 확보<br/>교직원 연수 교육 강화<br/>교수법 관련 세미나<br/>외부 전문가 활용<br/>인사고과 제도 운영</p>
        </div>
        <div className="item bottom-left">
          <h7>평생학습 체계 구축</h7>
          <p>취업반 교육 프로그램 구축<br/>취업반 수료생 경력개발<br/>온라인 교육 프로그램 확장</p>
        </div>
        <div className="item bottom-right">
          <h7>조직의 전문화</h7>
          <p>조직체계 분장<br/>개인별 업무성과 평가제<br/>기관 발전 위원회<br/>장학제도 운영</p>
        </div>
        <div className="item center">
          <h7>직무연수</h7>
          <p>직무 관련 내용</p>
        </div>
      </div>
    </div>
    );
};

export default Sub1;