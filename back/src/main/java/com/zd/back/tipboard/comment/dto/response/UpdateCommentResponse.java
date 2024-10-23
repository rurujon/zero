package com.zd.back.tipboard.comment.dto.response;

import lombok.Data;

@Data
public class UpdateCommentResponse {
    
    private Integer updatedRecordCount;

    public UpdateCommentResponse(Integer updatedRecordCount) {
        this.updatedRecordCount = updatedRecordCount;
    }
}