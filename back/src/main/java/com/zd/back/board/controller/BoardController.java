package com.zd.back.board.controller;

import java.sql.Date;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.zd.back.board.model.Board;
import com.zd.back.board.model.request.BbsListRequest;
import com.zd.back.board.model.response.BbsListResponse;
import com.zd.back.board.service.BoardService;

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
        return ResponseEntity.ok("글이 등록되었습니다.");
    }

	@GetMapping("/list")
	public ResponseEntity<BbsListResponse> getBoardList(@ModelAttribute BbsListRequest req){

		return ResponseEntity.ok(boardService.getBoardList(req));
	}

}
