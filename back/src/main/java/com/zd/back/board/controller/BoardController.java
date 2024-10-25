package com.zd.back.board.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.zd.back.board.model.Board;
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
        System.out.println("memId: " + board.getMemId());
        System.out.println("title: " + board.getTitle());
        System.out.println("content: " + board.getContent());

        // 서비스 호출
        boardService.writeBoard(board);
        return ResponseEntity.ok("글이 등록되었습니다.");
    }
}
