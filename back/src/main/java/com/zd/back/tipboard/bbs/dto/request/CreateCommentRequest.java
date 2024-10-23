package com.zd.back.tipboard.bbs.dto.request;

import lombok.Data;

@Data
public class CreateCommentRequest {

    private String id;
    private String content;
}