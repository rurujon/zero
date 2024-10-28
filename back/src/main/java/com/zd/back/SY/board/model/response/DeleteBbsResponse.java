package com.zd.back.SY.board.model.response;

import lombok.Data;

@Data
public class DeleteBbsResponse {

    private int deletedRecordCount;

    public DeleteBbsResponse(int deletedRecordCount) {
        this.deletedRecordCount = deletedRecordCount;
    }
}