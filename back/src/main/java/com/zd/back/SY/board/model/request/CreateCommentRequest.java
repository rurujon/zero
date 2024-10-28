package com.zd.back.SY.board.model.request;

import lombok.Data;

@Data
public class CreateCommentRequest {

    private String memId;
    private String content;
}