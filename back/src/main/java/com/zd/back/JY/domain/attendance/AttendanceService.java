package com.zd.back.JY.domain.attendance;

import java.util.Date;
import java.util.List;

import org.springframework.transaction.annotation.Transactional;

public interface AttendanceService {

    public int maxNum();

    @Transactional
    public void insertAtt(String memId);

    @Transactional
    public int checkToday(String memId); // boolean에서 int로 변경

    @Transactional
    public void regiAtt(String memId);

    @Transactional
    public List<AttendanceDTO> getMonthlyAttendance(String memId, int year, int month);

    @Transactional
    public List<Date> getAttendanceDates(String memId);
}

