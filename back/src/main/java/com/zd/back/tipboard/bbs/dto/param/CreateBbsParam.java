package com.zd.back.tipboard.bbs.dto.param;

import com.zd.back.tipboard.bbs.dto.request.CreateBbsRequest;

import lombok.Data;

@Data
public class CreateBbsParam {

    private Integer seq;
    private String memId;
    private String title;
    private String content;

    // 생성자
    public CreateBbsParam(CreateBbsRequest req) {
        this.memId = req.getMemId();
        this.title = req.getTitle();
        this.content = req.getContent();
    }
}