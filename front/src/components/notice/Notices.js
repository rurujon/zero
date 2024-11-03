import React from 'react';

const Notices = () => {
    return (
        <div>
            <h3>공지 게시판</h3>
            {/* 검색 */}
            <div className="search" style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
                <div style={{ marginRight: '10px' }}>
                 
                </div>
                <div style={{ marginRight: '10px' }}>
                    <select className="form-control"  style={{ border: 0 }}>
                        <option>검색 옵션 선택</option>
                        <option value="title">제목</option>
                        <option value="content">내용</option>
                    </select>
                </div>
                <div style={{ marginRight: '10px' }}>
                    <input type="text" className="form-control" placeholder="검색어" />
                </div>
                <div>
                    <button type="button" className="btn btn-outline-secondary" >
                        <i className="fas fa-search"></i> 검색
                    </button>
                </div>
            </div>
    
            <br />
    
            {/* 게시글 목록 */}
            <div className="table-responsive">
                <div className="table-header" style={{ display: 'flex', fontWeight: 'bold', borderBottom: '1px solid #ccc', padding: '10px 0' }}>
                    <div className="col-1" style={{ flex: '1' }}>번호</div>
                    <div className="col-2" style={{ flex: '2' }}>카테고리</div>
                    <div className="col-5" style={{ flex: '5' }}>제목</div>
                    <div className="col-1" style={{ flex: '1' }}>작성자</div>
                    <div className="col-1" style={{ flex: '1' }}>조회수</div>
                    <div className="col-2" style={{ flex: '2' }}>등록일</div>
                </div>
                <div className="table-body">
                   여기에 데이터 
                </div>
            </div>
        </div>
    );
    
};

export default Notices;