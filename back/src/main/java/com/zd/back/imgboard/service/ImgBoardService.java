package com.zd.back.imgboard.service;

import java.util.List;

import com.zd.back.imgboard.model.ImgBoard;

public interface ImgBoardService {
 //게시글 번호 
    public int maxImgBoardId() throws Exception;
	
	//데이터 입력 
	public void insertImgBoard(ImgBoard dto) throws Exception;
	
/* 	//페이징 처리 위한 데이터 갯수 
	public int getImgBoardCount(String searchKey,String searchValue) throws Exception;
	
	public List<ImgBoard> getLists(int start,int end, String searchKey,String searchValue)throws Exception;
	
	public ImgBoard getReadImgBoard(int no)  throws Exception;
	
	public void updateImgBoard(ImgBoard dto) throws Exception;
	
	public void deleteImgBoard(int no) throws Exception;

    //관리자가 누르면 -> y 값으로 바뀌어서 -> 포인트 지급
    //과정의 메소드 필요 (-)
 */
}
