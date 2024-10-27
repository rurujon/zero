package com.zd.back.board.service;

import java.util.List;
import java.util.Objects;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.zd.back.board.mapper.BoardMapper;
import com.zd.back.board.model.Board;
import com.zd.back.board.model.param.BoardParam;
import com.zd.back.board.model.request.BbsListRequest;
import com.zd.back.board.model.request.CreateBbsRequest;
import com.zd.back.board.model.request.UpdateBbsRequest;
import com.zd.back.board.model.response.BbsListResponse;
import com.zd.back.board.model.response.BbsResponse;
import com.zd.back.board.model.response.CreateBbsResponse;
import com.zd.back.board.model.response.DeleteBbsResponse;
import com.zd.back.board.model.response.UpdateBbsResponse;

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
		if (readerId != null && !readerId.isEmpty()) {
			BoardParam param = new BoardParam(boardno, readerId);
			int result = boardMapper.createBbsReadCountHistory(param); // 조회수 히스토리 처리 (insert: 1, update: 2)
			if (result == 1) {
				int updatedRecordCount = boardMapper.increaseBbsReadCount(boardno); // 조회수 증가
			}
		// } else {
		// 	// readerId가 없는 경우에도 조회수 증가
		// 	boardMapper.increaseBbsReadCount(boardno);
		}

		return new BbsResponse(boardMapper.getBoard(boardno));
	}

	/* 글 수정 */
	public UpdateBbsResponse updateBoard(int boardno, UpdateBbsRequest req) {
		int updatedRecordCount = boardMapper.updateBoard(new BoardParam(boardno, req));
		return new UpdateBbsResponse(updatedRecordCount);
	}

	/* 게시글 삭제 */
	public DeleteBbsResponse deleteBoard(int boardno) {
		int deletedRecordCount = boardMapper.deleteBoard(boardno);
		return new DeleteBbsResponse(deletedRecordCount);
	}

	/* 답글 추가 */
	public CreateBbsResponse createBbsAnswer(int parentno, CreateBbsRequest req) {
		// 1. 부모 게시글의 step 값 업데이트
		int updatedRecordCount = boardMapper.updateBbsStep(parentno);
		int bbsAnswerCount = boardMapper.getBbsAnswerCount(parentno);
	
		if (!Objects.equals(updatedRecordCount, bbsAnswerCount)) {
			System.out.println("BbsService createBbsAnswer: Fail update parent bbs step !!");
			return null;
		}
	
		// 2. 부모 게시글의 category 값 조회
		String parentCategory = boardMapper.getCategoryByBoardno(parentno);
	
		// 3. 답글 생성을 위한 BoardParam 설정
		BoardParam param = new BoardParam(parentno, req);
		param.setCategory(parentCategory); // 부모의 category 값을 설정
	
		// 4. 답글 생성
		boardMapper.createBbsAnswer(param);
		
		return new CreateBbsResponse(param.getBoardno());
	}
}
