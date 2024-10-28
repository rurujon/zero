package com.zd.back.login.service;

import com.zd.back.JY.domain.attendance.AttendanceService;
import com.zd.back.JY.domain.point.PointService;
import com.zd.back.login.mapper.MemberMapper;
import com.zd.back.login.model.Member;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashMap;
import java.util.Map;
import java.util.UUID;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@Service
public class MemberService {

    private static final Logger logger = LoggerFactory.getLogger(MemberService.class);

    @Autowired
    private MemberMapper memberMapper;

    @Autowired
    private JavaMailSender emailSender;

    @Autowired
    private PointService pointService;

    @Autowired
    private AttendanceService attendanceService;

    private BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    @Transactional
    public void registerMember(Member member) {
        try {
            String encryptedPassword = passwordEncoder.encode(member.getPwd());
            member.setPwd(encryptedPassword);

            memberMapper.insertMember(member);
            pointService.insertData(member.getMemId());

            logger.info("회원가입 및 포인트 지급 완료: {}", member.getMemId());
        } catch (Exception e) {
            logger.error("회원가입 중 오류 발생: {}", e.getMessage(), e);
            throw new RuntimeException("회원가입 처리 중 문제가 발생했습니다: " + e.getMessage(), e);
        }
    }

    @Transactional
public Map<String, Object> validateLoginAndPerformActions(String memId, String rawPassword) {
    Map<String, Object> result = new HashMap<>();
    result.put("isValid", false);
    result.put("isFirstLoginToday", false);

    Member member = memberMapper.selectMemberById(memId);
    if (member == null || !passwordEncoder.matches(rawPassword, member.getPwd())) {
        return result;
    }

    result.put("isValid", true);

    try {
        // 출석 체크
        if (attendanceService.checkToday(memId) == 0) {
            attendanceService.insertAtt(memId); // 출석 체크

            // 오늘 처음 로그인하는 경우에만 포인트 추가
            pointService.addAttendancePoint(memId);
            result.put("isFirstLoginToday", true);
            logger.info("첫 로그인 시 출석 체크 및 포인트 추가 완료: {}", memId);
        } else {
            logger.info("오늘 이미 출석한 회원: {}", memId);
        }
    } catch (Exception e) {
        logger.error("출석 체크 또는 포인트 추가 중 오류 발생", e);
    }

    return result;
}

    public Member getMemberById(String memId) {
        return memberMapper.selectMemberById(memId);
    }

    @Transactional
    public void updateMember(Member member) {
        Member existingMember = memberMapper.selectMemberById(member.getMemId());
        if (existingMember != null) {
            if (member.getPwd() != null && !member.getPwd().isEmpty()) {
                String encryptedPassword = passwordEncoder.encode(member.getPwd());
                member.setPwd(encryptedPassword);
            } else {
                member.setPwd(existingMember.getPwd());
            }
            memberMapper.updateMember(member);
            logger.info("회원정보 수정 완료: {}", member.getMemId());
        }
    }

    @Transactional
    public void deleteMember(String memId) {
        try {
            memberMapper.deleteMember(memId);
            logger.info("회원 탈퇴 완료: {}", memId);
        } catch (Exception e) {
            logger.error("회원 탈퇴 중 오류 발생: {}", e.getMessage(), e);
            throw new RuntimeException("회원 탈퇴 처리 중 문제가 발생했습니다: " + e.getMessage(), e);
        }
    }

    public String findIdByEmail(String email) {
        return memberMapper.findIdByEmail(email);
    }

    @Transactional
    public boolean resetPassword(String memId, String email) {
        Member member = memberMapper.selectMemberById(memId);
        if (member != null && member.getEmail().equals(email)) {
            String tempPassword = generateTempPassword();
            String encryptedPassword = passwordEncoder.encode(tempPassword);
            member.setPwd(encryptedPassword);
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
        return memberMapper.countByMemId(memId) > 0;
    }

    public boolean validateLogin(String memId, String rawPassword) {
        Member member = memberMapper.selectMemberById(memId);
        if (member == null) {
            logger.info("회원 정보를 찾을 수 없음: {}", memId);
            return false;
        }
        return passwordEncoder.matches(rawPassword, member.getPwd());
    }
}
