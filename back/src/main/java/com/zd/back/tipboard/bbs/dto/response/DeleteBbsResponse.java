package com.zd.back.tipboard.bbs.dto.response;

import lombok.Data;

@Data
public class DeleteBbsResponse {

    private Integer deletedRecordCount;

    public DeleteBbsResponse(Integer deletedRecordCount) {
        this.deletedRecordCount = deletedRecordCount;
    }
}