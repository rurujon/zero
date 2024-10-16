package com.zd.back.naversearchapi.service;

import java.util.List;

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

    @Override
    public List<News> getAllNews() {
        // DB에서 모든 뉴스 데이터를 가져오는 로직
        return searchApiMapper.selectAllNews();
    }

    @Override
    public List<News> searchNews(String keyword) {
        return searchApiMapper.searchNews(keyword);
    }
    
}
