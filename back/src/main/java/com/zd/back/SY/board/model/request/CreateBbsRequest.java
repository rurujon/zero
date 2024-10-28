package com.zd.back.SY.board.model.request;

import lombok.Data;

@Data
public class CreateBbsRequest {

    private int boardno;
    private String memId;
    private String title;
    private String content;
}