package com.zd.back.tipboard.bbs.dto.response;

import com.zd.back.tipboard.bbs.domain.Bbs;

import lombok.Data;

@Data
public class BbsResponse {

    private Bbs bbs;

    public BbsResponse(Bbs bbs) {
        this.bbs = bbs;
    }
}