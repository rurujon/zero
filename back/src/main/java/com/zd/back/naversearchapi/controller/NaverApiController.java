package com.zd.back.naversearchapi.controller;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class NaverApiController {

    @GetMapping("/api/news")
    public ResponseEntity<String> getNaverNews() {
        try {
            // 검색어 인코딩
            //String query = URLEncoder.encode("환경", StandardCharsets.UTF_8.toString());
            String query ="환경";

            // API 요청 URL 설정
            String apiURL = "https://openapi.naver.com/v1/search/news?query=" + query;

            // HTTP 헤더 설정
            HttpHeaders headers = new HttpHeaders();
            headers.set("X-Naver-Client-Id", "FuGhfkYnpnP903gHk_vs");
            headers.set("X-Naver-Client-Secret", "4hDDObuZ0E");

            HttpEntity<String> entity = new HttpEntity<>(headers);

            // API 호출 및 응답 처리
            RestTemplate restTemplate = new RestTemplate();
            ResponseEntity<String> response = restTemplate.exchange(apiURL, HttpMethod.GET, entity, String.class);

            return ResponseEntity.ok(response.getBody());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("API 요청 실패: " + e.getMessage());
        }
    }
}