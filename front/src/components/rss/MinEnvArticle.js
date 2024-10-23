import React from 'react';
import { useParams } from 'react-router-dom';

function MinEnvArticle() {
    const { id } = useParams(); // URL에서 id를 추출합니다.

    // 여기서 id를 사용하여 해당 RSS 항목의 데이터를 불러오는 로직을 추가할 수 있습니다.
    return (
        <div>
            <h1>RSS Detail for ID: {id}</h1>
            {/* 추가 데이터 표시 로직 */}
        </div>
    );
}

export default MinEnvArticle;