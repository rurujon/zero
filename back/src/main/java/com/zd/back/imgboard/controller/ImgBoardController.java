package com.zd.back.imgboard.controller;

import com.zd.back.imgboard.model.Img;
import com.zd.back.imgboard.model.ImgBoard;
import com.zd.back.imgboard.model.ImgPost;
import com.zd.back.imgboard.service.ImgPostService;
import com.zd.back.imgboard.service.ImgService;
import com.zd.back.imgboard.service.ImgUploadService;

import lombok.RequiredArgsConstructor;

import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;


@RestController
@RequestMapping("/imgboard")
@RequiredArgsConstructor  //의존성 주입 위함 
public class ImgBoardController {

    private final ImgPostService imgPostService;
    private final ImgService imgService;
    private final ImgUploadService imgUploadService;
    //파일 업로드 위한 메소드는 ImgUploadService.java로 옮김 

    @PostMapping("/created")
    @Transactional
    public ResponseEntity<String> createImgBoard(@ModelAttribute ImgPost imgPost, @RequestParam("images") MultipartFile[] images) {
        try {
           
            int maxImgPostId = imgPostService.maxImgPostId() ;
            imgPost.setImgPostId(maxImgPostId+1);
            imgPostService.createImgPost(imgPost);

            //이미지 리스트 저장
            List<Img> imgList = imgUploadService.uploadImages(images, maxImgPostId);

            //이미지 정보 DB에 저장           
            imgService.saveImg(imgList);
            return new ResponseEntity<>("인증 게시물이 등록되었습니다.", HttpStatus.CREATED);

        } catch (IllegalArgumentException e) {
            e.printStackTrace();
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        } catch (IOException e) {
            e.printStackTrace();
            return new ResponseEntity<>("파일 저장 중 오류가 발생했습니다.", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }



// list ==========================================
 @GetMapping("/list")
public ResponseEntity<List<ImgBoard>> getImgPosts() {
    List<ImgBoard> imgBoards = imgPostService.getAllImgBoardWithFirstImage();

    return new ResponseEntity<>(imgBoards, HttpStatus.OK);
}
 




}
