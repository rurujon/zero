package com.zd.back.SY.board.model.response;

import lombok.Data;

@Data
public class UpdateBbsResponse {

    private int updatedRecordCount;

    public UpdateBbsResponse(int updatedRecordCount) {
        this.updatedRecordCount = updatedRecordCount;
    }
}