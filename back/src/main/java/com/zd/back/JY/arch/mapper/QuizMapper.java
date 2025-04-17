package com.zd.back.JY.arch.mapper;


import org.apache.ibatis.annotations.Mapper;

import com.zd.back.JY.arch.DTO.QuizDTO;
import com.zd.back.JY.arch.DTO.QuizHistoryDTO;





@Mapper
public interface QuizMapper {



    public int maxNum();

    public void insertquiz(QuizDTO dto);

    public QuizDTO getRandomQuiz();

    public void insetQH(QuizHistoryDTO dto);
}
