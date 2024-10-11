package com.zd.back.controller;

import com.zd.back.model.Member;
import com.zd.back.service.MemberService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/members")
public class MemberController {

    @Autowired
    private MemberService memberService;

    @PostMapping("/register")
    public String registerMember(@RequestBody Member member) {
        memberService.registerMember(member);
        return "회원가입 성공";
    }

    @PostMapping("/login")
    public String login(@RequestParam String memId, @RequestParam String pwd) {
        Member member = memberService.getMemberById(memId);
        if (member != null && member.getPwd().equals(pwd)) {
            // 세션 또는 JWT 토큰 생성 로직 추가
            return "로그인 성공";
        }
        return "로그인 실패";
    }

    @DeleteMapping("/{memId}")
    public String deleteMember(@PathVariable String memId) {
        memberService.deleteMember(memId);
        return "회원 탈퇴 성공";
    }
}
