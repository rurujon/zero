import React, { useEffect, useState } from "react";
import axios from "axios";

const NewsList = () => {
  const [newsData, setNewsData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Spring Boot 엔드포인트 호출
    axios
      .get("http://localhost:8080/api/naver/news") // Spring Boot API 호출
      .then((response) => {
        setNewsData(response.data); // API 응답 데이터 저장
      })
      .catch((error) => {
        setError("뉴스 데이터를 가져오는 데 실패했습니다.");
        console.error(error);
      });
  }, []);

  return (
    <div>
      <h1>네이버 뉴스</h1>
      {error && <p>{error}</p>}
      {newsData ? (
        <pre>{JSON.stringify(newsData, null, 2)}</pre> // 데이터 출력
      ) : (
        <p>뉴스 데이터를 불러오는 중...</p>
      )}
    </div>
  );
};

export default NewsList;