package com.zd.back.seoulcrawler.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.zd.back.seoulcrawler.model.SeoulNews;

/**
 * CrollerMapper
 */
@Mapper
public interface CrawlerMapper {

    void insertSeoulNews();
    List<SeoulNews> selectSeoulNews();

    
}