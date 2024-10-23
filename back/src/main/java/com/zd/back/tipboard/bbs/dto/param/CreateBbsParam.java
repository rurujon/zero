package com.zd.back.tipboard.bbs.dto.param;

import com.zd.back.tipboard.bbs.dto.request.CreateBbsRequest;

import lombok.Data;

@Data
public class CreateBbsParam {

    private Integer seq;
    private String id;
    private String title;
    private String content;

    // 생성자
    public CreateBbsParam(CreateBbsRequest req) {
        this.id = req.getId();
        this.title = req.getTitle();
        this.content = req.getContent();
    }
}