package com.zd.back.seoulcrawler.service;

import java.util.List;

import com.zd.back.seoulcrawler.model.SeoulNews;

/**
 * CrollerService
 */
public interface CrawlerService {

    void insertSeoulNews(SeoulNews seoulNews);
    List<SeoulNews> selectSeoulNewsMini();
    SeoulNews selectNewsByTitle(String title);
    void crawling(int totalPage, String group);
    List<SeoulNews> selectSeoulNewsEnv();
    List<SeoulNews> selectSeoulNewsEco();
    List<SeoulNews> selectSeoulNewsAir();
    List<SeoulNews> selectSeoulNewsGreen();
}