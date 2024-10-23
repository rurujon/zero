package com.zd.back.imgboard.service;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.zd.back.imgboard.mapper.ImgMapper;
import com.zd.back.imgboard.model.Img;
import com.zd.back.imgboard.model.ImgBoard;
import com.zd.back.imgboard.model.PageResponse;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ImgService {

    private final ImgMapper imgMapper;
    
    public int maxImgId() {
        return imgMapper.maxImgId();
    }

    public void saveImg(List<Img> imgList) {
        for (Img img : imgList) {
            imgMapper.insertImg(img);  // 각 이미지 정보를 DB에 저장
        }
    }
   




}
