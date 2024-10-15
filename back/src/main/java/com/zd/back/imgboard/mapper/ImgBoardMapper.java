package com.zd.back.imgboard.mapper;


import org.apache.ibatis.annotations.Mapper;

import com.zd.back.imgboard.model.ImgBoard;

@Mapper
public interface ImgBoardMapper {

    public int maxImgBoardId() throws Exception;

    public void insertImgBoard(ImgBoard dto) throws Exception; 


}
