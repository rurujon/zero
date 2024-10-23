package com.zd.back.tipboard.bbs.dto.param;

import com.zd.back.tipboard.bbs.dto.request.BbsListRequest;

import lombok.Data;

@Data // Lombok이 자동으로 getter, setter, toString, equals, hashCode 생성
public class BbsCountParam {

    private String choice;
    private String search;

    // 생성자
    public BbsCountParam(BbsListRequest req) {
        this.choice = req.getChoice();
        this.search = req.getSearch();
    }
}