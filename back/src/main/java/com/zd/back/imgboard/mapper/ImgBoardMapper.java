package com.zd.back.imgboard.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.zd.back.imgboard.model.ImgBoard;

@Mapper
public interface ImgBoardMapper {

    public int maxNo() throws Exception;

    public void insertImgBoard(ImgBoard dto) throws Exception; 

    public int getImgBoardCount(String searchKey, String searchValue) throws Exception ;

    public List<ImgBoard> getLists(int start, int end, String searchKey, String searchValue) throws Exception;

    public ImgBoard getReadImgBoard(int no) throws Exception;

    public void updateImgBoard(ImgBoard dto) throws Exception;

    public void deleteImgBoard(int no) throws Exception ;


}
