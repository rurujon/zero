package com.zd.back.rssenv;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import com.fasterxml.jackson.dataformat.xml.XmlMapper;

@Service
public class RssServiceImpl implements RssService{

    @Autowired
    private RssMapper rssMapper;

    @Override
    public String rssFetch() {
        
        try {

            String url = "https://www.me.go.kr/home/web/policy_data/rss.do?menuId=92";

            RestTemplate restTemplate = new RestTemplate();
            String xmlResponse = restTemplate.getForObject(url, String.class);

            XmlMapper xmlMapper = new XmlMapper();
            RssData rssData = xmlMapper.readValue(xmlResponse, RssData.class);

            System.out.println(rssData);

            return "RSS Data successfully saved!";

            
        } catch (Exception e) {
            e.printStackTrace();
            return "Error fetching RSS data!";
        }

    }
    
}
