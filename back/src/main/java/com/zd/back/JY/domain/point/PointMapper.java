package com.zd.back.domain.point;


import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface PointMapper {
    public int maxNum();

    public void insertData(PointDTO dto);
    
    public void updatePoint(PointDTO dto);

    public PointDTO findById(int id);
} 
