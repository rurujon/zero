package com.zd.back.quizhistory;

import java.util.Date;

import lombok.Data;

@Data
public class QuizHistoryDTO {
    private int quizHistoryId;  //db에 이름 변경
    private String quizResult;
    private Date quizDate;
    private String memId;

    public QuizHistoryDTO(){
        this.quizDate=new Date();
    }
}
