package com.zd.back.imgboard.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.zd.back.imgboard.mapper.ImgBoardMapper;
import org.springframework.stereotype.Service;

import com.zd.back.imgboard.model.ImgBoard;

@Service
public class ImgBoardServiceImpl implements ImgBoardService {

    @Autowired
    private ImgBoardMapper imgBoardMapper;

    @Override
    public int maxImgBoardId() throws Exception {
    
        return imgBoardMapper.maxImgBoardId();
    }

    @Override
    public void insertImgBoard(ImgBoard dto) throws Exception {
        imgBoardMapper.insertImgBoard(dto);
        
    }

/* 

    @Override
    public int getImgBoardCount(String searchKey, String searchValue) throws Exception {
        return imgBoardMapper.getImgBoardCount(searchKey, searchValue);
    }

    @Override
    public List<ImgBoard> getLists(int start, int end, String searchKey, String searchValue) throws Exception {
       
        return imgBoardMapper.getLists(start, end, searchKey, searchValue);
    }

    @Override
    public ImgBoard getReadImgBoard(int no) throws Exception {
        return imgBoardMapper.getReadImgBoard(no);
    }

    @Override
    public void updateImgBoard(ImgBoard dto) throws Exception {
        imgBoardMapper.updateImgBoard(dto);        
    }
    
    @Override
    public void deleteImgBoard(int no) throws Exception {
        imgBoardMapper.deleteImgBoard(no);
    }
  */
    
}
