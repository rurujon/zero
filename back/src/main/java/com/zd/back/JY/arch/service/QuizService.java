package com.zd.back.JY.arch.service;

import java.util.Map;

import org.springframework.stereotype.Service;


@Service
public interface QuizService {
    public int maxNum();
    public void insertquiz(Map map);
    public com.zd.back.JY.arch.DTO.QuizDTO getRandomQuiz();
    public int QHMaxNum();
    public void insertQH(Map<String, Object> map);
    public int checkToday(String memId);
}
