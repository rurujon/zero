package com.zd.back.board.model;

import lombok.Data;

import java.util.Date;

import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor 
@AllArgsConstructor
public class Board {

    private int boardno;
    private String memId;
    private String title;
    private String content;
    private String category;
    private int hitcount;
    private int del;
    
}
