package com.zd.back.imgboard.model;

import java.sql.Timestamp;
import lombok.Data;

@Data
public class ImgBoard {
    
    private int no;
    private String userId;
    private String cate;
    private String title;
    private String content;
    private String filePath;
    private Timestamp created;
    private String auth ;
    private String saveFileName;
    private String originalFileName;
    private int point;
    private Timestamp authDate;
    private String pwd;




}
