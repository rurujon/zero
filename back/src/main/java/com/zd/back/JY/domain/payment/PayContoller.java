package com.zd.back.JY.domain.payment;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.ModelAndView;


@Controller
public class PayContoller {
    
    @GetMapping("/pay")
    public ModelAndView getMethodName() {
        ModelAndView mav = new ModelAndView();
        mav.setViewName("/JY/payment");
        
        return mav;
    }
    
}
