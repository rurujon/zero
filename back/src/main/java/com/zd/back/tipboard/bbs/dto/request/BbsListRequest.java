package com.zd.back.tipboard.bbs.dto.request;

import lombok.Data;

@Data
public class BbsListRequest {

    private String choice;
    private String search;
    private Integer page;
}