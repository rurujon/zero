package com.zd.back.imgboard.model;

import lombok.Data;
import java.util.List;

@Data
public class PageResponse<T> {
    private List<T> content; // 데이터 목록
    private int currentPage; // 현재 페이지
    private int totalPage; // 총 페이지 수
    private int totalCount; // 총 데이터 수 

    public PageResponse(List<T> content, int currentPage, int totalPage, int totalCount) {

        this.content = content;
        this.currentPage = currentPage;
        this.totalPage = totalPage;
        this.totalCount = totalCount;
    }

}
