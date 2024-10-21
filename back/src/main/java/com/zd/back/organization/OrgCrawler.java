package com.zd.back.organization;

import java.util.ArrayList;
import java.util.List;

import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;

/**
 * Crawler
 */

public class OrgCrawler {

    public List<OrgData> PatagoniaCrawl() { 
        // Grantee는 location, name, description을 담을 DTO로 가정하고 작성합니다.
        List<OrgData> orgLists = new ArrayList<>();  

        try {
            String url = "https://www.patagonia.co.kr/actionworks/home";

            Document doc = Jsoup.connect(url).get();  // Jsoup을 사용하여 페이지를 가져옵니다.

            // 크롤링할 HTML 요소들을 선택합니다.
            Elements articles = doc.select("div.ptg__actionworks__grantees__card__container");

            for (Element article : articles) {
                // 각 카드에서 location, name, description을 추출합니다.
                String location = article.select(".ptg__actionworks__grantees__card__content-location").text();
                String name = article.select("h3.ptg__actionworks__grantees__card__content-name").text();
                String description = article.select("p.ptg__actionworks__grantees__card__content-description").text();

                String link = "";

                // DTO 객체 생성 (Grantee는 DTO로 가정)
                OrgData orgData = new OrgData(location, name, description, link);

                // 리스트에 추가
                orgLists.add(orgData);
            }
            

        } catch (Exception e) {
            e.printStackTrace(); // 예외 처리
        }

        return orgLists;  // 추출된 데이터를 반환
    }
}