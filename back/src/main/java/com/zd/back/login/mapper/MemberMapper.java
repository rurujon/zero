package com.zd.back.login.mapper;

import com.zd.back.login.model.Member;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

@Mapper
public interface MemberMapper {
    void insertMember(Member member);
    Member selectMemberById(@Param("memId") String memId);
    void updateMember(Member member);
    void deleteMember(@Param("memId") String memId);
    String findIdByEmail(@Param("email") String email);
    int countByMemId(@Param("memId") String memId);
    int countByEmail(@Param("email") String email);
}
