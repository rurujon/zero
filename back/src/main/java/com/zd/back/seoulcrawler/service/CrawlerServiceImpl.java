package com.zd.back.seoulcrawler.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;

import com.zd.back.seoulcrawler.mapper.CrawlerMapper;
import com.zd.back.seoulcrawler.model.SeoulNews;

public class CrawlerServiceImpl implements CrawlerService{

    @Autowired
    private CrawlerMapper crawlerMapper;

    @Override
    public void insertSeoulNews(SeoulNews seoulNews) {
        // TODO Auto-generated method stub
        
    }

    @Override
    public List<SeoulNews> selectSeoulNews() {
        // TODO Auto-generated method stub
        return null;
    }
    
}
