package com.zd.back.rssenv;

import lombok.Data;

@Data
public class RssItem {
    private String title;
    private String description;
    private String pubDate;
    private String author;
    private String link;
}