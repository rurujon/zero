package com.zd.back.JY.domain.attendance;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AttendanceServiceImp implements AttendanceService{
    
    @Autowired
    private AttendanceMapper mapper;

    public int maxNum(){
        return mapper.maxNum();
    }

    //로그인시 사용자의 아이디를 입력받아서 오늘 출석여부에따라 출석 삽입
    public void insertAtt(String memId){


        if(checkToday(memId)){
            
            Map<String, Object> map = new HashMap<>();
            
            map.put("memId", memId);
            map.put("attId", mapper.maxNum()+1);
            
            
            mapper.insertAtt(map);

        }

    }

    public boolean checkToday(String memId){

        boolean flag = false;

        if(mapper.checkToday(memId)!=null){
            return flag = true;
        }
        

        return flag;
    }

}
