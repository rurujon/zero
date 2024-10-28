package com.zd.back.SY.comment.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.zd.back.SY.board.model.request.CreateCommentRequest;
import com.zd.back.SY.board.model.response.CreateCommentResponse;
import com.zd.back.SY.comment.model.request.CommentRequest;
import com.zd.back.SY.comment.model.request.UpdateCommentRequest;
import com.zd.back.SY.comment.model.response.CommentResponse;
import com.zd.back.SY.comment.model.response.DeleteCommentResponse;
import com.zd.back.SY.comment.model.response.UpdateCommentResponse;
import com.zd.back.SY.comment.service.CommentService;

import lombok.RequiredArgsConstructor;

@Controller
@RequestMapping("/comment")
@RequiredArgsConstructor
public class CommentController {
    
    @Autowired
    private final CommentService commentService;

    @PostMapping("/write")
    public ResponseEntity<CreateCommentResponse> createComment(@RequestParam int boardno,
        @RequestBody CreateCommentRequest req) {

        return ResponseEntity.ok(commentService.createComment(boardno, req));
    }

    @GetMapping("/list")
    public ResponseEntity<CommentResponse> getBbsCommentList(@ModelAttribute CommentRequest req) {

        return ResponseEntity.ok(commentService.getBbsCommentList(req));
    }

    @PostMapping("/{commentno}")
    public ResponseEntity<UpdateCommentResponse> updateComment(@AuthenticationPrincipal UserDetails userDetails, @PathVariable int commentno, @RequestBody UpdateCommentRequest req) {

        return ResponseEntity.ok(commentService.updateComment(userDetails.getUsername(), commentno, req));
    }

    @GetMapping("/{commentno}")
    public ResponseEntity<DeleteCommentResponse> deleteComment(@PathVariable int commentno) {

        return ResponseEntity.ok(commentService.deleteComment(commentno));
    }
}
