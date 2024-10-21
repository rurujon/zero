package com.zd.back.JY.domain.attendance;

public interface AttendanceService {
    

    public int maxNum ();

    public void insertAtt(String memId);

    public boolean checkToday(String memId);

}
