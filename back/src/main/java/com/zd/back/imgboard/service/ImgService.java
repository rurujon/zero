package com.zd.back.imgboard.service;

import java.util.List;
import org.springframework.stereotype.Service;
import com.zd.back.imgboard.mapper.ImgMapper;
import com.zd.back.imgboard.model.Img;
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
