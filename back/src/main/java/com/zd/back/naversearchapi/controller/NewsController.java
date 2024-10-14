package com.zd.back.naversearchapi.controller;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

import org.springframework.web.client.RestTemplate;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.zd.back.naversearchapi.model.User;

import javax.servlet.http.HttpSession;
import java.io.UnsupportedEncodingException;
import java.net.URLEncoder;
import java.util.HashMap;
import java.util.Map;

@Controller
public class NewsController {

    @Autowired
    private HttpSession session;

    @Autowired
    private RestTemplate restTemplate; // RestTemplate 주입

    @GetMapping("media/news")
    public String news(String searchText, Model model) {
        // 세션에서 사용자 정보 가져오기
        // User user = (User) session.getAttribute("user_info");
        // if (user != null) {
        //     int userCoins = user.getCoin();
        //     model.addAttribute("userCoin", userCoins);
        // }

        // 네이버 API 클라이언트 ID와 시크릿 설정
        String clientId = "FuGhfkYnpnP903gHk_vs";
        String clientSecret = "4hDDObuZ0E";

        // 검색어 URL 인코딩
        String text = searchText != null && !searchText.trim().isEmpty() ? searchText : "기술";
        // try {
        //     text = URLEncoder.encode(searchText, "UTF-8");
        // } catch (UnsupportedEncodingException e) {
        //     model.addAttribute("error", "검색어 인코딩 실패");
        //     return "/media/news"; // 에러 시 빈 화면으로 리턴
        // }

        // API 요청 URL 설정
        String apiURL = "https://openapi.naver.com/v1/search/news?query=" + text;

        // HTTP 헤더 설정
        HttpHeaders headers = new HttpHeaders();
        headers.set("X-Naver-Client-Id", clientId);
        headers.set("X-Naver-Client-Secret", clientSecret);
        HttpEntity<String> entity = new HttpEntity<>(headers);

        // API 호출 및 응답 처리
        ResponseEntity<String> response;
        try {
            response = restTemplate.exchange(apiURL, HttpMethod.GET, entity, String.class);
        } catch (Exception e) {
            model.addAttribute("error", "API 요청 실패: " + e.getMessage());
            return "/media/news"; // 에러 시 빈 화면으로 리턴
        }

        // JSON 응답 파싱
        ObjectMapper om = new ObjectMapper();
        Map<String, Object> json;
        try {
            json = om.readValue(response.getBody(), Map.class);
            model.addAttribute("news", json.get("items")); // 뉴스 데이터 모델에 추가
        } catch (Exception e) {
            model.addAttribute("error", "JSON 파싱 실패: " + e.getMessage());
            return "/media/news"; // 에러 시 빈 화면으로 리턴
        }

        return "/media/news"; // 정상적으로 뉴스 페이지로 리턴
    }
}