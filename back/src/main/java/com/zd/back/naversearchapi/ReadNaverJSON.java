package com.zd.back.naversearchapi;

import java.util.HashMap;
import java.util.Map;

import org.json.simple.JSONArray;
import org.json.simple.JSONObject;

public class ReadNaverJSON {

    public Map<Integer, Map<String,String>> unzipArray(JSONArray array) {

        Map<Integer, Map<String,String>> map = new HashMap<>();

        try {
            
            if (array != null) {
                for (int i = 0; i < array.size(); i++) {
                    JSONObject object = (JSONObject) array.get(i);
                    int id = i; // ID로 사용

                    // 필요한 데이터 추출
                    String title = (String) object.get("title");
                    String originalLink = (String) object.get("originallink");
                    String link = (String) object.get("link");
                    String description = (String) object.get("description");
                    String pubDate = (String) object.get("pubDate");

                    // 각 뉴스 기사의 정보를 Map에 저장
                    Map<String, String> newsData = new HashMap<>();
                    newsData.put("title", title);
                    newsData.put("originalLink", originalLink);
                    newsData.put("link", link);
                    newsData.put("description", description);
                    newsData.put("pubDate", pubDate);

                    // ID와 뉴스 데이터의 맵을 저장
                    map.put(id, newsData);
                }
            } else {
                throw new NullPointerException("JSONArray is null");
            }


        } catch (Exception e) {

            e.printStackTrace();
            System.out.println("널포인트 예외");

        }


        return map;
    }
    
}
