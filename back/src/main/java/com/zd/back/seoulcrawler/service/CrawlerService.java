package com.zd.back.seoulcrawler.service;

import java.util.List;

import com.zd.back.seoulcrawler.model.SeoulNews;

/**
 * CrollerService
 */
public interface CrawlerService {

    void insertSeoulNews(SeoulNews seoulNews);
    List<SeoulNews> selectSeoulNews();


    
}