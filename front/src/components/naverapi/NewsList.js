import React, { useEffect, useState } from "react";
import axios from "axios";

const NewsList = () => {
  const [newsData, setNewsData] = useState(null);
  const [error, setError] = useState(null);
  const [searchKeyword, setSearchKeyword] = useState(""); // 검색어 상태 추가


  // 버튼 클릭 시 뉴스 데이터를 가져오는 함수
  const fetchNewsData = () => {
    axios
      .get("http://localhost:8080/api/naver/news") // Spring Boot API 호출
      .then((response) => {
        setNewsData(response.data); // API 응답 데이터 저장
        setError(null); // 에러 초기화
      })
      .catch((error) => {
        setError("뉴스 데이터를 가져오는 데 실패했습니다.");
        console.error(error);
      });
  };

  //뉴스 갱신 함수
  const updateNewsData = () => {
    axios
      .post("http://localhost:8080/api/naver/news/update") // DB 갱신
      .then((response) => {
        alert("갱신이 완료되었습니다."); // 갱신 완료 메시지
        fetchNewsData();      // 갱신 후 DB에서 뉴스 다시 가져오기
        setError(null); // 에러 초기화
      })
      .catch((error) => {
        setError("뉴스 DB를 갱신하는 데 실패했습니다.");
        console.error(error);
      });
  };

  // 검색 시 뉴스 데이터를 가져오는 함수
  const fetchSearchResults = () => {
    axios
      .get(`http://localhost:8080/api/naver/news/search?keyword=${searchKeyword}`) // 검색 API 호출
      .then((response) => {
        setNewsData(response.data); // 검색 결과 저장
        setError(null); // 에러 초기화
      })
      .catch((error) => {
        setError("검색 결과를 가져오는 데 실패했습니다.");
        console.error(error);
      });
  };

  // 처음 페이지 로드 시 DB에서 뉴스 데이터를 가져옴
  useEffect(() => {
    fetchNewsData();
  }, []);

  return (
    <div>
      <h1>네이버 뉴스</h1>
      <input
        type="text"
        value={searchKeyword}
        onChange={(e) => setSearchKeyword(e.target.value)} // 검색어 업데이트
        placeholder="검색어 입력"
      />
      <button onClick={fetchSearchResults}>검색</button> {/* 검색 버튼 */}
      <button onClick={updateNewsData}>뉴스 갱신</button> {/* 갱신 버튼 */}
      {error && <p>{error}</p>}
      {newsData ? (
        <ul>
          {newsData.map((news, index) => (
            <li key={index}>
              <a href={news.link} target="_blank" rel="noopener noreferrer">
                {news.title}
              </a>
            </li>
          ))}
        </ul>
      ) : (
        <p>뉴스 데이터를 불러오는 중...</p>
      )}
    </div>
  );
};

export default NewsList;