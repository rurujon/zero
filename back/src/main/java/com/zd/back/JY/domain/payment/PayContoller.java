package com.zd.back.JY.domain.payment;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.ModelAndView;


@Controller
@RequestMapping("/payment")
public class PayContoller {

    @Autowired
    private PayService payService;

    @GetMapping("/pay")
    public ModelAndView getMethodName() {
        ModelAndView mav = new ModelAndView();
        mav.setViewName("/JY/payment");
        
        return mav;
    }
    
    @PostMapping("/paymentHistory")
    public ResponseEntity<?> savePaymentHistory(@RequestBody Map<Object, Object> response) {
        // paymentData를 데이터베이스에 저장하는 로직 구현
        // 예: paymentService.save(paymentData);
        System.out.println("controller 호출 완료");

        payService.insertpayment(response);

        return ResponseEntity.ok("Payment recoded");
    }


}
