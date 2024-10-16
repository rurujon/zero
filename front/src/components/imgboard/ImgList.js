
import React, { useEffect, useState } from 'react';
import '../../assets/css/ImgList.css';
import axios from 'axios';

const ImgList = () => {


    // map 으로 받은 데이터 
    const [imgData, setImgData] = useState([])
    const [dataCount ,setDataCount] = useState(0)
    const []
    






    useEffect(() => {
        axios.get('/imgboard/list')  
            .then(res => {
                setImgData(res.data.imgData); 
            })
            .catch(error => console.log(error));
    }, []);

    return (
        <div id="bbs">
            <div id="bbs_title">게시물 리스트</div>
            <div id="bbsList"> 
                {imgData.map((imgData, index) => (
                    <div className="bbsListItem" key={index}>
                        <div className="bbsListThumbnail">
                           {/*  <img src={imgData.thumbnailUrl} alt={imgData.title} /> */} {/* 썸네일 이미지 */}
                        </div>
                        <div className="bbsListContent">
                            <h3>{imgData.title}</h3>
                            <p>{imgData.content}</p>
                            <p>작성자: {imgData.memId}</p>
                            <p>카테고리: {imgData.cate}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ImgList;
