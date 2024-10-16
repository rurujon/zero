package com.zd.back.imgboard.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.zd.back.imgboard.mapper.ImgPostMapper;
import com.zd.back.imgboard.model.ImgPost;

@Service
public class ImgPostService {
    
    @Autowired
    private ImgPostMapper imgPostMapper;

    public int maxImgPostId() throws Exception{
       
        return imgPostMapper.maxImgPostId();

    }

   public void insertData(ImgPost dto) throws Exception{
        imgPostMapper.insertData(dto);
   }



    public List<ImgPost> getLists() throws Exception {
        return imgPostMapper.getLists();
    }



}
