package com.zd.back.imgboard.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.zd.back.imgboard.mapper.ImgMapper;
import com.zd.back.imgboard.model.Img;
import com.zd.back.imgboard.model.ImgPost;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ImgService {

    private final ImgMapper imgMapper;

    public void saveImg(Img img) {
        imgMapper.insertImg(img);
    }
}
