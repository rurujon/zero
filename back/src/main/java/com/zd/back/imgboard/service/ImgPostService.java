package com.zd.back.imgboard.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.zd.back.imgboard.mapper.ImgPostMapper;
import com.zd.back.imgboard.model.Img;
import com.zd.back.imgboard.model.ImgBoard;
import com.zd.back.imgboard.model.ImgPost;
import com.zd.back.imgboard.model.PageResponse;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ImgPostService {

    private final ImgPostMapper imgPostMapper;

    public int maxImgPostId() {
        return imgPostMapper.maxImgPostId();
    }

    public void createImgPost(ImgPost imgPost) {
        imgPostMapper.insertImgPost(imgPost);
    }

    
    public int getTotalCount(String searchKey, String searchValue) {
        return imgPostMapper.getTotalCount(searchKey, searchValue); // 반환값 수정
    }

    public List<ImgBoard>  getImgBoardList(int start, int end, String searchKey, String searchValue) {
        return imgPostMapper.getImgBoardList(start, end, searchKey, searchValue);
    }
    
}
