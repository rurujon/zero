package com.zd.back.login.service;

import com.zd.back.login.mapper.MemberMapper;
import com.zd.back.login.model.Member;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import java.util.UUID;



@Service
public class MemberService {

    @Autowired
    private MemberMapper memberMapper;

    @Autowired
    private JavaMailSender emailSender;

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
            sendPasswordResetEmail(email, tempPassword);
            return true;
        }
        return false;
    }

    private String generateTempPassword() {
        return UUID.randomUUID().toString().substring(0, 8);
    }

    private void sendPasswordResetEmail(String email, String tempPassword) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(email);
        message.setSubject("비밀번호 재설정");
        message.setText("임시 비밀번호: " + tempPassword);
        emailSender.send(message);
    }

    public boolean isIdDuplicate(String memId) {
        return memberMapper.countByMemId(memId) > 0; // 0보다 크면 중복된 아이디
    }
}
