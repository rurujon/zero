package com.zd.back.tipboard.bbs.dto.param;

import com.zd.back.tipboard.bbs.dto.request.CreateBbsRequest;

import lombok.Data;

@Data
public class CreateBbsAnswerParam {

    private Integer seq;
    private Integer parentSeq;
    private String id;
    private String title;
    private String content;

    public CreateBbsAnswerParam(Integer parentSeq, CreateBbsRequest req) {
        this.parentSeq = parentSeq;
        this.id = req.getId();
        this.title = req.getTitle();
        this.content = req.getContent();
    }
}