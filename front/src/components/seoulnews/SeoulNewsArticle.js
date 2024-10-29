import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import "./Article.css";

function SeoulNewsArticle() {
    const { seoulId } = useParams(); // URL에서 id를 추출합니다.

    const [seoulNews, setSeoulNews] = useState([]);
    const [contentHtml, setContentHtml] = useState('');

    // Axios GET 요청을 함수로 분리
    const fetchSeoulNews = async (id) => {
        try {
            const response = await axios.get('/api/seoul/seoulNews/article', { params: { seoulId: id } });

            const { seoulNews, contentHtml } = response.data
            setSeoulNews(seoulNews); // seoulNews 상태 설정
            setContentHtml(contentHtml); // contentHtml 상태 설정 (setContentHtml은 별도로 정의해야 함)
            
        } catch (error) {
            console.error('There was an error fetching the RSS data!', error);
        }
    };

    // useEffect에서 분리된 fetchRssItem을 호출
    useEffect(() => {
        if (seoulId) {
            fetchSeoulNews(seoulId); // rssId가 있을 때만 호출
        }
    }, []); // rssId가 변경될 때마다 실행


    
    // 여기서 id를 사용하여 해당 RSS 항목의 데이터를 불러오는 로직을 추가할 수 있습니다.
    return (
        <div>
            <div>
                {seoulNews && (
                    <div>
                        <h1>{seoulNews.title}</h1>
                        {/* 다른 seoulNews 필드들... */}
                    </div>
                )}
                <div className='post_content' dangerouslySetInnerHTML={{ __html: contentHtml }} />
            </div>
            
        </div>
    );
}

export default SeoulNewsArticle;