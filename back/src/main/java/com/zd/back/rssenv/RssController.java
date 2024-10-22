package com.zd.back.rssenv;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

import com.fasterxml.jackson.dataformat.xml.XmlMapper;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;


@RestController
@RequestMapping("api/rss")
public class RssController {

    @Autowired
    private RssService rssService;

    @GetMapping("/env")
    public String fetchRssEnv() {

        return rssService.rssFetch();
    }
    
    
}
