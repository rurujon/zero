package com.zd.back.imgboard.model;

import java.sql.Timestamp;

import lombok.Data;

@Data
public class Img {
    private int imgId; // 이미지 ID
    private int imgPostId; // 게시판 ID
    private String originalFileName; // 원래 파일 이름
    private String saveFileName; // 서버에 저장된 파일 이름
    private String filePath; // 파일 경로
    private Timestamp fileDate; // 업로드 날짜
} 
