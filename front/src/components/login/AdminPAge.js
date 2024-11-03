import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from './context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Table, Form, Button, Pagination, Modal } from 'react-bootstrap';

const AdminPage = () => {
    const { token } = useContext(AuthContext);
    const navigate = useNavigate();
    const [members, setMembers] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedMember, setSelectedMember] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [pointAmount, setPointAmount] = useState('');
    const [pointOperation, setPointOperation] = useState('add');
    const pageSize = 10;

    // 공지사항 관련 상태 추가
    const [notices, setNotices] = useState([]);
    const [showNoticeModal, setShowNoticeModal] = useState(false);
    const [currentNotice, setCurrentNotice] = useState({ title: '', content: '' });
    const [noticeOperation, setNoticeOperation] = useState('create');

    useEffect(() => {
        fetchMembers();
        fetchNotices();
    }, [currentPage, searchTerm]);

    const fetchMembers = async () => {
        try {
            const response = await axios.get('/member/admin/search', {
                headers: { Authorization: `Bearer ${token}` },
                params: { searchTerm, page: currentPage, size: pageSize }
            });
            setMembers(response.data.members);
            setTotalPages(Math.ceil(response.data.totalCount / pageSize));
        } catch (error) {
            console.error('Error fetching members:', error);
        }
    };

    const handleSearch = (e) => {
        e.preventDefault();
        setCurrentPage(1);
        fetchMembers();
    };

    const handleRoleChange = async (memId, newRole) => {
        try {
            await axios.post('/member/admin/change-role', null, {
                headers: { Authorization: `Bearer ${token}` },
                params: { memId, role: newRole }
            });
            fetchMembers();
        } catch (error) {
            console.error('Error changing role:', error);
        }
    };

    const handleDeleteMember = async (memId) => {
        if (window.confirm('정말로 이 회원을 삭제하시겠습니까?')) {
            try {
                await axios.delete(`/member/admin/${memId}`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                fetchMembers();
            } catch (error) {
                console.error('Error deleting member:', error);
            }
        }
    };

    const openPointModal = (member) => {
        setSelectedMember(member);
        setShowModal(true);
    };

    const handlePointSubmit = async () => {
        try {
            await axios.post('/member/admin/manage-points', null, {
                headers: { Authorization: `Bearer ${token}` },
                params: {
                    memId: selectedMember.memId,
                    points: pointAmount,
                    operation: pointOperation
                }
            });
            setShowModal(false);
            fetchMembers();
        } catch (error) {
            console.error('Error managing points:', error);
        }
    };

    // 공지사항 목록 조회
    const fetchNotices = async () => {
        try {
            const response = await axios.get('/api/notices', {
                headers: { Authorization: `Bearer ${token}` },
                params: { page: currentPage, size: pageSize }
            });
            setNotices(response.data.notices);
            setTotalPages(Math.ceil(response.data.totalCount / pageSize));
        } catch (error) {
            console.error('공지사항 목록 조회 실패:', error);
            alert('공지사항 목록을 불러오는 데 실패했습니다.');
        }
    };

    // 공지사항 모달 열기
    const openNoticeModal = (operation, notice = { title: '', content: '' }) => {
        setNoticeOperation(operation);
        setCurrentNotice(notice);
        setShowNoticeModal(true);
    };

    // 공지사항 저장
    const handleSaveNotice = async () => {
        try {
            if (noticeOperation === 'create') {
                await axios.post('/api/notices', currentNotice, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    }
                });
            } else {
                await axios.put(`/api/notices/${currentNotice.noticeId}`, currentNotice, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    }
                });
            }
            setShowNoticeModal(false);
            fetchNotices();
            alert('공지사항이 성공적으로 저장되었습니다.');
        } catch (error) {
            console.error('공지사항 저장 실패:', error);
            alert(`공지사항 저장에 실패했습니다: ${error.response?.data || error.message}`);
        }
    };

    // 공지사항 삭제
    const handleDeleteNotice = async (noticeId) => {
        if (window.confirm('이 공지사항을 삭제하시겠습니까?')) {
            try {
                await axios.delete(`/api/notices/${noticeId}`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                fetchNotices();
            } catch (error) {
                console.error('공지사항 삭제 실패:', error);
                alert('공지사항 삭제에 실패했습니다.');
            }
        }
    };

    return (
        <div className="container mt-5">
            <h2>관리자 페이지</h2>
            <Form onSubmit={handleSearch} className="mb-3">
                <Form.Group>
                    <Form.Control
                        type="text"
                        placeholder="회원 검색"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </Form.Group>
                <Button type="submit" className="mt-2">검색</Button>
            </Form>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>이름</th>
                        <th>이메일</th>
                        <th>전화번호</th>
                        <th>역할</th>
                        <th>관리</th>
                    </tr>
                </thead>
                <tbody>
                    {members.map(member => (
                        <tr key={member.memId}>
                            <td>{member.memId}</td>
                            <td>{member.memName}</td>
                            <td>{member.email}</td>
                            <td>{member.tel}</td>
                            <td>
                                <Form.Select
                                    value={member.role}
                                    onChange={(e) => handleRoleChange(member.memId, e.target.value)}
                                >
                                    <option value="USER">USER</option>
                                    <option value="ADMIN">ADMIN</option>
                                </Form.Select>
                            </td>
                            <td>
                                <Button variant="info" size="sm" onClick={() => openPointModal(member)} className="me-2">포인트 관리</Button>
                                <Button variant="danger" size="sm" onClick={() => handleDeleteMember(member.memId)}>삭제</Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
            <Pagination>
                {[...Array(totalPages).keys()].map(number => (
                    <Pagination.Item key={number + 1} active={number + 1 === currentPage} onClick={() => setCurrentPage(number + 1)}>
                        {number + 1}
                    </Pagination.Item>
                ))}
            </Pagination>

            <h3 className="mt-4">공지사항 관리</h3>
            <Button onClick={() => openNoticeModal('create')} className="mb-3">새 공지사항 작성</Button>
            <Table className="table table-bordered">
                <thead>
                    <tr>
                        <th>제목</th>
                        <th>작성일</th>
                        <th>조회수</th>
                        <th>관리</th>
                    </tr>
                </thead>
                <tbody>
                    {notices.map(notice => (
                        <tr key={notice.noticeId}>
                            <td>{notice.title}</td>
                            <td>{new Date(notice.createdAt).toLocaleDateString()}</td>
                            <td>{notice.views}</td>
                            <td>
                                <Button variant="info" size="sm" onClick={() => openNoticeModal('edit', notice)} className="me-2">수정</Button>
                                <Button variant="danger" size="sm" onClick={() => handleDeleteNotice(notice.noticeId)}>삭제</Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>

            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>포인트 관리</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group>
                            <Form.Label>포인트수정</Form.Label>
                            <Form.Control type="number" value={pointAmount} onChange={(e) => setPointAmount(e.target.value)} />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>작업</Form.Label>
                            <Form.Select value={pointOperation} onChange={(e) => setPointOperation(e.target.value)}>
                                <option value="add">추가</option>
                                <option value="subtract">차감</option>
                            </Form.Select>
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowModal(false)}>취소</Button>
                    <Button variant="primary" onClick={handlePointSubmit}>저장</Button>
                </Modal.Footer>
            </Modal>

            <Modal show={showNoticeModal} onHide={() => setShowNoticeModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>{noticeOperation === 'create' ? '새 공지사항 작성' : '공지사항 수정'}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3">
                            <Form.Label>제목</Form.Label>
                            <Form.Control
                                type="text"
                                value={currentNotice.title}
                                onChange={(e) => setCurrentNotice({...currentNotice, title: e.target.value})}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>내용</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={3}
                                value={currentNotice.content}
                                onChange={(e) => setCurrentNotice({...currentNotice, content: e.target.value})}
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowNoticeModal(false)}>취소</Button>
                    <Button variant="primary" onClick={handleSaveNotice}>저장</Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default AdminPage;
