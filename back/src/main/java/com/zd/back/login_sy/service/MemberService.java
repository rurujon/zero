// package com.zd.back.login_sy.service;

// import com.zd.back.login_sy.mapper.MemberMapper;
// import com.zd.back.login_sy.model.Member;
// import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.stereotype.Service;

// @Service
// public class MemberService {

//     @Autowired
//     private MemberMapper memberMapper;

//     public void registerMember(Member member) {
//         memberMapper.insertMember(member);
//     }

//     public Member getMemberById(String memId) {
//         return memberMapper.selectMemberById(memId);
//     }

//     public void deleteMember(String memId) {
//         memberMapper.deleteMember(memId);
//     }
// }
