package com.zd.back.board.model.request;

import lombok.Data;

@Data
public class BbsListRequest {

    private String choice;
    private String search;
    private int page;
}