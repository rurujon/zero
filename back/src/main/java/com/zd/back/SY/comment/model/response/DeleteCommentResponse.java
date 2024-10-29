package com.zd.back.SY.comment.model.response;

import lombok.Data;

@Data
public class DeleteCommentResponse {

    private int deletedRecordCount; // 삭제된 레코드 수

    // 생성자
    public DeleteCommentResponse(int deletedRecordCount) {
        this.deletedRecordCount = deletedRecordCount;
    }
}