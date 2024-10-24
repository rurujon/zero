package com.zd.back.tipboard.bbs.service;

import java.util.List;
import java.util.Objects;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.zd.back.tipboard.bbs.domain.Bbs;
import com.zd.back.tipboard.bbs.dto.param.BbsCountParam;
import com.zd.back.tipboard.bbs.dto.param.BbsListParam;
import com.zd.back.tipboard.bbs.dto.param.CreateBbsAnswerParam;
import com.zd.back.tipboard.bbs.dto.param.CreateBbsParam;
import com.zd.back.tipboard.bbs.dto.param.CreateReadCountParam;
import com.zd.back.tipboard.bbs.dto.param.UpdateBbsParam;
import com.zd.back.tipboard.bbs.dto.request.BbsListRequest;
import com.zd.back.tipboard.bbs.dto.request.CreateBbsRequest;
import com.zd.back.tipboard.bbs.dto.request.UpdateBbsRequest;
import com.zd.back.tipboard.bbs.dto.response.BbsListResponse;
import com.zd.back.tipboard.bbs.dto.response.BbsResponse;
import com.zd.back.tipboard.bbs.dto.response.CreateBbsResponse;
import com.zd.back.tipboard.bbs.dto.response.DeleteBbsResponse;
import com.zd.back.tipboard.bbs.dto.response.UpdateBbsResponse;
import com.zd.back.tipboard.bbs.mapper.BbsMapper;

@Service
@Transactional
public class BbsService {

	private final BbsMapper bbsMapper;

	public BbsService(BbsMapper bbsMapper) {
		this.bbsMapper = bbsMapper;
	}

	/* 게시글 조회 */
	public BbsListResponse getBbsList(BbsListRequest req) {
		BbsListParam param = new BbsListParam(req);
		param.setPageParam(req.getPage(), 10);

		List<Bbs> bbsList = bbsMapper.getBbsSearchPageList(param);
		int pageCnt = bbsMapper.getBbsCount(new BbsCountParam(req));

		return new BbsListResponse(bbsList, pageCnt);
	}

	/* 특정 글 */
	/* 조회수 수정 */
	public BbsResponse getBbs(Integer seq, String readerId) {
		// 로그인 한 사용자의 조회수만 카운팅
		if (!readerId.isEmpty()) {
			CreateReadCountParam param = new CreateReadCountParam(seq, readerId);
			Integer result = bbsMapper.createBbsReadCountHistory(param); // 조회수 히스토리 처리 (insert: 1, update: 2)
			if (result == 1) {
				Integer updatedRecordCount = bbsMapper.increaseBbsReadCount(seq); // 조회수 증가
			}
		}

		return new BbsResponse(bbsMapper.getBbs(seq));
	}

	/* 글 추가 */
	public CreateBbsResponse createBbs(CreateBbsRequest req) {
		System.out.println("Request Data: " + req);
		
		CreateBbsParam param = new CreateBbsParam(req);
		//여기서 에러 발생
		bbsMapper.createBbs(param);
		return new CreateBbsResponse(param.getSeq());
	}

	/* 답글 추가 */
	public CreateBbsResponse createBbsAnswer(Integer parentSeq, CreateBbsRequest req) {
		Integer updatedRecordCount = bbsMapper.updateBbsStep(parentSeq);
		Integer bbsAnswerCount = bbsMapper.getBbsAnswerCount(parentSeq);
		// TODO - 예외처리
		if (!Objects.equals(updatedRecordCount, bbsAnswerCount)) {
			System.out.println("BbsService createBbsAnswer: Fail update parent bbs step !!");
			return null;
		}

		CreateBbsAnswerParam param = new CreateBbsAnswerParam(parentSeq, req);
		bbsMapper.createBbsAnswer(param);
		return new CreateBbsResponse(param.getSeq());
	}

	/* 글 수정 */
	public UpdateBbsResponse updateBbs(Integer seq, UpdateBbsRequest req) {
		Integer updatedRecordCount = bbsMapper.updateBbs(new UpdateBbsParam(seq, req));
		return new UpdateBbsResponse(updatedRecordCount);
	}

	/* 게시글 삭제 */
	public DeleteBbsResponse deleteBbs(Integer seq) {
		Integer deletedRecordCount = bbsMapper.deleteBbs(seq);
		return new DeleteBbsResponse(deletedRecordCount);
	}
}
