package com.zd.back.imgboard.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.zd.back.imgboard.model.ImgBoard;
import com.zd.back.imgboard.model.ImgPost;

@Mapper
public interface ImgPostMapper {

    int maxImgPostId();

    void insertImgPost(ImgPost imgPost);

    int getDataCount();

    List<ImgBoard> getImgBoards();
    
    ImgBoard getImgPostById(int imgPostId);

    void deleteImgPostById(int imgPostId);

}
