package com.zd.back.tipboard.bbs.dto.request;

import lombok.Data;

@Data
public class UpdateBbsRequest {

    private String memId;
    private String title;
    private String content;
}