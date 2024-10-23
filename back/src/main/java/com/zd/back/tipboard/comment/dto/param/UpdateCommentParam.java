package com.zd.back.tipboard.comment.dto.param;

import lombok.Data;

@Data
public class UpdateCommentParam {

    private Integer seq;
    private String content;

    public UpdateCommentParam(Integer seq, String content) {
        this.seq = seq;
        this.content = content;
    }
}