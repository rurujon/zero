import React, { useState } from 'react'
import { Modal, Button, Form } from 'react-bootstrap'
import axios from 'axios'

const FindIdModal = ({ show, onHide }) => {
    const [email, setEmail] = useState('')
    const [result, setResult] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault()
        axios.post('/member/find-id', { email })
            .then(response => {
                setResult(`찾은 아이디: ${response.data}`)
            })
            .catch(error => {
                console.error('아이디 찾기 실패:', error)
                setResult('아이디를 찾을 수 없습니다.')
            });
    };

    return (
        <Modal show={show} onHide={onHide}>
            <Modal.Header closeButton>
                <Modal.Title>아이디 찾기</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
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
                        아이디 찾기
                    </Button>
                </Form>
                {result && <p className="mt-3">{result}</p>}
            </Modal.Body>
        </Modal>
    );
};

export default FindIdModal;
