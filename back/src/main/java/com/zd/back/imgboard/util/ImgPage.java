package com.zd.back.imgboard.util;

import java.util.List;

import lombok.Data;

@Data
public class ImgPage<T> {
    private List<T> contents; // 현재 페이지의 데이터 목록
    private int currentPage; // 현재 페이지 번호
    private int totalPages;  // 총 페이지 수
    private long totalElements; // 총 데이터 개수

   
}
