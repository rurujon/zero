package com.zd.back.tipboard.bbs.dto.request;

import lombok.Data;

@Data
public class CreateCommentRequest {

    private String memId;
    private String content;
}