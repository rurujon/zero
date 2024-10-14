package com.zd.back.JY.domain.dailyQuiz;



import org.apache.ibatis.annotations.Mapper;


import lombok.Data;

@Mapper
public interface QuizMapper {

    public int maxNum();

    public void insertquiz(QuizDTO dto);

}
