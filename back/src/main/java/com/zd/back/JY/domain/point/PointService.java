package com.zd.back.JY.domain.point;

import java.util.Map;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public interface PointService {

    public PointDTO findById(String memId);

    public int maxNum ();

    //회원가입시 데이터 추가
    @Transactional
    public void insertData(String memId);
    
    //포인트 증감
    @Transactional
    public void updatePoint(String memId, Map<String, Object> operMap) throws Exception;


    public PointDTO findByMemId(String memId);
    
    //로그인, 문제풀기 등의 포인트증가
    public void upPoint(String memId, int point);
    
}
