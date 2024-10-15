package com.zd.back.naversearchapi.mapper;

import org.apache.ibatis.annotations.Mapper;

import com.zd.back.naversearchapi.model.News;

/**
 * SearchApiMapper
 */
@Mapper
public interface SearchApiMapper {
    void insertNews(News news);
    News selectNewsByTitle(String title);
    
}