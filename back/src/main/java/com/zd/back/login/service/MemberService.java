package com.zd.back.login.service;

import com.zd.back.login.mapper.MemberMapper;
import com.zd.back.login.model.Member;

import java.util.UUID;

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

    public String findIdByEmail(String email) {
        return memberMapper.findIdByEmail(email);
    }

    public boolean resetPassword(String memId, String email) {
        Member member = memberMapper.selectMemberById(memId);
        if (member != null && member.getEmail().equals(email)) {
            String tempPassword = UUID.randomUUID().toString().substring(0, 8);
            member.setPwd(tempPassword);
            memberMapper.updateMember(member);
            // 이메일 전송 로직 (실제 구현 필요)
            sendPasswordResetEmail(email, tempPassword);
            return true;
        }
        return false;
    }

    private void sendPasswordResetEmail(String email, String tempPassword) {
        // 이메일 전송 로직 구현
        // 실제 이메일 전송 기능을 구현해야 합니다.
        System.out.println("임시 비밀번호 " + tempPassword + "를 " + email + "로 전송했습니다.");
    }
}
