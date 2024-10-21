package com.zd.back.seoulcrawler.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.zd.back.seoulcrawler.crawler.CrawlerAir;
import com.zd.back.seoulcrawler.crawler.CrawlerEco;
import com.zd.back.seoulcrawler.crawler.CrawlerEnv;
import com.zd.back.seoulcrawler.crawler.CrawlerGreen;
import com.zd.back.seoulcrawler.mapper.CrawlerMapper;
import com.zd.back.seoulcrawler.model.SeoulNews;

@Service
public class CrawlerServiceImpl implements CrawlerService{

    @Autowired
    private CrawlerMapper crawlerMapper;

    @Override
    public void insertSeoulNews(SeoulNews seoulNews) {
        // TODO Auto-generated method stub

        // 중복 체크 후 삽입 로직
        if (crawlerMapper.selectNewsByTitle(seoulNews.getTitle()) == null) {
            crawlerMapper.insertSeoulNews(seoulNews);
        }
        
    }

    @Override
    public List<SeoulNews> selectSeoulNewsMini() {
        // TODO Auto-generated method stub
        return crawlerMapper.selectSeoulNewsMini();
    }

    @Override
    public SeoulNews selectNewsByTitle(String title) {
        // TODO Auto-generated method stub
        return crawlerMapper.selectNewsByTitle(title);
    }

    @Override
    public void crawling(int totalPage, String group) {

        if ("env".equals(group)) {
            CrawlerEnv crawler = new CrawlerEnv();

            List<SeoulNews> seoulNewsList = crawler.SeoulNewsCrawl(totalPage);

            for(SeoulNews seoulNews : seoulNewsList){

                insertSeoulNews(seoulNews);
            }
        } else if ("air".equals(group)) {
            CrawlerAir crawler = new CrawlerAir();

            List<SeoulNews> seoulNewsList = crawler.SeoulNewsCrawl(totalPage);

            for(SeoulNews seoulNews : seoulNewsList){

                insertSeoulNews(seoulNews);
            }
        } else if ("eco".equals(group)) {
            CrawlerEco crawler = new CrawlerEco();

            List<SeoulNews> seoulNewsList = crawler.SeoulNewsCrawl(totalPage);

            for(SeoulNews seoulNews : seoulNewsList){

                insertSeoulNews(seoulNews);
            }
        } else if ("green".equals(group)) {
            CrawlerGreen crawler = new CrawlerGreen();

            List<SeoulNews> seoulNewsList = crawler.SeoulNewsCrawl(totalPage);

            for(SeoulNews seoulNews : seoulNewsList){

                insertSeoulNews(seoulNews);
            }
        }
    }

    @Override
    public List<SeoulNews> selectSeoulNewsEnv() {
        // TODO Auto-generated method stub
        return crawlerMapper.selectSeoulNewsEnv();
    }

    @Override
    public List<SeoulNews> selectSeoulNewsEco() {
        // TODO Auto-generated method stub
        return crawlerMapper.selectSeoulNewsEco();
    }

    @Override
    public List<SeoulNews> selectSeoulNewsAir() {
        // TODO Auto-generated method stub
        return crawlerMapper.selectSeoulNewsAir();
    }

    @Override
    public List<SeoulNews> selectSeoulNewsGreen() {
        // TODO Auto-generated method stub
        return crawlerMapper.selectSeoulNewsGreen();
    }
    
}
