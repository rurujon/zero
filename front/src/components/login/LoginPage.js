// src/components/login/LoginPage.js
import React, { useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal, Button, Form } from 'react-bootstrap';

const LoginPage = ({ onLogin }) => {
    const [memId, setMemId] = useState('');
    const [pwd, setPwd] = useState('');
    const [showFindIdModal, setShowFindIdModal] = useState(false);
    const [showFindPasswordModal, setShowFindPasswordModal] = useState(false);
    const [email, setEmail] = useState('');
    const [foundId, setFoundId] = useState('');
    const [result, setResult] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('/member/login', null, {
            params: { memId, pwd }
        })
            .then(response => {
                if (response.data.token) {
                    //10-21 조준영 추가
                    if(response.data.uppoint==="1"){
                        alert('+1p 적립!')
                    }
                    onLogin(response.data.token, memId);
                } else {
                    alert('로그인 실패');
                }
            })
            .catch(error => {
                console.error(error);
                alert('로그인 중 오류가 발생했습니다.');
            });
    };

    const handleFindId = () => {
        axios.post('/member/find-id', { email })
            .then(response => {
                setFoundId(response.data.memId);
            })
            .catch(error => {
                console.error('아이디 찾기 실패:', error);
                setFoundId('');
                alert('아이디를 찾을 수 없습니다.');
            });
    };

    const handleFindPassword = () => {
        axios.post('/member/find-password', { memId, email })
            .then(response => {
                setResult('임시 비밀번호가 이메일로 전송되었습니다.');
                setShowFindPasswordModal(false);
            })
            .catch(error => {
                console.error('비밀번호 찾기 실패:', error);
                setResult('비밀번호를 찾을 수 없습니다.');
                alert('비밀번호를 찾을 수 없습니다.');
            });
    };

    return (
        <div className="container" style={{ marginBottom: '15px', margin: '15px' }}>
            <h2>로그인</h2><br />
            <form onSubmit={handleSubmit}>
                <div className="dl-item">
                    <dt>아이디</dt>
                    <dd>
                        <input
                            type="text"
                            className="form-control"
                            value={memId}
                            onChange={(e) => setMemId(e.target.value)}
                            style={{ width: '400px' }}
                            required
                        />
                    </dd>
                </div>
                <div className="dl-item">
                    <dt>비밀번호</dt>
                    <dd>
                        <input
                            type="password"
                            className="form-control"
                            value={pwd}
                            onChange={(e) => setPwd(e.target.value)}
                            style={{ width: '400px' }}
                            required
                        />
                    </dd>
                </div>
                <div className="dl-item" style={{ marginBottom: '15px' }}>
                    <button
                        type="submit"
                        className="btn btn-primary btn-sm"
                    >
                        로그인
                    </button>&nbsp;
                    <button type="button" className="btn btn-outline-primary btn-sm" onClick={() => setShowFindIdModal(true)}>아이디 찾기</button>&nbsp;
                    <button type="button" className="btn btn-outline-primary btn-sm" onClick={() => setShowFindPasswordModal(true)}>비밀번호 찾기</button>
                </div>
            </form>

            <Modal show={showFindIdModal} onHide={() => setShowFindIdModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>아이디 찾기</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={(e) => { e.preventDefault(); handleFindId(); }}>
                        <Form.Group>
                            <Form.Label>이메일</Form.Label>
                            <Form.Control
                                type="email"
                                placeholder="이메일을 입력하세요"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </Form.Group>
                        <Button variant="primary" type="submit" className="mt-3">
                            아이디 찾기
                        </Button>
                    </Form>
                    {foundId && <p className="mt-3">찾은 아이디: {foundId}</p>}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowFindIdModal(false)}>
                        닫기
                    </Button>
                </Modal.Footer>
            </Modal>

            <Modal show={showFindPasswordModal} onHide={() => setShowFindPasswordModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>비밀번호 찾기</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={(e) => { e.preventDefault(); handleFindPassword(); }}>
                        <Form.Group>
                            <Form.Label>아이디</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="아이디를 입력하세요"
                                value={memId}
                                onChange={(e) => setMemId(e.target.value)}
                                required
                            />
                        </Form.Group>
                        <Form.Group className="mt-3">
                            <Form.Label>이메일</Form.Label>
                            <Form.Control
                                type="email"
                                placeholder="이메일을 입력하세요"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </Form.Group>
                        <Button variant="primary" type="submit" className="mt-3">
                            비밀번호 찾기
                        </Button>
                    </Form>
                    {result && <p className="mt-3">{result}</p>}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowFindPasswordModal(false)}>
                        닫기
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default LoginPage;
