package com.zd.back.quizhistory;

import java.util.Map;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class QuizHistoryService {

    QuizHistoryMapper quizHistoryMapper;

    @Transactional
    public void insertQH(Map map) throws Exception{
        quizHistoryMapper.insertQH(map);
    }
}
