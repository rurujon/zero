package com.zd.back.tipboard.comment.domain;

import lombok.Data;

@Data
public class Comment {

    private Integer seq; // 댓글 고유 번호
    private String id; // 댓글 작성자
    private String content; // 댓글 내용
    private Integer bbsSeq; // 게시글 번호
    private String createdAt; // 댓글 생성 일자
    private Integer del; // 삭제 여부
}