package com.zd.back.quizhistory;

import java.util.Map;

import org.apache.ibatis.annotations.Mapper;
import org.springframework.transaction.annotation.Transactional;


@Mapper
public interface QuizHistoryMapper{

    @Transactional
    public void insertQH(Map map);  //결과, sysdate, memid

}
