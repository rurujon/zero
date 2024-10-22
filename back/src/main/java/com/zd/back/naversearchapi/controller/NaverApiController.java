package com.zd.back.naversearchapi.controller;
import org.apache.commons.text.StringEscapeUtils;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

import com.zd.back.naversearchapi.NaverNewsCrawl;
import com.zd.back.naversearchapi.ReadNaverJSON;
import com.zd.back.naversearchapi.model.News;
import com.zd.back.naversearchapi.service.SearchApiService;

import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/naver")
public class NaverApiController {

    @Autowired
    private SearchApiService searchApiService;


    //뉴스 갱신
    @PostMapping("/news/update")
    public ResponseEntity<Map<Integer,Map<String,String>>> getNaverNews() {
        try {
            // 검색어 설정
            String mainKeyword = "환경 보호";
            String additionalKeywords = "기후변화 OR 재활용 OR 친환경 or 제로웨이스트 or 리싸이클링 or 업싸이클링";
            String excludeKeywords = "-정치 -연예 -스포츠";

            // 검색 쿼리 조합
            String query = mainKeyword + " (" + additionalKeywords + ") " + excludeKeywords;

            // URL 인코딩
            String encodedQuery = URLEncoder.encode(query, StandardCharsets.UTF_8.toString());

            // API 요청 URL 설정
            String apiURL = "https://openapi.naver.com/v1/search/news?query=" + encodedQuery + "&display=50&sort=date";

            // HTTP 헤더 설정
            HttpHeaders headers = new HttpHeaders();
            headers.set("X-Naver-Client-Id", "FuGhfkYnpnP903gHk_vs");
            headers.set("X-Naver-Client-Secret", "4hDDObuZ0E");

            HttpEntity<String> entity = new HttpEntity<>(headers);

            // API 호출 및 응답 처리
            RestTemplate restTemplate = new RestTemplate();
            ResponseEntity<String> response = restTemplate.exchange(apiURL, HttpMethod.GET, entity, String.class);

            //----------- 여기까지가, 네이버 api에서 db를 가져오는 과정 ------------------
            //이렇게 받아온 db의 데이터는 JSONObject 안에 item 이란 이름의 JSONArray를 품고 있는 형태다.
            //우리에게 필요한 건 이 item이란 이름의 JSONArray를 추출해 데이터화 시키는 것.
            //한 번 여기 단계에서 응답으로 온 데이터를 그대로 리액트로 출력해 확인해 보시는 걸 추천드려요.

            //JSON 응답 파싱
            JSONObject jsonResponse = (JSONObject) new JSONParser().parse(response.getBody());
            JSONArray naverNewsArray = (JSONArray) jsonResponse.get("items");


            //JSON 데이터 Map 형식 변환
            ReadNaverJSON readNaverJSON = new ReadNaverJSON();
            Map<Integer,Map<String,String>> newsMap = readNaverJSON.unzipArray(naverNewsArray);


            // 뉴스 데이터를 pubDate 기준으로 정렬
            // 네이버 api 에서 가져오는 데이터는 기본적으로 최신순으로 정렬되어 제공되지만, 네트워크 지연이나 비동기 처리로 인해 순서가 미묘하게 바뀔 수 있습니다.
            //그래서 갱신을 할 때마다 순서가 미묘하게 바뀌더라고요
            //그래서 따로 정렬하는 과정이 필요합니다.
            //서버에서 해도 되고 클라이언트에서 해도 되지만, 저는 서버에서 DB에 넣기 전에 정렬 과정을 거치도록 했습니다.
            List<Map<String, String>> sortedNews = newsMap.values().stream()
                .sorted((news1, news2) -> {
                    String date1 = news1.get("pubDate");
                    String date2 = news2.get("pubDate");
                    return date2.compareTo(date1); // 최신 뉴스부터 정렬
                })
                .collect(Collectors.toList());


            // Map 데이터를 News 객체로 변환하여 DB에 저장
            for (Map<String, String> newsData : sortedNews) {

                // HTML 태그 제거 (정규식 사용) 및 HTML 엔티티 디코딩
                String cleanedTitle = cleanText(newsData.get("title"));
                String cleanedDescription = cleanText(newsData.get("description"));

                News news = new News();
                news.setTitle(cleanedTitle);

                news.setLink(newsData.get("link"));
                news.setDescription(cleanedDescription);
                news.setPubDate(newsData.get("pubDate"));

                // 뉴스가 이미 존재하는지 확인하고 저장
                // 확인은 title의 일치여부로 확인하며, 서비스에 있습니다.
                searchApiService.insertNews(news);
            }


            return ResponseEntity.ok(newsMap);

        } catch (Exception e) {
            Map<String, String> errorMap = new HashMap<>();
            errorMap.put("error", "API 요청 실패: " + e.getMessage());
            Map<Integer, Map<String, String>> responseMap = new HashMap<>();
            responseMap.put(-1, errorMap);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(responseMap);
        }
    }

    @GetMapping("/news")  // DB에서 뉴스 가져오기
    public ResponseEntity<List<News>> getAllNews() {
        try {
            List<News> newsList = searchApiService.getAllNews(); // DB에서 뉴스 가져오기
            return ResponseEntity.ok(newsList);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(null);
        }
    }

    @Scheduled(fixedRate = 600000) // 10분마다 실행
    public void scheduleNewsUpdate() {
        try {
            getNaverNews();
            System.out.println("뉴스 자동 갱신 완료: " + new Date());
        } catch (Exception e) {
            System.err.println("뉴스 자동 갱신 실패: " + e.getMessage());
        }
    }

    @GetMapping("/news/search")
    public ResponseEntity<List<News>> searchNews(@RequestParam("keyword") String keyword) {
        List<News> searchResults = searchApiService.searchNews(keyword);
        return ResponseEntity.ok(searchResults);
    }

    @GetMapping("/news/miniNews")
    public ResponseEntity<List<News>> searchMiniNews() {
        List<News> miniNews = searchApiService.miniNews();
        return ResponseEntity.ok(miniNews);
    }

    // HTML 태그 제거 및 엔티티 디코딩 메서드
    private String cleanText(String input) {
        // 1. HTML 태그 제거 (정규식)
        String noHtml = input.replaceAll("<[^>]*>", "");

        // 2. HTML 엔티티 디코딩 (&quot;, &amp; 등)
        String decodedText = StringEscapeUtils.unescapeHtml4(noHtml);

        return decodedText;
    }



}
