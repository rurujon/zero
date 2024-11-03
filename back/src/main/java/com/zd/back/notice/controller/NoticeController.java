package com.zd.back.notice.controller;

import com.zd.back.login.controller.MemberController;
import com.zd.back.notice.model.NoticeDTO;
import com.zd.back.notice.service.NoticeService;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/notices")
public class NoticeController {

    private static final Logger logger = LoggerFactory.getLogger(MemberController.class);

    @Autowired
    private NoticeService noticeService;

    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> createNotice(@RequestBody NoticeDTO notice, @AuthenticationPrincipal UserDetails userDetails) {
        try {
            if (userDetails == null) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("인증 정보가 없습니다.");
            }
            notice.setAuthor(userDetails.getUsername());
            noticeService.createNotice(notice);
            return ResponseEntity.ok("공지사항이 생성되었습니다.");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("공지사항 생성 실패: " + e.getMessage());
        }
    }

    @GetMapping("/{noticeId}")
    public ResponseEntity<?> getNotice(@PathVariable Long noticeId) {
        try {
            NoticeDTO notice = noticeService.getNotice(noticeId);
            return ResponseEntity.ok(notice);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("공지사항 조회 실패: " + e.getMessage());
        }
    }

    @GetMapping
    public ResponseEntity<?> getNotices(
            @RequestParam(defaultValue = "1") int page,
            @RequestParam(defaultValue = "10") int size) {
        try {
            List<NoticeDTO> notices = noticeService.getNoticesPaged(page, size);
            int totalCount = noticeService.countNotices();
            Map<String, Object> response = new HashMap<>();
            response.put("notices", notices);
            response.put("totalCount", totalCount);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("공지사항 목록 조회 실패: " + e.getMessage());
        }
    }

    @PutMapping("/{noticeId}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> updateNotice(@PathVariable Long noticeId, @RequestBody NoticeDTO notice) {
        try {
            notice.setNoticeId(noticeId);
            noticeService.updateNotice(notice);
            return ResponseEntity.ok("공지사항이 수정되었습니다.");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("공지사항 수정 실패: " + e.getMessage());
        }
    }

    @DeleteMapping("/{noticeId}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> deleteNotice(@PathVariable Long noticeId) {
        try {
            noticeService.deleteNotice(noticeId);
            return ResponseEntity.ok("공지사항이 삭제되었습니다.");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("공지사항 삭제 실패: " + e.getMessage());
        }
    }
}
