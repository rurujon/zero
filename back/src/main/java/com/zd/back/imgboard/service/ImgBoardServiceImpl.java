package com.zd.back.imgboard.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.zd.back.imgboard.model.ImgBoard;

@Service
public class ImgBoardServiceImpl implements ImgBoardService {

    @Override
    public int maxNo() throws Exception {
        // TODO Auto-generated method stub
        return 0;
    }

    @Override
    public void insertImgBoard(ImgBoard dto) throws Exception {
        // TODO Auto-generated method stub
        
    }

    @Override
    public void deleteImgBoard(int no) throws Exception {
        
    }

    @Override
    public int getImgBoardCount(String searchKey, String searchValue) throws Exception {
        // TODO Auto-generated method stub
        return 0;
    }

    @Override
    public List<ImgBoard> getLists(int start, int end, String searchKey, String searchValue) throws Exception {
        // TODO Auto-generated method stub
        return null;
    }

    @Override
    public ImgBoard getReadImgBoard(int no) throws Exception {
        // TODO Auto-generated method stub
        return null;
    }

 

    @Override
    public void updateImgBoard(ImgBoard dto) throws Exception {
        // TODO Auto-generated method stub
        
    }

 
    
}
