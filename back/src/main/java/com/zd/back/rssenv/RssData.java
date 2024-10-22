package com.zd.back.rssenv;

import lombok.Data;

import java.util.List;

@Data
public class RssData {
    private Channel channel;
}

@Data
class Channel {
    private List<RssItem> item;
}