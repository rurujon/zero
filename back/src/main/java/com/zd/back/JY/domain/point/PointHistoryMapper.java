package com.zd.back.JY.domain.point;

import org.apache.ibatis.annotations.Mapper;
import java.util.List;

@Mapper
public interface PointHistoryMapper {
    void insertPointHistory(PointHistoryDTO pointHistory);
    List<PointHistoryDTO> getPointHistoryByMemId(String memId);
    void deleteByMemId(String memId);
}
