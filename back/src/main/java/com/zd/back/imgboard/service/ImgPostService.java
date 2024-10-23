package com.zd.back.imgboard.service;

import java.util.HashMap;
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



public Map<String, Object> getImgBoardList(int page, int size, String searchKey, String searchValue) {
    int start = (page - 1) * size + 1;
    int end = page * size;

    Map<String, Object> params = new HashMap<>();
    params.put("start", start);
    params.put("end", end);
    params.put("searchKey", searchKey);
    params.put("searchValue", searchValue);

    List<ImgBoard> imgBoardList = imgPostMapper.getImgBoardList(params);
    int totalCount = imgPostMapper.getTotalCount(params);

    Map<String, Object> result = new HashMap<>();
    result.put("imgBoardList", imgBoardList);
    result.put("totalCount", totalCount);
    result.put("totalPages", (int) Math.ceil((double) totalCount / size));

    return result;
}

    
}
