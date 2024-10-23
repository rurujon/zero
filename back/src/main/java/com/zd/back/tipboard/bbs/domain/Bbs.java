package com.zd.back.tipboard.bbs.domain;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

@Data // 자동으로 getter, setter, toString, equals, hashCode 생성
@NoArgsConstructor // 기본 생성자 자동 생성
@AllArgsConstructor // 모든 필드를 포함한 생성자 자동 생성
public class Bbs {

	private int seq;
	private String memId;

	private int ref;
	private int step;
	private int depth;

	private String title;
	private String content;
	private String created;

	private int del;
	private int count;

	// id, title, content만 받는 생성자
	public Bbs(String memId, String title, String content) {
		this.memId = memId;
		this.title = title;
		this.content = content;
	}
}
