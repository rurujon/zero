package com.zd.back.imgboard.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.zd.back.imgboard.mapper.ImgPostMapper;
import com.zd.back.imgboard.model.Img;
import com.zd.back.imgboard.model.ImgBoard;
import com.zd.back.imgboard.model.ImgPost;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ImgPostService {

    private final ImgPostMapper imgPostMapper;

    public int maxImgPostId() {
        return imgPostMapper.maxImgPostId();
    }

    public void createImgPost(ImgPost imgPost) {
        imgPostMapper.insertImgPost(imgPost);
    }

    public List<ImgBoard> getAllImgBoardWithFirstImage() {
        return imgPostMapper.getAllImgBoardWithFirstImage();
    }
    

}
