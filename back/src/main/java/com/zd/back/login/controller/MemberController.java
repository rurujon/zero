package com.zd.back.login.controller;

import com.zd.back.JY.domain.attendance.AttendanceService;
import com.zd.back.JY.domain.point.PointService;
import com.zd.back.login.model.Member;
import com.zd.back.login.service.MemberService;
import com.zd.back.login.security.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.HashMap;
import java.util.Map;
import java.util.stream.Collectors;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@RestController
@RequestMapping("/member")
public class MemberController {

    private static final Logger logger = LoggerFactory.getLogger(MemberController.class);

    @Autowired
    private AttendanceService attendanceService;

    @Autowired
    private MemberService memberService;

    @Autowired
    private PointService pointService;

    @Autowired
    private JwtUtil jwtUtil;

    @PostMapping("/register")
    public ResponseEntity<?> registerMember(@Valid @RequestBody Member member, BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            String errors = bindingResult.getAllErrors().stream()
            .map(error -> error.getDefaultMessage())
            .collect(Collectors.joining(", "));
            return ResponseEntity.badRequest().body(errors);
        }

        if (!member.isTermsAccepted()) {
            return ResponseEntity.badRequest().body("이용약관에 동의해야 합니다.");
        }

        try {
            memberService.registerMember(member);
            attendanceService.regiAtt(member.getMemId());
            pointService.upPoint(member.getMemId(), 1); // 출석체크에 대한 1점 추가
            return ResponseEntity.ok("회원가입 성공");
            } catch (Exception e) {
                logger.error("회원가입 중 오류 발생", e);
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("회원가입 처리 중 오류가 발생했습니다: " + e.getMessage());
            }
        }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestParam String memId, @RequestParam String pwd) {
        try {
            boolean isValid = memberService.validateLogin(memId, pwd);

            if (isValid) {
                String token = jwtUtil.generateToken(memId);
                Map<String, String> response = new HashMap<>();
                response.put("token", token);

                if (attendanceService.checkToday(memId) == 0) {
                    attendanceService.insertAtt(memId);
                    pointService.addAttendancePoint(memId); // 새로운 메서드 호출
                    response.put("upPoint", "1");
                }

                return ResponseEntity.ok(response);
            }
            return ResponseEntity.badRequest().body("로그인 실패");
            } catch (Exception e) {
                logger.error("로그인 중 오류 발생", e);
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("로그인 처리 중 오류가 발생했습니다.");
            }
        }


    @GetMapping("/info")
    public ResponseEntity<Member> getMemberInfo(@RequestHeader("Authorization") String authHeader) {
        try {
            if (authHeader == null || !authHeader.startsWith("Bearer ")) {
                return ResponseEntity.status(401).build();
            }
            String token = authHeader.substring(7);
            if (!jwtUtil.validateToken(token)) {
                return ResponseEntity.status(401).build();
            }
            String memId = jwtUtil.extractMemId(token);
            Member member = memberService.getMemberById(memId);
            if (member != null) {
                member.setPwd(null);
                return ResponseEntity.ok(member);
            }
            return ResponseEntity.notFound().build();
        } catch (Exception e) {
            logger.error("Error in getMemberInfo", e);
            return ResponseEntity.status(500).build();
        }
    }

    @PostMapping("/update/{memId}")
    public ResponseEntity<?> updateMember(@PathVariable String memId, @Valid @RequestBody Member member, BindingResult bindingResult, @RequestHeader("Authorization") String authHeader) {
        if (bindingResult.hasErrors()) {
            String errors = bindingResult.getAllErrors().stream()
                .map(error -> error.getDefaultMessage())
                .collect(Collectors.joining(", "));
            return ResponseEntity.badRequest().body(errors);
        }
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            return ResponseEntity.status(401).body("인증이 필요합니다.");
        }
        String token = authHeader.substring(7);
        if (!jwtUtil.validateToken(token)) {
            return ResponseEntity.status(401).body("유효하지 않은 토큰입니다.");
        }
        String loggedInMemId = jwtUtil.extractMemId(token);
        if (loggedInMemId == null || !loggedInMemId.equals(memId)) {
            return ResponseEntity.status(403).body("권한이 없습니다.");
        }

        Member existingMember = memberService.getMemberById(memId);
        if (existingMember == null) {
            return ResponseEntity.notFound().build();
        }

        if (member.getPwd() == null || member.getPwd().isEmpty()) {
            member.setPwd(null);
        }

        memberService.updateMember(member);
        return ResponseEntity.ok("회원정보 수정 성공");
    }

    @PostMapping("/logout")
    public ResponseEntity<String> logout() {
        return ResponseEntity.ok("로그아웃 성공");
    }

    @DeleteMapping("/{memId}")
    public ResponseEntity<String> deleteMember(@PathVariable String memId, @RequestHeader("Authorization") String authHeader) {
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            return ResponseEntity.status(401).body("인증 토큰이 없습니다");
        }
        String token = authHeader.substring(7);
        if (!jwtUtil.validateToken(token)) {
            return ResponseEntity.status(401).body("유효하지 않은 토큰입니다.");
        }
        String loggedInMemId = jwtUtil.extractMemId(token);
        if (!loggedInMemId.equals(memId)) {
            return ResponseEntity.status(403).body("권한이 없습니다.");
        }
        try {
            memberService.deleteMember(memId);
            return ResponseEntity.ok("회원 탈퇴가 완료되었습니다");
        } catch (Exception e) {
            logger.error("회원 탈퇴 중 오류 발생", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("회원 탈퇴 처리 중 오류가 발생했습니다.");
        }
    }

    @PostMapping("/find-id")
    public ResponseEntity<?> findId(@RequestBody Map<String, String> payload) {
        String email = payload.get("email");
        try {
            String memId = memberService.findIdByEmail(email);
            if (memId != null && !memId.isEmpty()) {
                Map<String, String> response = new HashMap<>();
                response.put("memId", memId);
                return ResponseEntity.ok(response);
                } else {
                    return ResponseEntity.notFound().build();
                }
            } catch (Exception e) {
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("아이디 찾기 중 오류가 발생했습니다.");
            }
        }

    @PostMapping("/find-password")
    public ResponseEntity<?> resetPassword(@RequestBody Map<String, String> request) {
        String memId = request.get("memId");
        String email = request.get("email");

        boolean result = memberService.resetPassword(memId, email);
        if (result) {
            return ResponseEntity.ok("임시 비밀번호가 이메일로 전송되었습니다.");
        } else {
            return ResponseEntity.badRequest().body("비밀번호 재설정에 실패했습니다.");
        }
    }

    @GetMapping("/check-login")
    public ResponseEntity<?> checkLoginStatus(@RequestHeader("Authorization") String authHeader) {
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            Map<String, Object> response = new HashMap<>();
            response.put("isLoggedIn", false);
            return ResponseEntity.ok(response);
        }
        String token = authHeader.substring(7);
        if (!jwtUtil.validateToken(token)) {
            Map<String, Object> response = new HashMap<>();
            response.put("isLoggedIn", false);
            return ResponseEntity.ok(response);
        }
        String memId = jwtUtil.extractMemId(token);
        Map<String, Object> response = new HashMap<>();
        response.put("isLoggedIn", true);
        response.put("memId", memId);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/check-id")
    public ResponseEntity<Boolean> checkDuplicateId(@RequestParam("memId") String memId) {
        boolean isDuplicate = memberService.isIdDuplicate(memId);
        return ResponseEntity.ok(isDuplicate);
    }
}
