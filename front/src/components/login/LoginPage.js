import React, { useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal, Button, Form } from 'react-bootstrap';
import FindIdModal from './FindIdModal';
import FindPasswordModal from './FindPasswordModal';

const LoginPage = ({ onLogin }) => {
    const [memId, setMemId] = useState('');
    const [pwd, setPwd] = useState('');
    const [showFindIdModal, setShowFindIdModal] = useState(false);
    const [showFindPasswordModal, setShowFindPasswordModal] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('/member/login', null, { params: { memId, pwd } })
            .then(response => {
                if (response.data.token) {
                    onLogin(response.data.token, memId);
                    window.location.reload()
                    if (response.data.upPoint === "1") {
                        alert("출석이 인정되었습니다! +1 포인트");
                    }
                } else {
                    alert("로그인 실패");
                }
            })
            .catch(error => {
                console.error(error);
                alert("로그인 중 오류가 발생했습니다.");
            });
    };

    return (
        <div className="container" style={{ marginBottom: '15px', margin:'15px'}}>
            <h2>로그인</h2><br />
            <form onSubmit={handleSubmit}>
                <div className="dl-item">
                    <dt>아&nbsp;&nbsp;이&nbsp;&nbsp;디</dt>
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
                    </button>
                </div>
            </form>
            <div>
                <button type="button" className="btn btn-link" onClick={() => setShowFindIdModal(true)}>아이디 찾기</button>
                <button type="button" className="btn btn-link" onClick={() => setShowFindPasswordModal(true)}>비밀번호 찾기</button>
            </div>

            <FindIdModal show={showFindIdModal} onHide={() => setShowFindIdModal(false)} />
            <FindPasswordModal show={showFindPasswordModal} onHide={() => setShowFindPasswordModal(false)} />
        </div>
    );
};

export default LoginPage;
