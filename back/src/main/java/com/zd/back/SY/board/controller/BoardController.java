package com.zd.back.SY.board.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.zd.back.SY.board.model.Board;
import com.zd.back.SY.board.model.request.BbsListRequest;
import com.zd.back.SY.board.model.request.CreateBbsRequest;
import com.zd.back.SY.board.model.request.UpdateBbsRequest;
import com.zd.back.SY.board.model.response.BbsListResponse;
import com.zd.back.SY.board.model.response.BbsResponse;
import com.zd.back.SY.board.model.response.CreateBbsResponse;
import com.zd.back.SY.board.model.response.DeleteBbsResponse;
import com.zd.back.SY.board.model.response.UpdateBbsResponse;
import com.zd.back.SY.board.service.BoardService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/board")
@RequiredArgsConstructor
public class BoardController {

    @Autowired
    final BoardService boardService;

    @PostMapping("/write")
    @Transactional
    public ResponseEntity<?> writeBoard(@RequestBody Board board) throws Exception {

        boardService.writeBoard(board);
        // System.out.println("Generated boardno: " + board.getBoardno());

        Map<String, Object> map = new HashMap<>();
        map.put("boardno", board.getBoardno());
        map.put("message", "글이 등록되었습니다.");
        return ResponseEntity.ok(map);
    }

	@GetMapping("/list")
	public ResponseEntity<BbsListResponse> getBoardList(@ModelAttribute BbsListRequest req){

		return ResponseEntity.ok(boardService.getBoardList(req));
	}

    @GetMapping("/{boardno}")
	public ResponseEntity<BbsResponse> getBoard(@PathVariable int boardno, @RequestParam String readerId) throws Exception {

		return ResponseEntity.ok(boardService.getBoard(boardno, readerId));
	}

	@PostMapping("/update/{boardno}")
	public ResponseEntity<UpdateBbsResponse> updateBoard(@PathVariable int boardno, @RequestBody UpdateBbsRequest req) {

		return ResponseEntity.ok(boardService.updateBoard(boardno, req));
	}

    @GetMapping("/delete/{boardno}")
	public ResponseEntity<DeleteBbsResponse> deleteBoard(@PathVariable int boardno) {

		return ResponseEntity.ok(boardService.deleteBoard(boardno));
	}

    @PostMapping("/{parentno}/answer")
	public ResponseEntity<CreateBbsResponse> createBbsAnswer(@PathVariable int parentno, @RequestBody CreateBbsRequest req) {

		return ResponseEntity.ok(boardService.createBbsAnswer(parentno, req));
	}

}
