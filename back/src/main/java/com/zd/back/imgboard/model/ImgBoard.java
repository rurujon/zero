package com.zd.back.imgboard.model;


import java.sql.Timestamp;

import lombok.Data;

@Data
public class ImgBoard {

    private Long no;     
    private String userid; 
    private String cate;     
    private String title;     
    private String content; 
    private String filepath; // 파일 경로 
    private Timestamp created;    
    private int auth; // 인증  1 일때 인증 ,0 일때 미인증 
    private String savefilename; // 저장된 파일명   
    private String originalfilename; // 원본 파일명  
    private int point;
    private Timestamp authdate;    
    private String pwd;
   


}
