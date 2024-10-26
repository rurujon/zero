package com.zd.back.JY.domain.attendance;

import java.util.Date;
import java.util.List;
import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.zd.back.JY.domain.point.PointService;

@Service
public class AttendanceService {

    @Autowired
    private AttendanceMapper mapper;

    @Autowired
    private PointService pointService;

    public int maxNum() {
        return mapper.maxNum();
    }

    @Transactional
    public void insertAtt(String memId) {
        if (checkToday(memId) == 0) { // 오늘 출석하지 않은 경우에만 삽입
            Map<String, Object> map = new HashMap<>();
            map.put("memId", memId);
            map.put("attId", mapper.maxNum() + 1);
            mapper.insertAtt(map);

            // 출석 포인트 지급
            try {
                Map<String, Object> pointMap = new HashMap<>();
                pointMap.put("oper", "+");
                pointMap.put("updown", 1);
                pointService.updatePoint(memId, pointMap);
            } catch (Exception e) {
                throw new RuntimeException("출석 포인트 지급 중 오류 발생", e);
            }
        }
    }

    @Transactional
    public int checkToday(String memId) {
        return mapper.checkToday(memId); // 오늘 출석한 횟수 반환
    }

    @Transactional
    public void regiAtt(String memId) {
        AttendanceDTO dto = new AttendanceDTO();
        dto.setAttId(mapper.maxNum() + 1);
        dto.setMemId(memId);
        mapper.regiAtt(dto);
    }

    @Transactional
    public List<AttendanceDTO> getMonthlyAttendance(String memId, int year, int month) {
        return mapper.getMonthlyAttendance(memId, year, month);
    }

    @Transactional
    public List<Date> getAttendanceDates(String memId) {
        return mapper.getAttendanceDates(memId);
    }
}
