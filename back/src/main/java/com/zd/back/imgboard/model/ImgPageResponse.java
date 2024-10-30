package com.zd.back.imgboard.model;

import java.util.List;

import lombok.Data;

@Data
public class ImgPageResponse {
    private List<ImgBoard> content;   // 페이지의 데이터 리스트
    private long totalElements; // 전체 데이터 개수
    private int totalPages;     // 전체 페이지 수

 /*    public ImgPageResponse(List<ImgBoard> dataList, int totalCnt, ImgPageRequest imgPageRequest ) {
        this.dataList = dataList;
        this.totalCnt = totalCnt;
        this.currentPage = imgPageRequest.getPage();
        this.pageSize = imgPageRequest.getPageSize();
        this.totalPages = (int) Math.ceil((double) totalCnt / pageSize);
    } */
}
