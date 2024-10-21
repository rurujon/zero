package com.zd.back.naversearchapi.service;

import java.util.List;

import com.zd.back.naversearchapi.model.News;

/**
 * SearchApiService
 */
public interface SearchApiService {

    public void saveNews(News news);
    public News findNewsByTitle(String title);
    List<News> getAllNews();  // DB에 저장된 모든 뉴스를 가져오는 메서드
    public List<News> searchNews(String keyword);
    List<News> miniNews();
}