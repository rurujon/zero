package com.zd.back.tipboard.bbs.dto.request;

import lombok.Data;

@Data
public class UpdateBbsRequest {

    private String id;
    private String title;
    private String content;
}