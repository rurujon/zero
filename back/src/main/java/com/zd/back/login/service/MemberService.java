package com.zd.back.login.service;

import com.zd.back.login.mapper.MemberMapper;
import com.zd.back.login.model.Member;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
public class MemberService {

    @Autowired
    private MemberMapper memberMapper;

    @Autowired
    private JavaMailSender emailSender;

    private BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    public void registerMember(Member member) {
        // 비밀번호를 BCrypt로 암호화
        String encryptedPassword = passwordEncoder.encode(member.getPwd());
        System.out.println("암호화된 비밀번호: " + encryptedPassword); // 콘솔에 출력해 확인
        member.setPwd(encryptedPassword);
        memberMapper.insertMember(member);
        
    }

    public Member getMemberById(String memId) {
        return memberMapper.selectMemberById(memId);
    }

    public void updateMember(Member member) {
        String encryptedPassword = passwordEncoder.encode(member.getPwd());
        System.out.println("암호화된 비밀번호: " + encryptedPassword);
        member.setPwd(encryptedPassword);
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
            String tempPassword = generateTempPassword();
            member.setPwd(tempPassword);
            sendPasswordResetEmail(email, tempPassword);

            String encryptedPassword = passwordEncoder.encode(member.getPwd());
            System.out.println("암호화된 비밀번호: " + encryptedPassword);
            member.setPwd(encryptedPassword);

            memberMapper.updateMember(member);

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
        return memberMapper.countByMemId(memId) > 0;
    }

    public boolean validateLogin(String memId, String rawPassword) {
        // 데이터베이스에서 사용자 정보 조회
        Member member = memberMapper.selectMemberById(memId);
        if (member == null) {
            System.out.println("회원 정보를 찾을 수 없음");
            return false; // 회원 정보가 없을 경우
        }
    
        System.out.println("DB에서 가져온 암호화된 비밀번호: " + member.getPwd());
        System.out.println("사용자가 입력한 비밀번호: " + rawPassword);
    
        // 입력한 비밀번호와 암호화된 비밀번호를 비교
        boolean isPasswordMatch = passwordEncoder.matches(rawPassword, member.getPwd());
        System.out.println("비밀번호 일치 여부: " + isPasswordMatch);
    
        return isPasswordMatch;
    }

}
