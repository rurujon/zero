package com.zd.back.SY.board.model.response;

import lombok.Data;

@Data
public class CreateCommentResponse {

    private int boardno;

    public CreateCommentResponse(int boardno) {
        this.boardno = boardno;
    }
}