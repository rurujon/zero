import React, { useEffect, useState } from 'react';
import axios from 'axios';

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

    return (
        <div>
            <h1>조직 리스트</h1>
            <button onClick={handleCrawl}>갱신</button>
            <div className='card-list'>
                <ul>
                    {orgList.map((org, index) => (
                        <li key={index}>
                            <div className='card'>
                                
                                {org.imgUrl && (
                                    <img src={org.imgUrl} alt={org.name} className="card-image" />
                                )}
                                <div className='card-content'>
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
            </div>
        </div>
    );
};

export default OrgApp;
