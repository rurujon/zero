package com.zd.back.imgboard.controller;

import com.zd.back.imgboard.model.ImgBoard;
import com.zd.back.imgboard.service.ImgPostService;
import com.zd.back.imgboard.service.ImgService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/imgboard")
public class ImgBoardController {  //post + img controller 통합 

    @Autowired
    private ImgPostService imgPostService;

    @Autowired
    private ImgService imgService;

    @PostMapping("/created")
    public void createImgBoard(@RequestBody ImgBoard imgBoard) {

        int maxImgPostId = imgPostService.maxImgPostId();
        imgBoard.getImgPost().setImgPostId(maxImgPostId + 1); 

        // 게시글 저장
        imgPostService.insertPost(imgBoard.getImgPost());

        // 이미지 저장
        for (Img img : imgBoard.getImages()) {
            img.setImgPostId(imgBoard.getImgPost().getImgPostId()); // imgPostId 설정
            imgService.insertImage(img);
        }
    }

    @GetMapping("/list")
    public List<ImgPost> getPosts() {
        return imgPostService.getAllPosts();
    }
}
