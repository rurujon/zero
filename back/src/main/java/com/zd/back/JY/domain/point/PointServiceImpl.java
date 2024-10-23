package com.zd.back.JY.domain.point;


import java.util.Map;

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


    //회원가입시 데이터 추가
    @Override
    public void insertData(String memId) {
        PointDTO dto = new PointDTO();
        
        int maxNum = maxNum();

        dto.setPointId(maxNum+1);
        dto.setMemId(memId);
        dto.setGrade("level0");

        pointMapper.insertData(dto);
    }

    @Override
    public PointDTO findById(String memId){
        return pointMapper.findById(memId);
    }

    @Override
    public void updatePoint(String memId, Map<String, Object> operMap) throws Exception{
        PointDTO dto = findById(memId);

        String oper = operMap.get("oper").toString();
        //map으로 가져온 updown형변환
        int updown;
        Object updownValue = operMap.get("updown");
        if (updownValue instanceof Integer) {
            updown = (Integer) updownValue;
        } else if (updownValue instanceof String) {
            updown = Integer.parseInt((String) updownValue);
        } else {
            throw new IllegalArgumentException("데이터타입이 불안전합니다");
        }

        //oper에 따른 maxPoint, usedPoint 증감
        if(oper.equals("+")){
            dto.setUsedPoint(dto.getUsedPoint()+updown);
            dto.setMaxPoint(dto.getMaxPoint()+updown);
        }else if(oper.equals("-")){
            if(dto.getUsedPoint()-updown<0){
                throw new Exception("0보다 작을 수 없습니다.");
            }
            dto.setUsedPoint(dto.getUsedPoint()-updown);
        }
        
        

        pointMapper.updatePoint(dto);

    }

    
    @Override
    public PointDTO findByMemId(String memId){
        return pointMapper.findByMemId(memId);
    }


    @Override
    public void upPoint(String memId, int point){
        PointDTO dto = findByMemId(memId);

        dto.setUsedPoint(dto.getUsedPoint()+point);
        dto.setMaxPoint(dto.getMaxPoint()+point);

        pointMapper.updatePoint(dto);
    }

    @Override
    public void updateGrade(String memId){

        PointDTO dto=findByMemId(memId);

        //maxPoint에 따른 grade 조정
        if (dto.getMaxPoint() >= 600) {
            dto.setGrade("LEVEL5");
        } else if (dto.getMaxPoint() >= 500) {
            dto.setGrade("LEVEL4");
        } else if (dto.getMaxPoint() >= 400) {
            dto.setGrade("LEVEL3");
        } else if (dto.getMaxPoint() >= 300) {
            dto.setGrade("LEVEL2");
        } else if (dto.getMaxPoint() >= 200) {
            dto.setGrade("LEVEL1");
        } else if (dto.getMaxPoint() >= 100) {
            dto.setGrade("LEVEL0");
        } else {
            dto.setGrade("LEVEL0");
        }

        pointMapper.updatePoint(dto);
       
    }
}
