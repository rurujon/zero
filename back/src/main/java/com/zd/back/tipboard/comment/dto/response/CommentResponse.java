package com.zd.back.tipboard.comment.dto.response;

import java.util.List;

import com.zd.back.tipboard.comment.domain.Comment;

import lombok.Data;

@Data
public class CommentResponse {

    private List<Comment> commentList;
    private Integer pageCnt;

    public CommentResponse(List<Comment> commentList, Integer pageCnt) {
        this.commentList = commentList;
        this.pageCnt = pageCnt;
    }
}