package com.zd.back.SY.board.model.response;

import com.zd.back.SY.board.model.Board;

import lombok.Data;

@Data
public class BbsResponse {

    private Board board;

    public BbsResponse(Board board) {
        this.board = board;
    }
}