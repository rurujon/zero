package com.zd.back.quizhistory;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;

@Controller
public class QuizHistoryController {
    @Autowired
    private QuizHistoryService quizHistoryService;

    //결과, 날짜, 아이디, id 자동 생성
    
    public void insertQH(Map map){
        
    }

}
