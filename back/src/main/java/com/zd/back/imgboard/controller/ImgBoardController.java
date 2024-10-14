package com.zd.back.imgboard.controller;

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

    @Autowired
    private ImgBoardService imgBoardService;

    @Autowired 
	MyPage myPage;

    @PostMapping("/imgcreated")
    public void insertImgBoard(@RequestBody ImgBoard dto) throws Exception{ 

        int maxImgBoardId = imgBoardService.maxImgBoardId();
        dto.setImgBoardId(maxImgBoardId + 1 );
        imgBoardService.insertImgBoard(dto);
        System.out.println("잘 넘어옴 ");

    }
	
    




    


    






    
}
