package com.zd.back.login.service;

import com.zd.back.login.mapper.MemberMapper;
import com.zd.back.login.model.Member;
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

    public void updateMember(Member member) {
        memberMapper.updateMember(member);
    }

    public void deleteMember(String memId) {
        memberMapper.deleteMember(memId);
    }
}
