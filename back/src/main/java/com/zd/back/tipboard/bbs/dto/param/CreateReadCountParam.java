package com.zd.back.tipboard.bbs.dto.param;

import lombok.Data;

@Data
public class CreateReadCountParam {

    private Integer bbsSeq; // 게시글 번호
    private String readerId; // 게시글 조회자 아이디

    // 생성자
    public CreateReadCountParam(Integer bbsSeq, String readerId) {
        this.bbsSeq = bbsSeq;
        this.readerId = readerId;
    }
}