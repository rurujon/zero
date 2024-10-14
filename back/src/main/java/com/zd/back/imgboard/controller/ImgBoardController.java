package com.zd.back.imgboard.controller;

import javax.annotation.Resource;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.zd.back.imgboard.model.ImgBoard;
import com.zd.back.imgboard.service.ImgBoardService;
import com.zd.back.imgboard.util.MyPage;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;


@RestController
@RequestMapping("/api/imgboard") 
public class ImgBoardController {

    @Resource 
    private ImgBoardService imgBoardService;




    @Autowired 
	MyPage myPage;

    @PostMapping("/created_ok")
    public void insertImgBoard(@RequestBody ImgBoard dto) throws Exception{ 

        System.out.println("잘 넘어옴 ");
    }
	
    




    


    






    
}
