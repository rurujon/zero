import React, { useEffect, useState } from 'react';
import axios from 'axios';

import "./Card.css"

const OrgApp = () => {
    const [orgList, setOrgList] = useState([]);

    const fetchOrgData = async () => {
        try {
            const response = await axios.get('/api/org/list');
            setOrgList(response.data);
        } catch (error) {
            console.error("Error fetching organization data:", error);
        }
    };

    const handleCrawl = async () => {
        try {
            await axios.post('/api/org/crawl');
            alert("크롤링이 완료되었습니다.");
            fetchOrgData();  // 갱신된 데이터를 가져옵니다.
        } catch (error) {
            console.error("Error during crawling:", error);
            alert("크롤링 중 오류가 발생했습니다.");
        }
    };

    useEffect(() => {
        fetchOrgData();
    }, []);

    const [showMore, setShowMore] = useState(false);

    const displayedOrgs = showMore ? orgList : orgList.slice(0, 15);

    return (
        <div className="card-board">
            <ul className="card-list">
                {displayedOrgs.map((org, index) => (
                    <li key={index} className="card-item">
                        <div className='card'>
                            <div className="card-image-container">
                                {org.imgUrl && (
                                    <img src={org.imgUrl} alt={org.name} className="card-image" />
                                )}
                            </div>
                            <div className='card-container'>
                                <h2>{org.name}</h2>
                                <p>{org.description}</p>
                                <p>Location: {org.location}</p>
                                <button>기부하기</button>
                                <button>홈페이지</button>
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
            {orgList.length > 15 && (
                <button onClick={() => setShowMore(!showMore)}>
                    {showMore ? '접기' : '더보기'}
                </button>
            )}
        </div>
    );
};

export default OrgApp;
