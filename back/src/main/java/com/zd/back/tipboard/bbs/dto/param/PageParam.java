package com.zd.back.tipboard.bbs.dto.param;

import lombok.Data;

@Data
public abstract class PageParam {

    private Integer pageStart;
    private Integer pageEnd;

    public void setPageParam(Integer page, Integer itemCount) {
        page -= 1;

        pageStart = page * itemCount + 1;
        pageEnd = (page + 1) * itemCount;
    }
}