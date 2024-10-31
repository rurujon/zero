import React, { useState, useEffect } from 'react';
import { Modal, Button, Table } from 'react-bootstrap';
import axios from 'axios';
import { Emoji } from 'react-emoji-render';
const gradeEmojis = {
    'LEVEL1': '🥉',
    'LEVEL2': '🥈',
    'LEVEL3': '🥇',
    'LEVEL4': '💎',
    'LEVEL5': '🌟',
    'LEVEL6': '👑'
  };

const PointInfoModal = ({ show, onHide, memId }) => {
    const [pointInfo, setPointInfo] = useState(null);
    const [pointHistory, setPointHistory] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (show && memId) {
            fetchPointInfo();
            fetchPointHistory();
        }
    }, [show, memId]);

    const fetchPointInfo = async () => {
        try {
            const response = await axios.get(`/api/point/info/${memId}`);
            setPointInfo(response.data);
            setError(null);
        } catch (error) {
            console.error('포인트 정보 조회 실패:', error);
            setError('포인트 정보를 불러오는 중 문제가 발생했습니다.');
        }
    };

    const fetchPointHistory = async () => {
        try {
            const response = await axios.get(`/api/point/history/${memId}`);
            setPointHistory(response.data);
        } catch (error) {
            console.error('포인트 히스토리 조회 실패:', error);
            setError('포인트 히스토리를 불러오는 중 문제가 발생했습니다.');
        }
    };

    return (
        <Modal show={show} onHide={onHide} size="lg">
            <Modal.Header closeButton>
                <Modal.Title>포인트 정보</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {error ? (
                    <p className="text-danger">{error}</p>
                ) : pointInfo ? (
                    <div>
                        <p>현재 포인트: {pointInfo.usedPoint}</p>
                        <p>누적 포인트: {pointInfo.maxPoint}</p>
                        <p>회원등급: {pointInfo.grade} {gradeEmojis[pointInfo.grade]}</p>
                        <h5>포인트 히스토리</h5>
                        <Table striped bordered hover>
                            <thead>
                                <tr>
                                    <th>날짜</th>
                                    <th>변동</th>
                                    <th>사유</th>
                                </tr>
                            </thead>
                            <tbody>
                                {pointHistory.map((history, index) => (
                                    <tr key={index}>
                                        <td>{new Date(history.changeDate).toLocaleString()}</td>
                                        <td>{history.pointChange > 0 ? `+${history.pointChange}` : history.pointChange}</td>
                                        <td>{history.changeReason}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </div>
                ) : (
                    <p>포인트 정보를 불러오는 중...</p>
                )}
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onHide}>
                    닫기
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default PointInfoModal;
