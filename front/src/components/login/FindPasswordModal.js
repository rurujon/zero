import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import axios from 'axios';

const FindPasswordModal = ({ show, onHide }) => {
    const [memId, setMemId] = useState('');
    const [email, setEmail] = useState('');
    const [result, setResult] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('/member/find-password', { memId, email })
            .then(response => {
                setResult('임시 비밀번호가 이메일로 전송되었습니다.');
            })
            .catch(error => {
                console.error('비밀번호 찾기 실패:', error);
                setResult('비밀번호를 찾을 수 없습니다.');
            });
    };

    return (
        <Modal show={show} onHide={onHide}>
            <Modal.Header closeButton>
                <Modal.Title>비밀번호 찾기</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    <Form.Group>
                        <Form.Label>아이디</Form.Label>
                        <Form.Control
                            type="text"
                            value={memId}
                            onChange={(e) => setMemId(e.target.value)}
                            required
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>이메일</Form.Label>
                        <Form.Control
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        비밀번호 찾기
                    </Button>
                </Form>
                {result && <p className="mt-3">{result}</p>}
            </Modal.Body>
        </Modal>
    );
};

export default FindPasswordModal;
