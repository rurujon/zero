
import React, { useEffect, useState } from 'react';
import '../../assets/css/ImgList.css';
import axios from 'axios';

const ImgList = () => {

    const [imgList, setImgList] = useState([]);

    useEffect(() => {
        axios.get('/imgboard/imglist')  
            .then(res => {
                setImgList(res.data.imgList); 
            })
            .catch(error => console.log(error));
    }, []);

    return (
        <div id="bbs">
            <div id="bbs_title">게시물 리스트</div>
            <div id="bbsList">
                {imgList.map((imgData, index) => (
                    <div className="bbsListItem" key={index}>
                        <div className="bbsListThumbnail">
                           {/*  <img src={imgData.thumbnailUrl} alt={imgData.title} /> */} {/* 썸네일 이미지 */}
                        </div>
                        <div className="bbsListContent">
                            <h3>{imgData.title}</h3>
                            <p>{imgData.content}</p>
                            <p>작성자: {imgData.userId}</p>
                            <p>카테고리: {imgData.cate}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ImgList;
