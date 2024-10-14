package com.zd.back.login_sy.mapper;

import com.zd.back.login_sy.model.Member;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

@Mapper
public interface MemberMapper {
    void insertMember(Member member);
    Member selectMemberById(@Param("memId") String memId);
    void deleteMember(@Param("memId") String memId);
}
