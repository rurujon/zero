package com.zd.back.imgboard.model;

import lombok.Data;


public class Pagination {
    private int currentPage; // 현재 페이지
    private int totalPage;   // 총 페이지 수
    private int totalCount;  // 총 데이터 수
}
