package com.zd.back.tipboard.bbs.dto.response;

import lombok.Data;

@Data
public class UpdateBbsResponse {

    private Integer updatedRecordCount;

    public UpdateBbsResponse(Integer updatedRecordCount) {
        this.updatedRecordCount = updatedRecordCount;
    }
}