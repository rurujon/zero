package com.zd.back.tipboard.bbs.dto.param;

import com.zd.back.tipboard.bbs.dto.request.BbsListRequest;

import lombok.Data;

@Data
public class BbsListParam extends PageParam {

    private String choice;
    private String search;
    private Integer page;

    // 생성자
    public BbsListParam(BbsListRequest req) {
        this.choice = req.getChoice();
        this.search = req.getSearch();
        this.page = req.getPage();
    }
}