package com.zd.back.service;

import com.zd.back.mapper.MemberMapper;
import com.zd.back.model.Member;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class MemberService {

    @Autowired
    private MemberMapper memberMapper;

    public void registerMember(Member member) {
        memberMapper.insertMember(member);
    }

    public Member getMemberById(String memId) {
        return memberMapper.selectMemberById(memId);
    }

    public void deleteMember(String memId) {
        memberMapper.deleteMember(memId);
    }
}
