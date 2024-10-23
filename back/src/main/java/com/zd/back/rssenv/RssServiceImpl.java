package com.zd.back.rssenv;

import java.io.ByteArrayInputStream;
import java.util.List;

import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.w3c.dom.Document;
import org.w3c.dom.Element;
import org.w3c.dom.NodeList;

import com.fasterxml.jackson.dataformat.xml.XmlMapper;

@Service
public class RssServiceImpl implements RssService{

    @Autowired
    private RssMapper rssMapper;

    @Override
    public void insertRssItem(RssItem item) {
        // TODO Auto-generated method stub
        rssMapper.insertRssItem(item);
    }

    @Override
    public List<RssItem> selectAll() {
        // TODO Auto-generated method stub
        return rssMapper.selectAll();
    }

    @Override
    public List<RssItem> selectMini() {
        // TODO Auto-generated method stub
        return rssMapper.selectMini();
    }


    @Override
    public void rssFetch() {
        
        try {

            String url = "https://www.me.go.kr/home/web/policy_data/rss.do?menuId=92";

            RestTemplate restTemplate = new RestTemplate();
            String xmlResponse = restTemplate.getForObject(url, String.class);

            // XML 파서 설정
            DocumentBuilderFactory factory = DocumentBuilderFactory.newInstance();
            DocumentBuilder builder = factory.newDocumentBuilder();
            Document doc = builder.parse(new ByteArrayInputStream(xmlResponse.getBytes("UTF-8")));

            // <item> 태그 가져오기
            NodeList itemList = doc.getElementsByTagName("item");

            for(int i=0; i<itemList.getLength(); i++){
                Element item = (Element) itemList.item(i);

                RssItem rssItem = new RssItem();

                String title = item.getElementsByTagName("title").item(0).getTextContent();
                String link = "https://www.me.go.kr/" + item.getElementsByTagName("link").item(0).getTextContent();
                String description = item.getElementsByTagName("description").item(0).getTextContent();
                String author = item.getElementsByTagName("author").item(0).getTextContent();
                String pubDate = item.getElementsByTagName("pubDate").item(0).getTextContent();

                rssItem.setTitle(title);
                rssItem.setLink(link);
                rssItem.setAuthor(author);
                rssItem.setDescription(description);
                rssItem.setPubDate(pubDate);

                // 중복 확인
                if (rssMapper.selectByTitle(rssItem.getTitle()) == null) {
                    insertRssItem(rssItem);
                } else {
                    System.out.println("중복된 데이터: " + rssItem.getTitle());
                } 
            }
 
        } catch (Exception e) {
            e.printStackTrace();
        }

    }
    
}
