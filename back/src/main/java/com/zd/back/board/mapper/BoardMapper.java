package com.zd.back.board.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

import com.zd.back.board.model.Board;
import com.zd.back.board.model.param.BoardParam;

@Mapper
@Repository
public interface BoardMapper {

    void insertBoard(Board board);
    List<Board> getBbsSearchPageList(BoardParam param);
	int getBbsCount(BoardParam param);

}
