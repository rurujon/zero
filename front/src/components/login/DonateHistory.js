import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from './context/AuthContext';

const DonateHistory = () => {
    const { token, memId } = useContext(AuthContext);
    const [donateHistory, setDonateHistory] = useState([]); // 전체 후원 기록
    const [loading, setLoading] = useState(true); // 로딩 상태
    const [error, setError] = useState(null); // 오류 상태
    const [page, setPage] = useState(1); // 현재 페이지 (기본값: 1)
    const [size] = useState(5); // 페이지당 표시할 후원 내역 수 (예: 5개)
    const [totalPages, setTotalPages] = useState(1); // 총 페이지 수

    const buyerId = 'someBuyerId'; // 실제로는 로그인된 사용자의 ID를 사용해야 함

    // 전체 후원 내역을 불러오는 API 요청
    useEffect(() => {
    axios
    .get('/payment/getDonateHistory', {
        headers: {
            Authorization: `Bearer ${token}`, // 토큰을 Authorization 헤더에 추가
        },
        
        params: {
            buyerId:memId,
        },
        })
        .then((response) => {
        const data = response.data;
        setDonateHistory(data); // 전체 후원 내역 저장
        setTotalPages(Math.ceil(data.length / size)); // 총 페이지 수 계산
        setLoading(false); // 로딩 완료
        })
        .catch((error) => {
        setError('후원 기록을 불러오는 데 실패했습니다.');
        console.error('후원 기록 불러오기 오류', error);
        setLoading(false); // 로딩 완료
        });
        console.log(memId)
    }, [buyerId, size]); // buyerId와 size가 바뀔 때마다 데이터 갱신

    // 현재 페이지에 해당하는 데이터만 추출
    const currentData = donateHistory.slice((page - 1) * size, page * size);

    // 페이지 변경 함수
    const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= totalPages) {
        setPage(newPage); // 페이지 변경
    }
    };

    if (loading) {
    return <div>로딩 중...</div>;
    }

    if (error) {
    return <div>{error} </div>;
    }

    return (
    <div>
        <h2>후원 기록</h2>
        {currentData.length > 0 ? (
        <table className="table">
            <thead>
            <tr>
                <th>결제일</th>
                <th>구매자 이름</th>
                <th>금액(원)</th>
                <th>결제 방법</th>
                <th>주문 ID</th>
                <th>결제 ID</th>
            </tr>
            </thead>
            <tbody>
            {currentData.map((donate, index) => (
                <tr key={index}>
                <td>{donate.createdAt}</td>
                <td>{donate.buyerName}</td>
                <td>{donate.amount}</td>
                <td>{donate.paymentMethod}</td>
                <td>{donate.orderId}</td>
                <td>{donate.paymentId}</td>
                </tr>
            ))}
            </tbody>
        </table>
        ) : (
        <p>후원 기록이 없습니다.</p>
        )}

        {/* 페이지 버튼 */}
        <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '10px'}}>
        <button onClick={() => handlePageChange(page - 1)} disabled={page === 1}>
            이전
        </button>
        <span> 페이지 {page} </span>
        <button onClick={() => handlePageChange(page + 1)} disabled={page === totalPages}>
            다음
        </button>

        </div>
    </div>
    );
    };

    export default DonateHistory;
