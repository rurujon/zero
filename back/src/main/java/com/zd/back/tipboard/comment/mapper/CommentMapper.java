package com.zd.back.tipboard.comment.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

import com.zd.back.tipboard.comment.domain.Comment;
import com.zd.back.tipboard.comment.dto.param.CommentListParam;
import com.zd.back.tipboard.comment.dto.param.CreateCommentParam;
import com.zd.back.tipboard.comment.dto.param.UpdateCommentParam;

@Mapper
@Repository
public interface CommentMapper {

    List<Comment> getCommentPageList(CommentListParam param);
    Integer getCommentCount(Integer seq);

    void createComment(CreateCommentParam param);
    Integer deleteComment(Integer seq);

    Comment getCommentBySeq(Integer seq);
    Integer updateComment(UpdateCommentParam param);
}