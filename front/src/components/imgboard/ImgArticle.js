import React from 'react';
import './ImgArticle.css';

const ImgArticle = () => {

        const handleEdit = () => { //수정하기
            console.log("수정하기 버튼 클릭됨");
          /*   window.location.href = `/imgboard/updated/${memId}`;  */
        };
    
        const handleToList = () => { //목록가기
         
            console.log("목록가기 버튼 클릭됨");
            window.location.href = '/imgboard/list.action'; 
        };

    return (
        <div className="article-container">
            <h2 className="article-title">제목: title</h2>

            <div className="article-meta-container">
                <p className="article-meta"><strong>승인여부:</strong> auth</p>
                <hr className="divider" />
                <p className="article-meta"><strong>사용자 ID:</strong> memId</p>
                <hr className="divider" />
                <p className="article-meta"><strong>인증 유형:</strong>cate</p>
                <hr className="divider" />
                <p className="article-meta"><strong>작성일:</strong>created</p>
            </div>

            <div className="article-content">
            <p>content</p>
            
            <div className="image-gallery">

                        <img
                            
                            alt='게시물 이미지' 
                            className="article-image"
                        />

            </div>
            </div>

            <div className="button-container">
                <button className="action-button" onClick={handleEdit}>수정하기</button>
                <button className="action-button" onClick={handleToList}>목록가기</button>
            </div>
        </div>
    );
};

export default ImgArticle;