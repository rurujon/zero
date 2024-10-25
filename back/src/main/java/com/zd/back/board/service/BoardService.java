package com.zd.back.board.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.zd.back.board.mapper.BoardMapper;
import com.zd.back.board.model.Board;

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
    
}
