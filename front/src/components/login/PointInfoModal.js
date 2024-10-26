import React, { useState, useEffect } from 'react';
import { Modal, Button } from 'react-bootstrap';
import axios from 'axios';

const PointInfoModal = ({ show, onHide, memId }) => {
    const [pointInfo, setPointInfo] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (show && memId) {
            axios.get(`/api/point/info/${memId}`)
                .then(response => {
                    setPointInfo(response.data);
                    setError(null);
                })
                .catch(error => {
                    console.error('포인트 정보 조회 실패:', error);
                    setError('포인트 정보를 불러오는데 실패했습니다.');
                });
        }
    }, [show, memId]);

    return (
        <Modal show={show} onHide={onHide}>
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
                        <p>회원 등급: {pointInfo.grade}</p>
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
