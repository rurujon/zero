package com.zd.back.JY.domain.attendance;

import java.util.Map;

import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface AttendanceMapper {

    public int maxNum();

    public void insertAtt(Map<String, Object> map);

    public AttendanceDTO checkToday(String memId);

    public void regiAtt(AttendanceDTO dto);
}
