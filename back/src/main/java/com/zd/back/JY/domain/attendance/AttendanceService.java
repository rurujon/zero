package com.zd.back.JY.domain.attendance;

import java.util.Date;
import java.util.List;
import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class AttendanceService {

    @Autowired
    private AttendanceMapper mapper;

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
