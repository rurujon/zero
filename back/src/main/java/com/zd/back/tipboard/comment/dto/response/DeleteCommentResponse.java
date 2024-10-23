package com.zd.back.tipboard.comment.dto.response;

import lombok.Data;

@Data
public class DeleteCommentResponse {

    private Integer deletedRecordCount;

    public DeleteCommentResponse(Integer deletedRecordCount) {
        this.deletedRecordCount = deletedRecordCount;
    }
}