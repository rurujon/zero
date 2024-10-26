package com.zd.back.JY.domain.point;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Map;

@Service
public class PointService {

    @Autowired
    private PointMapper pointMapper;

    public PointDTO findById(String memId) {
        return pointMapper.findById(memId);
    }

    public int maxNum() {
        return pointMapper.maxNum();
    }

    @Transactional
public void insertData(String memId) {
    try {
        PointDTO dto = new PointDTO();
        int maxNum = maxNum();
        dto.setPointId(maxNum + 1);
        dto.setMemId(memId);
        dto.setGrade("LEVEL1");
        dto.setMaxPoint(50);
        dto.setUsedPoint(50);
        pointMapper.insertData(dto);
        System.out.println("포인트 데이터 삽입 완료: " + memId);
    } catch (Exception e) {
        System.err.println("포인트 데이터 삽입 중 오류 발생: " + e.getMessage());
        throw new RuntimeException("포인트 데이터 처리 중 오류가 발생했습니다.", e);
    }
}

    @Transactional
    public void updatePoint(String memId, Map<String, Object> operMap) throws Exception {
        PointDTO dto = findById(memId);
        String oper = operMap.get("oper").toString();
        int updown = parseUpdown(operMap.get("updown"));

        if (oper.equals("+")) {
            dto.setUsedPoint(dto.getUsedPoint() + updown);
            dto.setMaxPoint(dto.getMaxPoint() + updown);
        } else if (oper.equals("-")) {
            if (dto.getUsedPoint() - updown < 0) {
                throw new Exception("포인트가 부족합니다.");
            }
            dto.setUsedPoint(dto.getUsedPoint() - updown);
        }

        pointMapper.updatePoint(dto);
        updateGrade(memId);
    }

    public PointDTO findByMemId(String memId) {
        return pointMapper.findByMemId(memId);
    }

    @Transactional
    public void upPoint(String memId, int point) {
        PointDTO dto = findByMemId(memId);
        dto.setUsedPoint(dto.getUsedPoint() + point);
        dto.setMaxPoint(dto.getMaxPoint() + point);
        pointMapper.updatePoint(dto);
        updateGrade(memId);
    }

    @Transactional
    public void updateGrade(String memId) {
        PointDTO dto = findByMemId(memId);
        String newGrade;

        if (dto.getMaxPoint() >= 600) {
            newGrade = "LEVEL6";
        } else if (dto.getMaxPoint() >= 500) {
            newGrade = "LEVEL5";
        } else if (dto.getMaxPoint() >= 400) {
            newGrade = "LEVEL4";
        } else if (dto.getMaxPoint() >= 300) {
            newGrade = "LEVEL3";
        } else if (dto.getMaxPoint() >= 200) {
            newGrade = "LEVEL2";
        } else {
            newGrade = "LEVEL1";
        }

        if (!dto.getGrade().equals(newGrade)) {
            dto.setGrade(newGrade);
            pointMapper.updatePoint(dto);
        }
    }

    private int parseUpdown(Object updownValue) {
        if (updownValue instanceof Integer) {
            return (Integer) updownValue;
        } else if (updownValue instanceof String) {
            return Integer.parseInt((String) updownValue);
        } else {
            throw new IllegalArgumentException("잘못된 포인트 데이터 타입입니다.");
        }
    }

    @Transactional
    public void usePoint(String memId, int point) throws Exception {
        PointDTO dto = findByMemId(memId);
        if (dto.getUsedPoint() < point) {
            throw new Exception("사용 가능한 포인트가 부족합니다.");
        }
        dto.setUsedPoint(dto.getUsedPoint() - point);
        pointMapper.updatePoint(dto);
    }

    public int getAvailablePoint(String memId) {
        PointDTO dto = findByMemId(memId);
        return dto.getUsedPoint();
    }

    @Transactional
    public void addAttendancePoint(String memId) {
        PointDTO dto = findByMemId(memId);
        if (dto == null) {
            // 포인트 데이터가 없는 경우 새로 생성
            dto = new PointDTO();
            dto.setPointId(maxNum() + 1);
            dto.setMemId(memId);
            dto.setGrade("LEVEL1");
            dto.setMaxPoint(1);
            dto.setUsedPoint(1);
            pointMapper.insertData(dto);
            } else {
                // 기존 포인트 데이터가 있는 경우 업데이트
                dto.setUsedPoint(dto.getUsedPoint() + 1);
                dto.setMaxPoint(dto.getMaxPoint() + 1);
                pointMapper.updatePoint(dto);
            }
            updateGrade(memId);
        }
    }
