package com.zd.back.imgboard.controller;

import com.zd.back.imgboard.model.Img;
import com.zd.back.imgboard.model.ImgBoard;
import com.zd.back.imgboard.service.ImgPostService;
import com.zd.back.imgboard.service.ImgService;

import lombok.RequiredArgsConstructor;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/imgboard")
@RequiredArgsConstructor    //의존성 주입 위함
public class ImgBoardController {
    
    private final ImgPostService imgPostService;
    private final ImgService imgService;
    
    @PostMapping("/created")
    public ResponseEntity<String> createImgBoard(@RequestBody ImgBoard imgBoard) {
        try {
          
            //ImgPostId
            int maxImgPostId = imgPostService.maxImgPostId();
            imgBoard.getImgPost().setImgPostId(maxImgPostId + 1);
            imgPostService.createImgPost(imgBoard.getImgPost());

            // 이미지 저장
            for (Img img : imgBoard.getImages()) {
                img.setImgPostId(imgBoard.getImgPost().getImgPostId());
                imgService.saveImg(img);
            }

             return new ResponseEntity<>("인증 게시물이 등록되었습니다.", HttpStatus.CREATED);  //Increated.js에 메세지 반환
        } catch (Exception e) {
            return new ResponseEntity<>("게시물 등록 중 오류가 발생했습니다.", HttpStatus.INTERNAL_SERVER_ERROR);  
        }
    }

    @GetMapping("/list")
    public ResponseEntity<List<ImgBoard>> getImgBoardList() {
        try {
            List<ImgBoard> imgBoardList = imgPostService.getAllImgBoards();
            return new ResponseEntity<>(imgBoardList, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
