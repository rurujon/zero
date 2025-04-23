package com.zd.back.JY.arch.service;

import java.io.IOException;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.time.format.DateTimeParseException;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.siot.IamportRestClient.IamportClient;
import com.siot.IamportRestClient.exception.IamportResponseException;
import com.siot.IamportRestClient.response.IamportResponse;
import com.siot.IamportRestClient.response.Payment;
import com.zd.back.JY.arch.DTO.PaymentDTO;
import com.zd.back.JY.arch.mapper.PaymentMapper;



@Service
public class PayService {
    
    private IamportClient api;
/*api 호출값
 * imp_uid
 * merchant_uid
 * status
 * amount
 * pay_method : 결제방법
 * buyer_name
 * buyer_email
 * car_name
 * paid_at
 */
    @Autowired
    private PaymentMapper paymentMapper;

    public PayService(){
        this.api= new IamportClient("2467100118816737", "It0kkm3a8XLgUsC88uAwAV6DRQCCGB0dZ6CzCSfWnC7nPAlMs3yLggnkPnTw4yvQpz9Njq7MxE7HhDwK");
    }

    public int maxNum(){
        return paymentMapper.maxNum();
    }

    public void insertpayment(Map<Object, Object> response) {
        System.out.println("service 호출 완료");
        PaymentDTO dto = new PaymentDTO();
    
        // 가격 처리
        int amount = 0;
        Object obj = response.get("amount");
        System.out.println("받은 amount 값: " + obj);
    
        if (obj == null) {
            System.err.println("amount 값이 null입니다.");
            return; // 또는 적절한 예외 처리
        }
    
        try {
            if (obj instanceof Integer) {
                amount = (Integer) obj;
            } else if (obj instanceof Long) {
                amount = ((Long) obj).intValue(); // Long을 int로 변환
            } else if (obj instanceof String) {
                amount = Integer.parseInt((String) obj); // String을 int로 변환
            } else {
                System.err.println("지원되지 않는 타입입니다: " + obj.getClass());
                return;
            }
            System.out.println("처리된 amount 값: " + amount);
        } catch (NumberFormatException e) {
            System.err.println("NumberFormatException 발생: amount 값이 숫자로 변환할 수 없습니다. 받은 값: " + obj);
            e.printStackTrace();
            return;
        }
    
        // 나머지 값 처리 (null 체크 추가)
        dto.setPaymentId(paymentMapper.maxNum() + 1);
        dto.setOrderId(response.get("orderId") != null ? response.get("orderId").toString() : "기본값");
        dto.setPgTid(response.get("pgTid") != null ? response.get("pgTid").toString() : "기본값");
        dto.setPaymentMethod(response.get("paymentMethod") != null ? response.get("paymentMethod").toString() : "기본값");
        dto.setAmount(amount);
        dto.setBuyerId(response.get("buyerId") != null ? response.get("buyerId").toString() : "기본값");
        dto.setBuyerName(response.get("memName") != null ? response.get("memName").toString() : "기본값");
        dto.setBuyerEmail(response.get("buyerEmail") != null ? response.get("buyerEmail").toString() : "기본값");
        dto.setBuyerTel(response.get("buyerTel") != null ? response.get("buyerTel").toString() : "기본값");
        dto.setStatus(response.get("status") != null ? response.get("status").toString() : "기본값");
        dto.setFailReason(response.get("failReason") != null ? response.get("failReason").toString() : "기본값");
        dto.setCreatedAt(LocalDateTime.now());
    
        // 데이터베이스에 삽입
        paymentMapper.insertpayment(dto);
    }
    
    public List<PaymentDTO> getDonateHistory(String buyerId) {
        return paymentMapper.getDonateHistory(buyerId);
    }

    public boolean checkServer(Map<Object, Object> response) throws IamportResponseException, IOException {
        try {
            String impUid = response.get("imp_uid").toString();
            BigDecimal clientAmount = new BigDecimal(response.get("amount").toString());
    
            IamportResponse<Payment> iamportResponse = api.paymentByImpUid(impUid);
            Payment payment = iamportResponse.getResponse();
    
            if (payment == null) {
                System.err.println("[아임포트]에서 결제 정보를 조회할 수 없습니다.");
                return false;
            }

            if (!"paid".equals(payment.getStatus())) {
                System.err.println("결제 중간 취소: 상태=" + payment.getStatus());
                return false;
            }
            if (payment.getAmount().compareTo(clientAmount) != 0) {
                System.err.println("\"금액 불일치: impUid={}, 실제금액={}, 요청금액={}\", impUid, payment.getAmount(), clientAmount");
                return false;
            }
    
            System.out.println("결제 검증 성공: " + payment.getAmount());
            return true;
    
        } catch (Exception e) {
            System.err.println("결제 검증 중 오류: " + e.getMessage());
            return false;
        }
    }
    
}
