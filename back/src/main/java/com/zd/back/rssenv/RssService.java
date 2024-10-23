package com.zd.back.rssenv;

import java.util.List;

/**
 * RssService
 */
public interface RssService {

    void rssFetch();
    void insertRssItem(RssItem item);
    List<RssItem> selectAll();
    List<RssItem> selectMini();
}