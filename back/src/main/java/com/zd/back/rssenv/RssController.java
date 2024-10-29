package com.zd.back.rssenv;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

import com.fasterxml.jackson.dataformat.xml.XmlMapper;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;



@RestController
@RequestMapping("api/rss")
public class RssController {

    @Autowired
    private RssService rssService;

    @PostMapping("/env")
    public void updateRssEnv() {
        //TODO: process POST request
        
        rssService.rssUpdate();
    }

    @GetMapping("/env/list")
    public List<RssItem> getRssEnv() {

        return rssService.selectAll();
    }

    @GetMapping("/env/mini")
    public List<RssItem> getRssMini() {
        return rssService.selectMini();
    }

    @GetMapping("/env/article")
    public RssItem getByRssId(@RequestParam int rssId) throws Exception{

        return rssService.selectByRssId(rssId);
    }

}
