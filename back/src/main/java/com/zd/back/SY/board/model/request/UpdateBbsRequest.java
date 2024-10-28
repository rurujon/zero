package com.zd.back.SY.board.model.request;

import lombok.Data;

@Data
public class UpdateBbsRequest {

    private String memId;
    private String title;
    private String content;
}