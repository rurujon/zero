import React from 'react';

const NocArticle = () => {
    return (
        <div>
            <div>
                {/* 여기에 필요한 내용 추가 가능 */}
            </div>
    
            <div style={{ border: '1px solid #ccc', borderRadius: '4px', padding: '20px', marginBottom: '20px' }}>
                {/* 제목 */}
                <div style={{ display: 'flex', alignItems: 'center', borderBottom: '1px solid #ccc', padding: '10px 0' }}>
                    <div style={{ flex: '1', fontWeight: 'bold' }}>제목</div>
                    <div style={{ width: '1px', height: '20px', backgroundColor: '#ccc', margin: '0 10px' }}></div>
                    <div style={{ flex: '2' }}>
                        <span>title</span>
                    </div>
                </div>
    
                {/* 작성자 */}
                <div style={{ display: 'flex', alignItems: 'center', borderBottom: '1px solid #ccc', padding: '10px 0' }}>
                    <div style={{ flex: '1', fontWeight: 'bold' }}>작성자</div>
                    <div style={{ width: '1px', height: '20px', backgroundColor: '#ccc', margin: '0 10px' }}></div>
                    <div style={{ flex: '2' }}>
                        <span>writer</span>
                    </div>
                </div>
    
                {/* 작성일 */}
                <div style={{ display: 'flex', alignItems: 'center', borderBottom: '1px solid #ccc', padding: '10px 0' }}>
                    <div style={{ flex: '1', fontWeight: 'bold' }}>작성일</div>
                    <div style={{ width: '1px', height: '20px', backgroundColor: '#ccc', margin: '0 10px' }}></div>
                    <div style={{ flex: '2' }}>
                        <span>created</span>
                    </div>
                </div>
    
                {/* 조회수 */}
                <div style={{ display: 'flex', alignItems: 'center', borderBottom: '1px solid #ccc', padding: '10px 0' }}>
                    <div style={{ flex: '1', fontWeight: 'bold' }}>조회수</div>
                    <div style={{ width: '1px', height: '20px', backgroundColor: '#ccc', margin: '0 10px' }}></div>
                    <div style={{ flex: '2' }}>
                        <span>hitcount</span>
                    </div>
                </div>
    
                {/* 내용 */}
                <div style={{ display: 'flex', alignItems: 'center', padding: '10px 0' }}>
                    <div style={{ flex: '1', fontWeight: 'bold' }}>내용</div>
                    <div style={{ width: '1px', height: '20px', backgroundColor: '#ccc', margin: '0 10px' }}></div>
                    <div style={{ flex: '2' }}>
                        <span>content</span>
                    </div>
                </div>
            </div>
    
            <div className="my-3 d-flex justify-content-center">
                {/* 여기에 필요한 내용 추가 가능 */}
            </div>
            <br /><br />
        </div>
    );
    

};

export default NocArticle;