package com.zd.back.JY.domain.point;


import lombok.Data;

@Data
public class PointDTO {
    private int pointid;
    private int maxPoint;
    private int usedPoint;
    private String memId;
    private String grade;
}
