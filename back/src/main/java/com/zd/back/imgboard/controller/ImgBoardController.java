package com.zd.back.imgboard.controller;

import javax.annotation.Resource;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.zd.back.imgboard.service.ImgBoardService;
import com.zd.back.imgboard.util.MyPage;

@RestController
@RequestMapping("/api/imgboard") 
public class ImgBoardController {

    @Resource 
    private ImgBoardService imgBoardService;

    @Autowired 
	MyPage myPage;






    


    






    
}
