package com.zd.back.organization;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

/**
 * OrgMapper
 */
@Mapper
public interface OrgMapper {

    void insertOrg(OrgData orgData);
    List<OrgData> selectAll();
    void crawling();
    OrgData selectByName(String name);
}