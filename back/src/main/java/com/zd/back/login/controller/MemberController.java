package com.zd.back.login.controller;

import com.zd.back.login.model.Member;
import com.zd.back.login.service.MemberService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpSession;

@RestController
@RequestMapping("/member")
public class MemberController {

    @Autowired
    private MemberService memberService;

    @PostMapping("/register")
    public String registerMember(@RequestBody Member member) {
        memberService.registerMember(member);
        return "회원가입 성공";
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
            member.setPwd(null); // 비밀번호는 클라이언트에 전송하지 않음
            return ResponseEntity.ok(member);
        }
        return ResponseEntity.notFound().build();
    }
    @PostMapping("/update/{memId}")
    public ResponseEntity<String> updateMember(@PathVariable String memId, @RequestBody Member member, HttpSession session) {
        String loggedInMemId = (String) session.getAttribute("memId");
        if (loggedInMemId == null || !loggedInMemId.equals(memId)) {
            return ResponseEntity.status(403).body("권한이 없습니다.");
        }

        // 기존 회원 정보 조회
        Member existingMember = memberService.getMemberById(memId);
        if (existingMember == null) {
            return ResponseEntity.notFound().build();
        }

        // 비밀번호가 제공되지 않았다면 기존 비밀번호 유지
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

}
