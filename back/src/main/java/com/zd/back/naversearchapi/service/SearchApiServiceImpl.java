package com.zd.back.naversearchapi.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.zd.back.naversearchapi.mapper.SearchApiMapper;
import com.zd.back.naversearchapi.model.News;

@Service
public class SearchApiServiceImpl implements SearchApiService{

    @Autowired
    private SearchApiMapper searchApiMapper;

    @Override
    public void saveNews(News news){

        // 중복 체크 후 삽입 로직
        if (searchApiMapper.selectNewsByTitle(news.getTitle()) == null) {
            searchApiMapper.insertNews(news);
        }
    }

    @Override
    public News findNewsByTitle(String title){
        return searchApiMapper.selectNewsByTitle(title);
    }
    
}
