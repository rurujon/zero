package com.zd.back.JY.domain.dailyQuiz;

import java.util.Map;

import org.springframework.stereotype.Service;

@Service
public interface QuizService {
    public int maxNum();
    public void insertquiz(Map map);
    public QuizDTO getRandomQuiz();
    public int QHMaxNum();
    public void insertQH(Map<Object, Object> map);
    public boolean checkToday(String memId);
}
