package com.zd.back.imgboard.model;


import java.sql.Timestamp;

import lombok.Data;

@Data
public class ImgPost {
     private int imgPostId; // 게시판 번호
    private String userId; // 사용자 ID
    private String cate; // 카테고리
    private String title; // 게시글 제목
    private String content; // 게시글 내용
    private Timestamp created; // 생성일
    private int auth; // 인증 여부 (0 또는 1)
    private Timestamp authDate; // 인증된 날짜

}
