package com.zd.back.imgboard.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.springframework.data.repository.query.Param;

import com.zd.back.imgboard.model.ImgBoard;
import com.zd.back.imgboard.model.ImgPost;

@Mapper
public interface ImgPostMapper {

    int maxImgPostId();

    void insertImgPost(ImgPost imgPost);

    List<ImgPost> selectImgPosts(@Param("start") int start, @Param("end") int end, 
    @Param("searchKey") String searchKey, @Param("searchValue") String searchValue);
int countImgPosts(@Param("searchKey") String searchKey, @Param("searchValue") String searchValue);

}
