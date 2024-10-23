package com.zd.back.tipboard.comment.dto.param;

import com.zd.back.tipboard.bbs.dto.param.PageParam;

import lombok.Data;

@Data
public class CommentListParam extends PageParam {

    private Integer bbsSeq; // 게시글 번호

    public CommentListParam(Integer bbsSeq) {
        this.bbsSeq = bbsSeq;
    }
}