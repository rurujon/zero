package com.zd.back.imgboard.controller;

import com.zd.back.imgboard.model.Img;
import com.zd.back.imgboard.model.ImgBoard;
import com.zd.back.imgboard.model.ImgPost;
import com.zd.back.imgboard.service.ImgPostService;
import com.zd.back.imgboard.service.ImgService;

import lombok.RequiredArgsConstructor;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

import org.apache.ibatis.javassist.bytecode.analysis.MultiType;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.autoconfigure.couchbase.CouchbaseProperties.Io;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/imgboard")
@RequiredArgsConstructor    //의존성 주입 위함
public class ImgBoardController {
    
    private final ImgPostService imgPostService;
    private final ImgService imgService;

    @Value("${file.upload-dir}") // application.properties 에 설정된 파일 경로
    private String uploadDir;

    private final int MAX_IMAGE_COUNT = 3;  // 최대 이미지 갯수 제한
    private final int MAX_FILE_SIZE = 1 * 1024 * 1024; 
    @PostMapping("/created")
public ResponseEntity<String> createImgBoard(@ModelAttribute ImgPost imgPost, @RequestParam("images") MultipartFile[] images) {
    try {
        // ImgPostId 
        int maxImgPostId = imgPostService.maxImgPostId();
        imgPost.setImgPostId(maxImgPostId + 1);
        imgPostService.createImgPost(imgPost);

        // 이미지 List 로 저장 
        List<Img> imgList = new ArrayList<>();

        // 파일 갯수 검증
        if (images.length > MAX_IMAGE_COUNT) {
            throw new IllegalArgumentException("이미지 파일은 최대 " + MAX_IMAGE_COUNT + "개까지 업로드할 수 있습니다.");
        }


        for (MultipartFile imgFile : images) {
            if (!imgFile.isEmpty()) { 


                // 파일 사이즈 검증
                if (imgFile.getSize() > MAX_FILE_SIZE) {
                    throw new IllegalArgumentException("파일 크기는 최대 1MB까지 허용됩니다.");
                }

                // 저장된 이름 난수로 만듦 
                String saveFileName = maxImgPostId + "_" + UUID.randomUUID().toString() + "_" + imgFile.getOriginalFilename();
                Path savePath = Paths.get(uploadDir, saveFileName);

                // 파일 저장
                Files.copy(imgFile.getInputStream(), savePath);

                // Img 객체 생성 및 설정
                int maxImgId = imgService.maxImgId();

                Img img = new Img();

                img.setImgId(maxImgId+1);
                img.setImgPostId(maxImgPostId); 
                img.setOriginalFileName(imgFile.getOriginalFilename());
                img.setSaveFileName(saveFileName);
                img.setFilePath(savePath.toString());

                // Img 객체를 리스트에 추가
                imgList.add(img);
            }
        }

        // 모든 이미지 정보를 ImgService에 전달하여 DB에 저장
        imgService.saveImg(imgList);

        return new ResponseEntity<>("인증 게시물이 등록되었습니다.", HttpStatus.CREATED);
    } catch (IllegalArgumentException e) {
        return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
    } catch (IOException e) {
        return new ResponseEntity<>("파일 저장 중 오류가 발생했습니다.", HttpStatus.INTERNAL_SERVER_ERROR);
    }
}
/* 

    @GetMapping("/list")
    public ResponseEntity<List<ImgBoard>> getImgBoardList() {
        try {
            List<ImgBoard> imgBoardList = imgPostService.getAllImgBoards();
            return new ResponseEntity<>(imgBoardList, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    } */




}
