package com.zd.back.imgboard.model;

import java.util.List;

import lombok.Data;

@Data
public class ImgBoard { //두개의 dto 통합

    private ImgPost imgPost;
    private List<Img> images; 
}
