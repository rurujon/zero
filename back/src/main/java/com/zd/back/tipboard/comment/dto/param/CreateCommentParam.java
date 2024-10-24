package com.zd.back.tipboard.comment.dto.param;

import com.zd.back.tipboard.bbs.dto.request.CreateCommentRequest;

import lombok.Data;

@Data
public class CreateCommentParam {

    private Integer bbsSeq;
    private Integer seq;
    private String memId;
    private String content;

    public CreateCommentParam(Integer bbsSeq, CreateCommentRequest req) {
        this.bbsSeq = bbsSeq;
        this.memId = req.getMemId();
        this.content = req.getContent();
    }
}