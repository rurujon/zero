package com.zd.back.seoulcrawler.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class SeoulNews {

    private String title; // 제목
    private String link; // 뉴스 링크
    private String content; // 내용
    private String publishedDate; // 작성일
    
}
