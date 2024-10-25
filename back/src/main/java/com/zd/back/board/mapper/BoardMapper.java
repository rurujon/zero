package com.zd.back.board.mapper;

import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

import com.zd.back.board.model.Board;

@Mapper
@Repository
public interface BoardMapper {

    void insertBoard(Board board);

}
