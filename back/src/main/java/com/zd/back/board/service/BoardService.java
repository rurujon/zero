package com.zd.back.board.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.zd.back.board.mapper.BoardMapper;
import com.zd.back.board.model.Board;
import com.zd.back.board.model.param.BoardParam;
import com.zd.back.board.model.request.BbsListRequest;
import com.zd.back.board.model.response.BbsListResponse;

import lombok.RequiredArgsConstructor;

@Service
@Transactional
@RequiredArgsConstructor
public class BoardService {

    @Autowired
    private final BoardMapper boardMapper;

    /* 글 추가 */
    public void writeBoard(Board board) throws Exception {
        System.out.println("Before insert: " + board);
        boardMapper.insertBoard(board); //여기서 에러
        System.out.println("After insert: " + board);
    }
    
	/* 게시글 조회 */
	public BbsListResponse getBoardList(BbsListRequest req) {
		BoardParam param = new BoardParam(req);
		param.setPageParam(req.getPage(), 10);

		List<Board> bbsList = boardMapper.getBbsSearchPageList(param);
		int pageCnt = boardMapper.getBbsCount(new BoardParam(req));

		return new BbsListResponse(bbsList, pageCnt);
	}

}
