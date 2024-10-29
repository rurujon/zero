package com.zd.back.imgboard.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.zd.back.imgboard.mapper.ImgPostMapper;
import com.zd.back.imgboard.model.ImgBoard;
import com.zd.back.imgboard.model.ImgPost;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ImgPostService {

    private final ImgPostMapper imgPostMapper;

    public int maxImgPostId() throws Exception{
        return imgPostMapper.maxImgPostId();
    }

    public void createImgPost(ImgPost imgPost)throws Exception {
        imgPostMapper.insertImgPost(imgPost);
    }

    public int getDataCount() {
        return imgPostMapper.getDataCount();
    }
    public List<ImgBoard> getImgBoards() {
        return imgPostMapper.getImgBoards();
    }

    public ImgBoard getImgPostById(int imgPostId) {
        return imgPostMapper.getImgPostById(imgPostId); 
    }

    public void updateImgPost(ImgPost imgPost){
        imgPostMapper.updateImgPost(imgPost);
    }

    public void deleteImgPostById(int imgPostId) {
        imgPostMapper.deleteImgPostById(imgPostId);
    }

    public void updateAuth(int imgPostId) {
        imgPostMapper.updateAuth(imgPostId);
    }




}
