package com.zd.back.imgboard.controller;

import java.net.URLDecoder;
import java.net.URLEncoder;
import java.util.List;
import java.util.stream.Collectors;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.zd.back.imgboard.model.ImgPost;
import com.zd.back.imgboard.service.ImgPostService;
import com.zd.back.imgboard.util.MyPage;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;



	//찾아가는 순서 
	//Controller -> Service(c) -> Mapper(I) -> Mapper.xml
	


@RestController
@RequestMapping("/imgboard")
public class ImgPostController {
    
    @Autowired
    private ImgPostService imgPostService;

    @Autowired
    MyPage myPage;

//확인 (-)
/* @GetMapping("/created")   
public ResponseEntity<String> created(@RequestParam String memId) {
    try {
   
        return ResponseEntity.ok("여기는 get Create controller 입니다."); // 성공적으로 결과 반환
       
    } catch (Exception e) {
        return ResponseEntity.status(500).body("게시물 조회 중 오류가 발생했습니다.");
    }
}
 */

    @PostMapping("/created")
    public ResponseEntity<String> created(@RequestBody ImgPost dto) {

        //main 에서 memId 를 받아야함 (-)
        try {
            int maxImgPostId = imgPostService.maxImgPostId();
            dto.setImgPostId(maxImgPostId + 1);
            imgPostService.insertData(dto);
 
            return ResponseEntity.ok("인증게시물이 등록되었습니다.");
           
        } catch (Exception e) { //예외처리
 
            return ResponseEntity.status(500).body("게시물 등록 중 오류가 발생했습니다.");
            // 오류 발생 시 500 Internal Server Error와 같은 적절한 상태 코드를 반환
        }
    
    
    }

	// List 아닌, map 형식으로 보낼 것임 -- 확정 (-)
   @GetMapping("/list")
    public ResponseEntity<List<ImgPost>> getLists(HttpServletRequest request) { 

        try {
            String pageNum = request.getParameter("pageNum");

		int currentPage = 1;

		if (pageNum != null) {
			currentPage = Integer.parseInt(pageNum);
		}

        String searchKey = request.getParameter("searchKey");
		String searchValue = request.getParameter("searchValue");

        //검색--------------------------
		if (searchValue != null) {

			if (request.getMethod().equalsIgnoreCase("GET")) {
				searchValue = URLDecoder.decode(searchValue, "UTF-8");
			}        

		} else {
			searchKey = "subject";
			searchValue = "";
		}
        //------------------------------

        int dataCount = imgPostService.getDataCount(searchKey, searchValue);
        int numPerPage = 5;
		int totalPage = myPage.getPageCount(numPerPage, dataCount);

		if (currentPage > totalPage) {
			currentPage = totalPage;
		}

		int start = (currentPage - 1) * numPerPage + 1;
		int end = currentPage * numPerPage;

		List<ImgPost> lists =  imgPostService.getLists(start, end, searchKey, searchValue);

		// 검색 --------------------------------------
		String param = "";
		if (!searchValue.equals("")) {

			param = "?searchKey=" + searchKey;
			param += "&searchValue=" + URLEncoder.encode(searchValue, "UTF-8");    
		}    
		//---------------------------------------------

		String listUrl =  "/list.action" + param;
		String pageIndexList = myPage.pageIndexList(currentPage, totalPage, listUrl);

		String articleUrl =  "/article.action";

		if (param.equals("")) {
			articleUrl += "?pageNum=" + currentPage;    
		} else {
			articleUrl += param + "&pageNum=" + currentPage;
		}

        return ResponseEntity.ok(lists);
            
        } catch (Exception e) {
            return ResponseEntity.status(500).body(null); 
        }
    
    
    
   }







    



}
