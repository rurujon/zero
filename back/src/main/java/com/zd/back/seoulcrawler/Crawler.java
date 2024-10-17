package com.zd.back.seoulcrawler;

import java.util.ArrayList;
import java.util.List;

import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;

import com.zd.back.seoulcrawler.model.SeoulNews;

/**
 * Crawler
 */

//크롤러 로직을 따로 분리했습니다. 크롤링이 필요하신 분들은 가져가서 고쳐 쓰세요.

public class Crawler {

    public List<SeoulNews> SeoulNewsCrawler(int totalPage) { 
        //받아올 데이터에 맞춰 DTO를 만드시고, 그 DTO로 반환값을 바꿔주시면 됩니다.

        List<SeoulNews> seoulNewsList = new ArrayList<>();      //마찬가지로 반환값만 바꿔주세요.

        try {

            for(int i=1; i<totalPage; i++){ //페이징 수가 여럿일 때 수행하기 위한 반복문입니다.

                String url = "https://news.seoul.go.kr/env/archives/category/climate-environment-news_c1/climate-environment-news-n1/page/" + i;
                //크롤링해올 url

                Document doc = Jsoup.connect(url).get();
                //import 주의. JSOUP 꺼입니다.

                //이후로 진행되는 건 직접 F12 눌러가지고 HTML 확인해서 작업을 진행해야합니다. 매우 귀찮아요.

                /*
                    예시

                    <div class="child_PolicyDL_R">
                        <h3 class="tit"><a href="link1">제목 1</a></h3>
                        <span class="time">작성일 : 2024-10-17 <span class="part">저자</span></span>
                        <div class="topicCont">내용 1</div>
                    </div>
                    <div class="child_PolicyDL_R">
                        <h3 class="tit"><a href="link2">제목 2</a></h3>
                        <span class="time">작성일 : 2024-10-16 <span class="part">저자</span></span>
                        <div class="topicCont">내용 2</div>
                    </div>

                    이런 구조일 때,

                    Elements articles = doc.select("div.child_PolicyDL_R");

                    for (Element article : articles) {
                        String title = article.select("h3.tit a").text(); // 제목 추출
                        String link = article.select("h3.tit a").attr("href"); // 링크 추출
                        String publishedDate = article.select(".time").text(); // 작성일 추출
                        String content = article.select(".topicCont").text(); // 내용 추출

                        
                    }

                    이렇게 해 주시면 됩니다.
                 
                 */
                Elements articles = doc.select("div.child_PolicyDL_R");

                for(Element article : articles) {

                    String title = article.select("h3.tit a").text(); // 제목 추출
                    String link = article.select("h3.tit a").attr("href"); // 링크 추출
                    String publishedDate = article.select(".time").text(); // 작성일 추출
                    String content = article.select(".topicCont").text(); // 내용 추출

                    SeoulNews seoulNews = new SeoulNews(title,link,content,publishedDate);

                    seoulNewsList.add(seoulNews);

                }


            }
            
        } catch (Exception e) {
            // TODO: handle exception
            e.printStackTrace(); // 예외 메시지 출력
        }

        return seoulNewsList;
    }

    
}