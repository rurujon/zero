package com.zd.back.imgboard.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.zd.back.imgboard.mapper.ImgPostMapper;
import com.zd.back.imgboard.model.Img;
import com.zd.back.imgboard.model.ImgBoard;
import com.zd.back.imgboard.model.ImgPost;

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

    public Map<String, Object> getImgPosts(int start, int end, String searchKey, String searchValue) {
        List<ImgPost> imgPosts = imgPostMapper.selectImgPosts(start, end, searchKey, searchValue);
        int totalCount = imgPostMapper.countImgPosts(searchKey, searchValue);

        Map<String, Object> result = new HashMap<>();
        result.put("imgPosts", imgPosts);
        result.put("totalCount", totalCount);
        return result;
    }
}
