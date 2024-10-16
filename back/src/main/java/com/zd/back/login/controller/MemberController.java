package com.zd.back.login.controller;

import com.zd.back.login.model.Member;
import com.zd.back.login.service.MemberService;
import com.zd.back.login.security.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

import java.util.HashMap;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/member")
public class MemberController {

    @Autowired
    private MemberService memberService;

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
        memberService.registerMember(member);
        return ResponseEntity.ok("회원가입 성공");
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestParam String memId, @RequestParam String pwd) {
        Member member = memberService.getMemberById(memId);
        if (member != null && member.getPwd().equals(pwd)) {
            String token = jwtUtil.generateToken(memId);
            Map<String, String> response = new HashMap<>();
            response.put("token", token);
            return ResponseEntity.ok(response);
        }
        return ResponseEntity.badRequest().body("로그인 실패");
    }


    @GetMapping("/info")
public ResponseEntity<Member> getMemberInfo(@RequestHeader("Authorization") String authHeader) {
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
            member.setPwd(existingMember.getPwd());
        }
        memberService.updateMember(member);
        return ResponseEntity.ok("회원정보 수정 성공");
    }

    @PostMapping("/logout")
    public ResponseEntity<String> logout() {
        // JWT는 상태 비저장이므로 클라이언트에서 토큰을 삭제하도록 안내
        return ResponseEntity.ok("로그아웃 성공");
    }

    @DeleteMapping("/{memId}")
    public ResponseEntity<String> deleteMember(@PathVariable String memId, @RequestHeader("Authorization") String authHeader) {
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            return ResponseEntity.status(401).body("인증이 필요합니다.");
        }
        String token = authHeader.substring(7);
        if (!jwtUtil.validateToken(token)) {
            return ResponseEntity.status(401).body("유효하지 않은 토큰입니다.");
        }
        String loggedInMemId = jwtUtil.extractMemId(token);
        if (!loggedInMemId.equals(memId)) {
            return ResponseEntity.status(403).body("권한이 없습니다.");
        }
        memberService.deleteMember(memId);
        return ResponseEntity.ok("회원 탈퇴 성공");
    }

    @PostMapping("/find-id")
    public ResponseEntity<?> findId(@RequestBody Map<String, String> payload) {
        String email = payload.get("email");
        String memId = memberService.findIdByEmail(email);
        if (memId != null) {
            Map<String, String> response = new HashMap<>();
            response.put("memId", memId);
            return ResponseEntity.ok(response);
        }
        return ResponseEntity.notFound().build();
    }


    @PostMapping("/find-password")
    public ResponseEntity<String> findPassword(@RequestParam String memId, @RequestParam String email) {
        boolean isSuccess = memberService.resetPassword(memId, email);
        if (isSuccess) {
            return ResponseEntity.ok("임시 비밀번호가 이메일로 전송되었습니다.");
        }
        return ResponseEntity.badRequest().body("비밀번호를 재설정할 수 없습니다.");
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
