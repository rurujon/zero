import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import '../../assets/css/ImgList.css'

const ImgList = () => {
    const [lists, setLists] = useState([])

    useEffect(() => {
        fetchImgData()
    }, [])

    const fetchImgData = () => {
        axios.get('/imgboard/list')
            .then(res => {
                setLists(res.data.lists);
            })
            .catch(err => {
                console.error(err);
                alert('게시물 조회 중 오류가 발생했습니다.');
            })
    }

    return (
        <div id="bbs">
            <div id="bbs_title">게시물 리스트</div>
            <div>
                {lists.map(imgData => (
                    <div className="bbsListItem" key={imgData.imgPostId}>
                        <div className="bbsListThumbnail">
                            {/* 썸네일 이미지추가 */}
                            {/* <img src={imgData.thumbnailUrl} alt={imgData.title} /> */}
                        </div>
                        <div className="bbsListContent">
                            <Link to={`/imgboard/article`}>
                            <h3>{imgData.title}</h3></Link>
                            <p>{imgData.content}</p>
                            <p>작성자: {imgData.memId}</p>
                            <p>카테고리: {imgData.cate}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default ImgList;
