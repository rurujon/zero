package com.zd.back.imgboard.controller;

import java.util.List;

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


	//찾아가는 순서 
	//Controller -> Service(c) -> Mapper(I) -> Mapper.xml
	


@RestController
@RequestMapping("/imgboard")
public class ImgPostController {
    
    @Autowired
    private ImgPostService imgPostService;

    @Autowired
    MyPage myPage;


    @GetMapping("/created")
    public ResponseEntity<List<ImgPost>> getImgCreated() { 
     /*    try {
            List<ImgPost> imgPosts = imgPostService.getAllImgPosts(); // 서비스 메서드 호출
            return ResponseEntity.ok(imgPosts); // 성공적으로 데이터 반환
        } catch (Exception e) {
            return ResponseEntity.status(500).body(null); // 에러 발생 시 500 상태 코드 반환
        } */
    
    
    
    
    }
 

    




    @PostMapping("/created")
    public ResponseEntity<String> created(@RequestBody ImgPost dto) {
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

    



}