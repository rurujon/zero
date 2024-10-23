package com.zd.back.tipboard.bbs.dto.response;

import java.util.List;

import com.zd.back.tipboard.bbs.domain.Bbs;

import lombok.Data;

@Data
public class BbsListResponse {

    private List<Bbs> bbsList;
    private Integer pageCnt;

    public BbsListResponse(List<Bbs> bbsList, Integer pageCnt) {
        this.bbsList = bbsList;
        this.pageCnt = pageCnt;
    }
}