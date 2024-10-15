package com.zd.back.imgboard.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.zd.back.imgboard.model.ImgPost;
import com.zd.back.imgboard.service.ImgPostService;
import com.zd.back.imgboard.util.MyPage;
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

    public ResponseEntity<>getCreated(){
        try{

        }catch
    }




    @PostMapping("/created")
    public String created(@RequestBody ImgPost dto) {
        try {
            int maxImgPostId = imgPostService.maxImgPostId();
            dto.setImgPostId(maxImgPostId + 1);
            imgPostService.insertData(dto);

            return "인증게시물이 등록되었습니다.";
           
        } catch (Exception e) { //예외처리

            return "게시물 등록 중 오류가 발생했습니다" ;
        }
    
    
    }

    



}
