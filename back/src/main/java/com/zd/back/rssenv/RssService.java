package com.zd.back.rssenv;

import java.util.List;

/**
 * RssService
 */
public interface RssService {

    void rssUpdate();
    void insertRssItem(RssItem item);
    List<RssItem> selectAll();
    List<RssItem> selectMini();
    int maxRssId();
    RssItem selectByRssId(int rssId) throws Exception;
}