
import React, { useEffect, useState } from 'react';
import '../../assets/css/ImgList.css';
import axios from 'axios';

const ImgList = () => {


    // map 으로 받은 데이터 
    const [imgList, setImgList] = useState([])
    const [dataCount ,setDataCount] = useState(0)
    const [pageIndexList,setPageIndexList] = useState('')
    const [aticleUrl,setArticleUrl] = useState('')

    //현재페이지
    const [currentPage,setCurrentPage] = useState(1)
    
    useEffect(() => {

        const fetchData = async () => {
           
            try {
                const res = await axios.get('/imgboard/list')
                setImgList(res.data.lists); 
                setDataCount(res.data.dataCount); 
                setPageIndexList(res.data.pageIndexList); 
                setArticleUrl(res.data.articleUrl); 

            } catch (error) {
                console.error(error);
            }
        };

        fetchData(); // currentPage 변할때마다 실행 
    }, [currentPage]);

    return (
        <div id="bbs">
            <div id="bbs_title">게시물 리스트</div>
            <div id="bbsList"> 
                {imgList.map((imgData, index) => (
                    <div className="bbsListItem" key={imgData.imgPostId}>
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
