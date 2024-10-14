package com.zd.back.JY.domain.point;

import java.util.Map;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public interface PointService {

    public PointDTO findById(int id);

    public int maxNum ();

    @Transactional
    public void insertData(PointDTO dto);
    @Transactional
    public void updatePoint(PointDTO dto);


    
    
}
