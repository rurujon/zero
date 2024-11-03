package com.zd.back.JY.domain.payment;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.time.format.DateTimeParseException;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.siot.IamportRestClient.IamportClient;


@Service
public class PayService {
    
    private IamportClient api;

    @Autowired
    private PaymentMapper paymentMapper;

    public PayService(){
        this.api= new IamportClient("2467100118816737", "It0kkm3a8XLgUsC88uAwAV6DRQCCGB0dZ6CzCSfWnC7nPAlMs3yLggnkPnTw4yvQpz9Njq7MxE7HhDwK");
    }

    public int maxNum(){
        return paymentMapper.maxNum();
    }

    public void insertpayment(Map<Object, Object> response){
        System.out.println("service 호출 완료");
        PaymentDTO dto = new PaymentDTO();
        
         // 가격
        int amount = 0; // 기본값 설정
        Object obj = response.get("amount");
        System.out.println("받은 amount 값: " + obj);

        if (obj == null) {
            System.err.println("amount 값이 null입니다.");
            return; // 또는 적절한 예외 처리
        }
        try {
            if (obj instanceof Integer) {
                amount = (Integer) obj;
                System.out.println("Integer 값: " + amount);
            } else if (obj instanceof Long) {
                amount = ((Long) obj).intValue(); // Long을 int로 변환
                System.out.println("Long 값: " + amount);
            } else {
                amount = Integer.parseInt(obj.toString());
                System.out.println("obj는 Integer가 아닙니다." + amount);
            }
        } catch (NumberFormatException e) {
            System.err.println("NumberFormatException 발생: amount 값이 숫자로 변환할 수 없습니다. 받은 값: " + obj);
            e.printStackTrace();
            return; // 또는 적절한 예외 처리
        }


        dto.setPaymentId(paymentMapper.maxNum()+1);
        dto.setOrderId(response.get("orderId").toString()); //포트원 거래내역 = 주문거래내역
        dto.setPgTid(response.get("pgTid").toString());     //pg사 거래id
        dto.setPaymentMethod(response.get("paymentMethod").toString());//결제수단
        dto.setAmount(amount);   //가격
        dto.setBuyerId(response.get("buyerId").toString());       //구매자ID
        dto.setBuyerName(response.get("memName").toString()); //구매자 이름
        dto.setBuyerEmail(response.get("buyerEmail").toString());  //구매자 email
        dto.setBuyerTel(response.get("buyerTel").toString());  //구매자 전화번호
        dto.setStatus(response.get("status").toString());    //성공여부
        dto.setFailReason(response.get("failReason").toString());//실패사유
        dto.setCreatedAt(LocalDateTime.now());

        paymentMapper.insertpayment(dto);
    }
}
