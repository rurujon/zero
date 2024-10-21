package com.zd.back.imgboard.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.zd.back.imgboard.model.Img;

@Mapper
public interface ImgMapper {
    
    int maxImgId();
    void insertImg(Img img);
    List<Img> getImgsByImgPostId(Long imgPostId);

}
