package com.zd.back.tipboard.bbs.dto.request;

import lombok.Data;

@Data
public class CreateBbsRequest {

    private String id;
    private String title;
    private String content;
}