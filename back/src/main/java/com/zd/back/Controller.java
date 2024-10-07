package com.zd.back;


import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ResponseBody;

@org.springframework.stereotype.Controller
public class Controller {
    
    @GetMapping("/")
    @ResponseBody   //문자열 그대로 응답
    public String index(){
        return "왜 안나오냐 + 푸쉬 테스트";
        
    }
}
