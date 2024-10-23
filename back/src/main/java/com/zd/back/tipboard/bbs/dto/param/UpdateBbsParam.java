package com.zd.back.tipboard.bbs.dto.param;

import com.zd.back.tipboard.bbs.dto.request.UpdateBbsRequest;

import lombok.Data;

@Data // Lombok이 자동으로 getter, setter, toString, equals, hashCode 생성
public class UpdateBbsParam {

    private Integer seq;
    private String title;
    private String content;

    // 생성자
    public UpdateBbsParam(Integer seq, UpdateBbsRequest req) {
        this.seq = seq;
        this.title = req.getTitle();
        this.content = req.getContent();
    }
}