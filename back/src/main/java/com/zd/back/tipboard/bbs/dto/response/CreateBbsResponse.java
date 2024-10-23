package com.zd.back.tipboard.bbs.dto.response;

import lombok.Data;

@Data
public class CreateBbsResponse {

    private Integer seq;

    public CreateBbsResponse(Integer seq) {
        this.seq = seq;
    }
}