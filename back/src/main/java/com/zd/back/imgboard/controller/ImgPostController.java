package com.zd.back.imgboard.controller;

import java.net.URLDecoder;
import java.net.URLEncoder;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.zd.back.imgboard.model.ImgPost;
import com.zd.back.imgboard.service.ImgPostService;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;



	//찾아가는 순서 
	//Controller -> Service(c) -> Mapper(I) -> Mapper.xml
	

	@RestController
	@RequestMapping("/imgboard")
	public class ImgPostController {
	
		@Autowired
		private ImgPostService imgPostService;
	
		@PostMapping("/created") //(+)
		public ResponseEntity<String> created(@RequestBody ImgPost dto) {
			try {
				int maxImgPostId = imgPostService.maxImgPostId();
				dto.setImgPostId(maxImgPostId+1);
				imgPostService.insertData(dto);
				return ResponseEntity.ok("게시물이 등록되었습니다.");

			} catch (Exception e) {

				return ResponseEntity.status(500).body("게시물 등록 중 오류가 발생했습니다.");
				//500 에러시 메세지 뜨도록 함 
			}
		}

		@GetMapping("/list") //페이징 처리전(-)
		public ResponseEntity<Map<String, Object>> getLists() {
			try {
				List<ImgPost> lists = imgPostService.getLists();
				Map<String, Object> response = new HashMap<>();
				response.put("lists", lists);
				return ResponseEntity.ok(response);

			} catch (Exception e) {

				return ResponseEntity.status(500).body(null);
			}
		} 


		/*  페이징 처리 시
		    @GetMapping("/list")
    public ResponseEntity<Map<String, Object>> getLists(@RequestParam(defaultValue = "1") int pageNum) {
        try {
            int numPerPage = 5; // 페이지당 게시물 수
            int dataCount = imgPostService.getDataCount(); // 전체 게시물 수
            int totalPage = myPage.getPageCount(numPerPage, dataCount); // 전체 페이지 수

            if (pageNum > totalPage) {
                pageNum = totalPage; // 요청한 페이지가 총 페이지 수보다 크면 마지막 페이지로 설정
            }

            int start = (pageNum - 1) * numPerPage + 1;
            int end = pageNum * numPerPage;

            List<ImgPost> lists = imgPostService.getLists(start, end);

            // 페이지 인덱스 리스트 생성
            String listUrl = "/imgboard/list?pageNum="; // 페이지 URL
            String pageIndexList = myPage.pageIndexList(pageNum, totalPage, listUrl); // 페이지 인덱스 생성

            Map<String, Object> response = new HashMap<>();
            response.put("lists", lists);
            response.put("dataCount", dataCount);
            response.put("pageIndexList", pageIndexList); // 페이지 인덱스 리스트 추가

            return ResponseEntity.ok(response);
        } catch (Exception e) {
            return ResponseEntity.status(500).body(null);
        }
    }
		 */
	}
	