package com.zd.back.tipboard.bbs.dto.response;

import lombok.Data;

@Data
public class CreateCommentResponse {

    private Integer seq;

    public CreateCommentResponse(Integer seq) {
        this.seq = seq;
    }
}