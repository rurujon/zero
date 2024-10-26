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
import com.zd.back.board.model.response.BbsResponse;

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
        boardMapper.insertBoard(board);
        System.out.println("After insert: " + board);
    }
    
	/* 게시글 조회 */
	public BbsListResponse getBoardList(BbsListRequest req) {
		BoardParam param = new BoardParam(req);
		param.setBoardParam(req.getPage(), 10);

		List<Board> bbsList = boardMapper.getBbsSearchPageList(param);
		int pageCnt = boardMapper.getBbsCount(new BoardParam(req));

		return new BbsListResponse(bbsList, pageCnt);
	}

    /* 특정 글 */
	/* 조회수 수정 */
	public BbsResponse getBoard(int boardno, String readerId) throws Exception {
		// 로그인 한 사용자의 조회수만 카운팅
		if (!readerId.isEmpty()) {
			BoardParam param = new BoardParam(boardno, readerId);
			int result = boardMapper.createBbsReadCountHistory(param); // 조회수 히스토리 처리 (insert: 1, update: 2)
			if (result == 1) {
				int updatedRecordCount = boardMapper.increaseBbsReadCount(boardno); // 조회수 증가
			}
		}

		return new BbsResponse(boardMapper.getBoard(boardno));
	}

}
