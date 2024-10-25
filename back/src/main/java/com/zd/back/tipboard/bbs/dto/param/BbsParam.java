package com.zd.back.tipboard.bbs.dto.param;

import com.zd.back.tipboard.bbs.dto.request.BbsListRequest;
import com.zd.back.tipboard.bbs.dto.request.CreateBbsRequest;
import com.zd.back.tipboard.bbs.dto.request.UpdateBbsRequest;

@Data // Lombok이 자동으로 getter, setter, toString, equals, hashCode 생성
public class BbsParam {

    // 페이징 관련 필드
    private Integer pageStart;
    private Integer pageEnd;

    // 게시글 관련 필드
    private Integer seq;
    private Integer parentSeq;
    private String memId;
    private String title;
    private String content;
    
    // 검색 관련 필드
    private String choice;
    private String search;
    private Integer page;

    // 게시글 조회 시 필요한 필드
    private Integer bbsSeq; // 게시글 번호
    private String readerId; // 게시글 조회자 아이디

    // 생성자: BbsCountParam (검색을 위한 생성자)
    public BbsParam(BbsListRequest req) {
        this.choice = req.getChoice();
        this.search = req.getSearch();
    }

    // 생성자: BbsListParam (페이징 및 검색을 위한 생성자)
    public BbsParam(BbsListRequest req, Integer page) {
        this.choice = req.getChoice();
        this.search = req.getSearch();
        this.page = page;
        setPageParam(page, 10); // 예시로 itemCount를 10으로 설정
    }

    // 생성자: CreateBbsAnswerParam (답글 작성에 필요한 생성자)
    public BbsParam(Integer parentSeq, CreateBbsRequest req) {
        this.parentSeq = parentSeq;
        this.memId = req.getMemId();
        this.title = req.getTitle();
        this.content = req.getContent();
    }

    // 생성자: CreateBbsParam (새 게시글 작성에 필요한 생성자)
    public BbsParam(CreateBbsRequest req) {
        this.memId = req.getMemId();
        this.title = req.getTitle();
        this.content = req.getContent();
    }

    // 생성자: CreateReadCountParam (게시글 조회 시 필요한 생성자)
    public BbsParam(Integer bbsSeq, String readerId) {
        this.bbsSeq = bbsSeq;
        this.readerId = readerId;
    }

    // 생성자: UpdateBbsParam (게시글 수정에 필요한 생성자)
    public BbsParam(Integer seq, UpdateBbsRequest req) {
        this.seq = seq;
        this.title = req.getTitle();
        this.content = req.getContent();
    }

    // 페이지 설정 메서드
    public void setPageParam(Integer page, Integer itemCount) {
        page -= 1;
        this.pageStart = page * itemCount + 1;
        this.pageEnd = (page + 1) * itemCount;
    }
}