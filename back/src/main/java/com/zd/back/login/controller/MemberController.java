package com.zd.back.login.controller;

import com.zd.back.login.model.Member;
import com.zd.back.login.service.MemberService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpSession;
import javax.validation.Valid;

import java.util.HashMap;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/member")
public class MemberController {

    @Autowired
    private MemberService memberService;

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
    public ResponseEntity<String> login(@RequestParam String memId, @RequestParam String pwd, HttpSession session) {
        Member member = memberService.getMemberById(memId);
        if (member != null && member.getPwd().equals(pwd)) {
            session.setAttribute("memId", memId);
            return ResponseEntity.ok("로그인 성공");
        }
        return ResponseEntity.badRequest().body("로그인 실패");
    }


    @GetMapping("/info")
    public ResponseEntity<Member> getMemberInfo(HttpSession session) {
        String memId = (String) session.getAttribute("memId");
        if (memId == null) {
            return ResponseEntity.status(401).build();
        }
        Member member = memberService.getMemberById(memId);
        if (member != null) {
            member.setPwd(null);
            return ResponseEntity.ok(member);
        }
        return ResponseEntity.notFound().build();
    }

    @PostMapping("/update/{memId}")
    public ResponseEntity<?> updateMember(@PathVariable String memId, @Valid @RequestBody Member member, BindingResult bindingResult, HttpSession session) {
        if (bindingResult.hasErrors()) {
            String errors = bindingResult.getAllErrors().stream()
                .map(error -> error.getDefaultMessage())
                .collect(Collectors.joining(", "));
            return ResponseEntity.badRequest().body(errors);
        }
        String loggedInMemId = (String) session.getAttribute("memId");
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
    public ResponseEntity<String> logout(HttpSession session) {
        session.invalidate();
        return ResponseEntity.ok("로그아웃성공");
    }

    @DeleteMapping("/{memId}")
    public ResponseEntity<String> deleteMember(@PathVariable String memId, HttpSession session) {
        String loggedInMemId = (String) session.getAttribute("memId");
        if (loggedInMemId == null || !loggedInMemId.equals(memId)) {
            return ResponseEntity.status(403).body("권한이 없습니다.");
        }
        memberService.deleteMember(memId);
        session.invalidate();
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

    @GetMapping("/check-login")
    public ResponseEntity<?> checkLoginStatus(HttpSession session) {
        String memId = (String) session.getAttribute("memId");
        Map<String, Object> response = new HashMap<>();
        response.put("isLoggedIn", memId != null);
        if (memId != null) {
            response.put("memId", memId);
        }
        return ResponseEntity.ok(response);
    }

    @PostMapping("/find-password")
    public ResponseEntity<String> findPassword(@RequestParam String memId, @RequestParam String email) {
        boolean isSuccess = memberService.resetPassword(memId, email);
        if (isSuccess) {
            return ResponseEntity.ok("임시 비밀번호가 이메일로 전송되었습니다.");
        }
        return ResponseEntity.badRequest().body("비밀번호를 재설정할 수 없습니다.");
    }
}
