package com.zd.back.tipboard.bbs.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

import com.zd.back.tipboard.bbs.domain.Bbs;
import com.zd.back.tipboard.bbs.dto.param.BbsCountParam;
import com.zd.back.tipboard.bbs.dto.param.BbsListParam;
import com.zd.back.tipboard.bbs.dto.param.CreateBbsAnswerParam;
import com.zd.back.tipboard.bbs.dto.param.CreateBbsParam;
import com.zd.back.tipboard.bbs.dto.param.CreateReadCountParam;
import com.zd.back.tipboard.bbs.dto.param.UpdateBbsParam;

@Mapper
@Repository
public interface BbsMapper {

	List<Bbs> getBbsSearchPageList(BbsListParam param);
	Integer getBbsCount(BbsCountParam param);

	Bbs getBbs(Integer seq);
	Integer createBbsReadCountHistory(CreateReadCountParam param);
	Integer increaseBbsReadCount(Integer seq);

	void createBbs(CreateBbsParam param);

	Integer updateBbsStep(Integer parentSeq);
	Integer getBbsAnswerCount(Integer parentSeq);
	void createBbsAnswer(CreateBbsAnswerParam param);

	Integer updateBbs(UpdateBbsParam param);

	Integer deleteBbs(Integer seq);
}