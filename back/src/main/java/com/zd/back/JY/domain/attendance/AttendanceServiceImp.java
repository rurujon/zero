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
        System.out.println("insertAtt 호출 완료");
        if(checkToday(memId)){
            Map<String, Object> map = new HashMap<>();
            
            map.put("memId", memId);
            map.put("attId", maxNum()+1);
            System.out.println("출석 삽입 완료: insertAtt");
            mapper.insertAtt(map);
        }
    }

    public boolean checkToday(String memId){

        boolean flag = false;

        //null이라는건 오늘 출책을 안했다는것
        if(mapper.checkToday(memId)==null){
            System.out.println(memId + ": 오늘 첫 출석");
            return flag = true;
        }
        
        return flag;
    }

    //회원가입시 ATT데이터 생성 
    public void regiAtt(String memId){

        AttendanceDTO dto = new AttendanceDTO();

        dto.setAttId(mapper.maxNum()+1);
        dto.setMemId(memId);

        mapper.regiAtt(dto);
    } 
}
