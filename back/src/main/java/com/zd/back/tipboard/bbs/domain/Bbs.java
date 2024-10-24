package com.zd.back.tipboard.bbs.domain;

import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Date;

import lombok.AllArgsConstructor;

@Data // 자동으로 getter, setter, toString, equals, hashCode 생성
@NoArgsConstructor // 기본 생성자 자동 생성
@AllArgsConstructor // 모든 필드를 포함한 생성자 자동 생성
public class Bbs {

	private Integer seq;
	private String memId;

	private Integer ref;
	private Integer step;
	private Integer depth;

	private String title;
	private String content;
	private Date created;

	private Integer del;
	private Integer count;

	// id, title, content만 받는 생성자
	public Bbs(String memId, String title, String content) {
		this.memId = memId;
		this.title = title;
		this.content = content;
	}
}
