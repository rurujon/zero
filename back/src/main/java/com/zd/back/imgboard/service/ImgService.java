package com.zd.back.imgboard.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.zd.back.imgboard.mapper.ImgMapper;
import com.zd.back.imgboard.model.ImgPost;

@Service
public class ImgService {
    
    @Autowired
        private ImgMapper imgMapper;

    public int maxImgId() throws Exception{
       
        return imgMapper.maxImgId();

    }

   public void insertData(ImgPost img) throws Exception{

        imgMapper.insertImg(img);
   }





}
