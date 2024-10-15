package com.zd.back.naversearchapi.service;

import com.zd.back.naversearchapi.model.News;

/**
 * SearchApiService
 */
public interface SearchApiService {

    public void saveNews(News news);
    public News findNewsByTitle(String title);

    
}