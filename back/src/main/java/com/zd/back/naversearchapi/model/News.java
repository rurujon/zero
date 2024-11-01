package com.zd.back.naversearchapi.model;

import lombok.Data;

@Data
public class News {
    private int naverId;
    private String title;
    private String link;
    private String description;
    private String pubDate;
    
}