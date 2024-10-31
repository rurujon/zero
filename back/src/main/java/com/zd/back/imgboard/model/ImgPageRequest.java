package com.zd.back.imgboard.model;

import lombok.Data;

@Data
public class ImgPageRequest {
    private int page;          // 현재 페이지 번호
    private int size;          // 페이지당 데이터 수
    private String searchKey;  // 검색 키
    private String searchValue; // 검색 값
  
}
