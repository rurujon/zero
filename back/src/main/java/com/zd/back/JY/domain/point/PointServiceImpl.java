package com.zd.back.domain.point;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class PointServiceImpl implements PointService {

    @Autowired
    private PointMapper pointMapper;
    

    @Override
    public int maxNum() {
        return pointMapper.maxNum();
    }

    @Override
    public void insertData(PointDTO dto) {
        pointMapper.insertData(dto);
    }

    @Override
    public PointDTO findById(int id){
        return pointMapper.findById(id);
    }

    @Override
    public void updatePoint(PointDTO dto){
        pointMapper.updatePoint(dto);
    }

    



}
