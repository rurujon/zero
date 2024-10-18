package com.zd.back.imgboard.mapper;

import org.apache.ibatis.annotations.Mapper;

import com.zd.back.imgboard.model.Img;

@Mapper
public interface ImgMapper {
    
    int maxImgId();
    void insertImg(Img img);
}
