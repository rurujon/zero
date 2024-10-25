package com.zd.back.imgboard.controller;

import com.zd.back.imgboard.model.Img;
import com.zd.back.imgboard.model.ImgBoard;
import com.zd.back.imgboard.model.ImgPost;
import com.zd.back.imgboard.service.ImgPostService;
import com.zd.back.imgboard.service.ImgService;
import com.zd.back.imgboard.service.ImgManagerService;

import lombok.RequiredArgsConstructor;


import java.io.IOException;
import java.util.List;

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
    private final ImgManagerService imgManagerService;
    //파일 업로드 위한 메소드는 ImgManagerService.java로 옮김 


    @PostMapping("/created")
    @Transactional
    public ResponseEntity<String> created(@ModelAttribute ImgPost imgPost, @RequestParam("images") MultipartFile[] images) throws Exception{
        try {
           
            int maxImgPostId = imgPostService.maxImgPostId() ;
            imgPost.setImgPostId(maxImgPostId+1);
            imgPostService.createImgPost(imgPost);

            //imgManagerService 에서 받아서 list로 저장
            List<Img> imgList = imgManagerService.uploadImages(images, maxImgPostId);

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

    @GetMapping("/list")
    public ResponseEntity<List<ImgBoard>> getImgBoards() {
        List<ImgBoard> imgBoards = imgPostService.getImgBoards();

        
        return new ResponseEntity<>(imgBoards, HttpStatus.OK);
    }
    
    @GetMapping("/article")  
    public ResponseEntity<ImgBoard> getImgPostById(@RequestParam int imgPostId) {
       try{
            ImgBoard imgBoard = imgPostService.getImgPostById(imgPostId);
            if (imgBoard == null) {
                return ResponseEntity.notFound().build(); // 게시물이 없을 경우 404 반환
            }
            return ResponseEntity.ok(imgBoard); // 게시물 반환

        } catch (Exception e) {
       
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                             .body(null); // 오류 발생 시 null 반환
        } 
    }


    @GetMapping("/updated")
    public ResponseEntity<ImgBoard> getUpdatedArticle(@RequestParam int imgPostId) {

        try {
            ImgBoard imgBoard = imgPostService.getImgPostById(imgPostId);
            if (imgBoard == null) {
                return ResponseEntity.notFound().build();

            }

            return ResponseEntity.ok(imgBoard); 

        } catch (Exception e) {
               
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                             .body(null); // 오류 발생 시 null 반환
        }
    }
    
    @PostMapping("/updated")
    public ResponseEntity<String> getUpdatedArticle_Ok(@RequestParam int imgPostId,@ModelAttribute ImgPost imgPost, @RequestParam("images") MultipartFile[] images) throws Exception {
        try{


            //원한는것 : 기존 파일은 삭제 안하고 , 대체된 옛 파일 삭제/하면서 새로운 파일 넣기 

            // 1. imgPost 업데이트 
            imgPost.setImgPostId(imgPostId);
            imgPostService.updateImgPost(imgPost);

            // 2. 기존 이미지 가져오기 
            List<Img> exImgList = imgService.getImagesByPostId(imgPostId);

            // 3. 기존 이미지 saveFileName 과 axios.post 로 보낸 데이터의 saveFileName(article통해서 가져옴) 일치 하면 삭제 안함 
            //(즉 이미지 대체 안누름)
            List<Img> newImgList = imgManagerService.uploadImages(images, imgPostId);



//===============================================================================================            
            //게시물 및 이미지 업데이트
            imgPost.setImgPostId(imgPostId);
            imgPostService.updateImgPost(imgPost);
            List<Img> imgList = imgManagerService.uploadImages(images, imgPostId);
            imgService.saveImg(imgList);
            
            //기존 이미지 DB 삭제후 물리적 파일 삭제
            List<Img> existingImages = imgService.getImagesByPostId(imgPostId);

            for (Img img : existingImages) {

                imgManagerService.deleteImages(img.getSaveFileName());
            }

            imgService.deleteImagesByPostId(imgPostId);
        
            return new ResponseEntity<>("인증 게시물이 수정되었습니다.", HttpStatus.OK);

        } catch (IllegalArgumentException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        } catch (IOException e) {
            return new ResponseEntity<>("파일 저장 중 오류가 발생했습니다.", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }



    @DeleteMapping("/deleted")
    public String deleteArticle(@RequestParam int imgPostId) {
        try {

            List<Img> images = imgService.getImagesByPostId(imgPostId); 

            //DB삭제 - 데이터 무결성 위해서 DB삭제 후 물리적 파일 삭제 해야함
            imgService.deleteImagesByPostId(imgPostId); // 먼저 이미지를 삭제
            
            // 물리적 파일 삭제
            for (Img img : images) {
                imgManagerService.deleteImages(img.getSaveFileName()); 
            }
                   
            // 이후 게시물 삭제
            imgPostService.deleteImgPostById(imgPostId); 

            return "게시물이 삭제되었습니다.";
        } catch (Exception e) {
            return "게시물 삭제에 실패했습니다: " + e.getMessage();
        }
    }
    

}