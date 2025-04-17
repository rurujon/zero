package com.zd.back.JY.arch.mapper;

import java.util.Map;

import org.apache.ibatis.annotations.Mapper;
import org.springframework.transaction.annotation.Transactional;

import com.zd.back.JY.arch.DTO.QuizHistoryDTO;



@Mapper
public interface QuizHistoryMapper{

    public int QHMaxNum();

    @Transactional
    public void insertQH(QuizHistoryDTO dto);  //결과, sysdate, memid

    public int checkToday(String memId);
}
