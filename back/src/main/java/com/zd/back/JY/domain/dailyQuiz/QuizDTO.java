package com.zd.back.domain.dailyQuiz;

import lombok.Data;

@Data
public class QuizDTO {
    private int id;
    private String question;
    private String answer;
    private String explanation;

    public QuizDTO(int id, String question, String answer, String explanation){
        this.id = id;
        this.question = question;
        this.answer = answer;
        this.explanation = explanation;
    }

    public QuizDTO(){

    }
}
