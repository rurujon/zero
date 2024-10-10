package com.zd.back.imgboard.util;

import org.springframework.stereotype.Service;

@Service
public class MyPage {
    
    public int getPageCount(int numPerPage, int dataCount) { // ex (3, 34)
        int pageCount = 0; 
        
        pageCount = dataCount / numPerPage; // 34/3 = 11  페이지가 1개 더 필요함 
        
        if (dataCount % numPerPage != 0) { // 34 % 3 != 0 이므로 
            pageCount++;
        }
        return pageCount;  // 12 페이지 필요
    }
    
    // 페이지 처리 메소드   //게시판 하단에 페이지 번호 출력
    public String pageIndexList(int currentPage, int totalPage, String listUrl) { // String listUrl : 페이지 번호 클릭 시 해당 페이지로 이동할 URL
        
        // 페이지 번호 1 앞뒤로 페이지를 표시
        // 1 2 3 4 5 다음
        //이전 6 7 8 9 10 다음
        //이전 11 12 
        
        int numPerBlock = 5;   // 페이지 블록 당 5 페이지씩 보여줌
        int currentPageSetup; // 현재 페이지 설정   //이전 6 7 8 9 10 다음: 5개씩 묶임
        int page; 
        
        StringBuffer sb = new StringBuffer();
        
        if(currentPage == 0 || totalPage == 0) { // 유효성 검사, 하나도 없으므로 그대로 출력
            return "";
        }
        
        // 검색 추가 시 [작성자: 홍길동] 등으로 검색, 검색 결과에 맞게 게시물을 출력
        // list.jsp 예시 
        // [select name=searchKey"... 검색어, input type="text" name="searchValue".. 홍길동] 
        
        // list.jsp
        // list.jsp?searchKey=name&searchValue=홍길동  // 이와 같이 전달됨 
        if(listUrl.indexOf("?") != -1) {
            listUrl = listUrl + "&";    
        }else {
            listUrl = listUrl + "?";     // listUrl이 list.jsp로 시작하는 경우
        }
         // if 문 결과
        // list.jsp?
        // list.jsp?searchKey=name&searchValue=홍길동&
        // 내용 따라 변경됨
        
        // 표시할 첫 페이지 번호 -1 처리 
        // 현재 페이지 블록 앞의 페이지 계산
        currentPageSetup = (currentPage / numPerBlock) * numPerBlock;
        
        if (currentPage % numPerBlock == 0) {
            currentPageSetup = currentPageSetup - numPerBlock;
        }
        
        // 이전 버튼 생성
        if(totalPage > numPerBlock && currentPageSetup > 0) { // ex) 12 > 5 && 5 > 0 이므로 이전 버튼 활성화 
            
            sb.append("<a href=\"" + listUrl + "pageNum=" + 
                    currentPageSetup +"\">◀이전</a>&nbsp;");  
            //<a href="list.jsp?pageNum=5">이전</a>&nbsp;
        }
        
        // 6 7 8 9 10 페이지를 출력 
        page = currentPageSetup + 1;
        
        while (page <= totalPage && page <= (currentPageSetup + numPerBlock)) { // ex ) 6 < 12 && 6 <= (5+5)
            
            if(page == currentPage) {  // 현재 페이지는 페이지 번호 표시, 나머지는 링크
                sb.append("<font color=\"Fuchsia\">" + page + "<font>&nbsp;");
                //<font color="Fuchsia">9</font>&nbsp;
            } else { // 링크 생성
                sb.append("<a href=\"" + listUrl +"pageNum=" + page + "\">"+
                         page + "</a>&nbsp;");
                //<a href = "list.jsp?pageNum=10">10</a>&nbsp;
            }
            page++;
        }
        
        // 다음 버튼 생성
        if (totalPage - currentPageSetup > numPerBlock) { // ex) 12-5 > 5 이므로 다음 버튼 표시
            sb.append("<a href=\"" + listUrl + "pageNum=" +
                    page + "\">다음▶</a>&nbsp;");
            //<a href="list.jsp?pageNum=9">다음</a>&nbsp;
        }
        
        return sb.toString();
    }
}

