package com.zd.back.imgboard.controller;

import com.zd.back.imgboard.model.ImgBoard;
import com.zd.back.imgboard.service.ImgPostService;
import com.zd.back.imgboard.service.ImgService;

import lombok.RequiredArgsConstructor;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/imgboard")
@RequiredArgsConstructor    //의존성 주입 위함
public class ImgBoardController {
    
    private final ImgPostService imgPostService;
    private final ImgService imgService;
    
    @PostMapping("/created")
    public ResponseEntity<?> createImgBoard(@RequestBody ImgBoard imgBoard) {
        try {
            // imgPostId 설정
            int maxImgPostId = imgPostService.maxImgPostId();
            imgBoard.getImgPost().setImgPostId(maxImgPostId + 1);

            // 게시글 저장
            imgPostService.createImgPost(imgBoard.getImgPost());

            // 이미지 저장
            for (Img img : imgBoard.getImages()) {
                img.setImgPostId(imgBoard.getImgPost().getImgPostId());
                imgService.saveImg(img);
            }

            return new ResponseEntity<>(HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
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
