package com.zd.back.JY.domain.attendance;

import org.springframework.transaction.annotation.Transactional;

public interface AttendanceService {
    

    public int maxNum ();

    @Transactional
    public void insertAtt(String memId);

    @Transactional
    public boolean checkToday(String memId);

    @Transactional
    public void regiAtt(String memId);
}
