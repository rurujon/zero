package com.zd.back.seoulcrawler.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.zd.back.seoulcrawler.model.SeoulNews;
import com.zd.back.seoulcrawler.service.CrawlerService;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;



@RestController
@RequestMapping("/api/seoul")
public class CrawlerController {

    @Autowired
    private CrawlerService crawlerService;

    @PostMapping("/seoulNews/update")
    public ResponseEntity<String> crawlSeoulNews(@RequestParam String group) {
        //TODO: process POST request

        int totalPage = 10;

        crawlerService.crawling(totalPage, group);
        
        return ResponseEntity.ok("갱신 완료");
    }

    
    @GetMapping("/seoulNews/mini")
    public List<SeoulNews> getMiniNews() {
        return crawlerService.selectSeoulNewsMini();
    }

    @GetMapping("/seoulNews/env")
    public List<SeoulNews> getEnvNews() {
        return crawlerService.selectSeoulNewsEnv();
    }

    @GetMapping("/seoulNews/eco")
    public List<SeoulNews> getEcoNews() {
        return crawlerService.selectSeoulNewsEco();
    }

    @GetMapping("/seoulNews/air")
    public List<SeoulNews> getAirNews() {
        return crawlerService.selectSeoulNewsAir();
    }

    @GetMapping("/seoulNews/green")
    public List<SeoulNews> getGreenNews() {
        return crawlerService.selectSeoulNewsGreen();
    }
    
    
    
}
