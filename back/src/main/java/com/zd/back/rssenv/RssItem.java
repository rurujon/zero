package com.zd.back.rssenv;

import lombok.Data;

@Data
public class RssItem {
    private String title;
    private String description;
    private String link;
    private String pubDate;
}