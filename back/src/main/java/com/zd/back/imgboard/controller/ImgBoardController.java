package com.zd.back.imgboard.controller;

import com.zd.back.imgboard.model.Img;
import com.zd.back.imgboard.model.ImgPost;
import com.zd.back.imgboard.service.ImgPostService;
import com.zd.back.imgboard.service.ImgService;

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

    @Value("${file.upload-dir}")
    private String uploadDir;
    //application.properties 에 있는 file 경로

    private final int MAX_IMAGE_COUNT = 3;  // 최대 이미지 개수
    private final long MAX_FILE_SIZE = 100 * 1024 * 1024; // 최대 파일 크기 (10MB --스마트폰 사진은 보통 5~15MB)

    @PostMapping("/created")
    @Transactional
    public ResponseEntity<String> createImgBoard(@ModelAttribute ImgPost imgPost, @RequestParam("images") MultipartFile[] images) {
        try {
           
            int maxImgPostId = imgPostService.maxImgPostId() ;
            imgPost.setImgPostId(maxImgPostId+1);
            imgPostService.createImgPost(imgPost);

            // 1.디렉토리 확인 및 생성 
            createUploadDirectory();

            // 이미지 리스트 저장
            List<Img> imgList = new ArrayList<>();

            // 2.파일 개수 검증 
            validateImageCount(images.length);

            for (MultipartFile imgFile : images) {

               
                if(imgFile.isEmpty()){
                    return new ResponseEntity<>("최소 1개 이상의 이미지 파일이 필요합니다.", HttpStatus.BAD_REQUEST); //상태코드 400
                }
               // else if (!imgFile.isEmpty()) {

                    // 3.파일 사이즈 검증
                    validateFileSize(imgFile.getSize());

                    //4.SaveFileName 지정 및  파일 저장
                    String saveFileName = createUniqueFileName(maxImgPostId, imgFile.getOriginalFilename());
                    saveImageFile(imgFile, saveFileName);

                    // 5.Img 반환 받고 리스트에 추가
                    imgList.add(createImgObject(imgFile, maxImgPostId, saveFileName));
                //}
            }

            //  이미지 정보 DB에 저장           
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




    // 메소드 -----------------------------------------------------------

    // 1.디렉토리 확인 및 생성
    private void createUploadDirectory() {
        File directory = new File(uploadDir);
        if (!directory.exists()) {
            directory.mkdirs(); // 디렉토리 생성
        }
    }

    // 2.파일 개수 검증
    private void validateImageCount(int count) {
        if (count > MAX_IMAGE_COUNT) {
            throw new IllegalArgumentException("이미지 파일은 최대 " + MAX_IMAGE_COUNT + "개까지 업로드할 수 있습니다.");
        }
    }

    // 3.파일 사이즈 검증
    private void validateFileSize(long fileSize) {
        if (fileSize > MAX_FILE_SIZE) {
            throw new IllegalArgumentException("파일 크기는 최대 100MB까지 허용됩니다.");
        }
    }

     //4. SaveFileName 지정 및  파일 저장
    private String createUniqueFileName(int postId, String originalFilename) {
        return postId + "_" + UUID.randomUUID().toString() + "_" + originalFilename;
    }

    private void saveImageFile(MultipartFile imgFile, String saveFileName) throws IOException {

        Path savePath = Paths.get(uploadDir, saveFileName);

        InputStream inputStream = null; 

        try {
            inputStream = imgFile.getInputStream(); 
            Files.copy(inputStream, savePath);

        } finally {
            if (inputStream != null) {
                
                    inputStream.close();  
              
            }
        }
    }
    

    //5.Img  객체 생성 후 반환 - 리스트에 추가 
    private Img createImgObject(MultipartFile imgFile, int imgPostId, String saveFileName) {
        Img img = new Img();

        //imgId 경우 sequence 로 설정 
        img.setImgPostId(imgPostId+1);
        img.setOriginalFileName(imgFile.getOriginalFilename());
        img.setSaveFileName(saveFileName);
        img.setFilePath(Paths.get(uploadDir, saveFileName).toString());
        
        return img;
    }
    
}
