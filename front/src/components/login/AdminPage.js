import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from './context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Table, Form, Button, Pagination, Modal } from 'react-bootstrap';

const AdminPage = () => {
    const { token } = useContext(AuthContext);
    const navigate = useNavigate();

    // 회원 목록 관련 상태
    const [members, setMembers] = useState([]);
    const [memberCurrentPage, setMemberCurrentPage] = useState(1); // 회원 목록 전용 페이지 상태
    const [memberTotalPages, setMemberTotalPages] = useState(0);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedMember, setSelectedMember] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [pointAmount, setPointAmount] = useState('');
    const [pointOperation, setPointOperation] = useState('add');
    const pageSize = 10;

    // 공지사항 목록 관련 상태
    const [notices, setNotices] = useState([]);
    const [noticeCurrentPage, setNoticeCurrentPage] = useState(1);  // 공지사항 전용 페이지 상태
    const [noticeTotalPages, setNoticeTotalPages] = useState(0);
    const [showNoticeModal, setShowNoticeModal] = useState(false);
    const [currentNotice, setCurrentNotice] = useState({ title: '', content: '' });
    const [noticeOperation, setNoticeOperation] = useState('create');

    // 회원 목록 불러오기 함수
    const fetchMembers = async () => {
        try {
            const response = await axios.get('/member/admin/search', {
                headers: { Authorization: `Bearer ${token}` },
                params: { searchTerm, page: memberCurrentPage, limit: pageSize }
            });
            setMembers(response.data.members);
            setMemberTotalPages(Math.ceil(response.data.totalCount / pageSize));
        } catch (error) {
            console.error('Error fetching members:', error);
        }
    };

    // 공지사항 목록 불러오기 함수
    const fetchNotices = async () => {
        try {
            const response = await axios.get('/api/notices', {
                headers: { Authorization: `Bearer ${token}` },
                params: { page: noticeCurrentPage, limit: pageSize }
            });
            setNotices(response.data.notices);
            setNoticeTotalPages(Math.ceil(response.data.totalCount / pageSize));
        } catch (error) {
            console.error('공지사항 목록 조회 실패:', error);
        }
    };

    // 페이지 로드 시 데이터 불러오기
    useEffect(() => {
        fetchMembers();
        fetchNotices();
    }, [memberCurrentPage, noticeCurrentPage]);

    // 검색 처리 함수
    const handleSearch = (e) => {
        e.preventDefault();
        setMemberCurrentPage(1);
        fetchMembers();
    };

    // 역할 변경 처리 함수
    const handleRoleChange = async (memId, newRole) => {
        try {
            await axios.post('/member/admin/change-role', null, {
                headers: { Authorization: `Bearer ${token}` },
                params: { memId, role: newRole }
            });
            // 알림 메시지 추가
        alert(`회원 ${memId}의 역할이 ${newRole}로 변경되었습니다.`);
            // 현재 페이지 유지하며 목록 갱신
            fetchMembers(memberCurrentPage);
        } catch (error) {
            console.error('Error changing role:', error);
            alert('역할 변경 중 오류가 발생했습니다.');
        }
    };

    // 회원 삭제 처리 함수
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

    // 포인트 관리 모달 열기
    const openPointModal = (member) => {
        setSelectedMember(member);
        setShowModal(true);
    };

    // 포인트 관리 처리 함수
    const handlePointSubmit = async () => {
        try {
            await axios.post('/member/admin/manage-points', null, {
                headers: { Authorization: `Bearer ${token}` },
                params: { memId: selectedMember.memId, points: pointAmount, operation: pointOperation }
            });
            setShowModal(false);
            alert(`회원 ${selectedMember.memId}의 포인트가 ${pointOperation === 'add' ? '추가' : '차감'}되었습니다.`);
            // 현재 페이지 유지하며 목록 갱신
            fetchMembers(memberCurrentPage);
        } catch (error) {
            console.error('Error managing points:', error);
            alert('포인트 관리 중 오류가 발생했습니다.');
        }
    };

    // 공지사항 모달 열기
    const openNoticeModal = (operation, notice = { title: '', content: '' }) => {
        setNoticeOperation(operation);
        setCurrentNotice(notice);
        setShowNoticeModal(true);
    };

    // 공지사항 저장 처리 함수
    const handleSaveNotice = async () => {
        try {
            if (noticeOperation === 'create') {
                await axios.post('/api/notices', currentNotice, {
                    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` }
                });
                alert('새 공지사항이 성공적으로 작성되었습니다.');
            } else {
                await axios.put(`/api/notices/${currentNotice.noticeId}`, currentNotice, {
                    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` }
                });
                alert('공지사항이 성공적으로 수정되었습니다.');
            }
            setShowNoticeModal(false);
            fetchNotices();
        } catch (error) {
            console.error('공지사항 저장 실패:', error);
            alert('공지사항 저장 중 오류가 발생했습니다. 다시 시도해주세요.');
        }
    };

    // 공지사항 삭제 처리 함수
    const handleDeleteNotice = async (noticeId) => {
        if (window.confirm('이 공지사항을 삭제하시겠습니까?')) {
            try {
                await axios.delete(`/api/notices/${noticeId}`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                alert('공지사항이 성공적으로 삭제되었습니다.');
                fetchNotices();
            } catch (error) {
                console.error('공지사항 삭제 실패:', error);
                alert('공지사항 삭제 중 오류가 발생했습니다. 다시 시도해주세요.');
            }
        }
    };

    return (
        <div className="container mt-5">
            <h2>회원 목록</h2>
            <Form onSubmit={handleSearch} className="mb-3">
                <Form.Group>
                    <Form.Control type="text" placeholder="ID,이름,이메일 중 하나 입력하여 검색가능" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
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
                                <Form.Select value={member.role} onChange={(e) => handleRoleChange(member.memId, e.target.value)}>
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

            {/* 회원 목록 페이징 */}
            <Pagination>
                {[...Array(memberTotalPages).keys()].map(number => (
                    <Pagination.Item key={number + 1} active={number + 1 === memberCurrentPage} onClick={() => setMemberCurrentPage(number + 1)}>
                        {number + 1}
                    </Pagination.Item>
                ))}
            </Pagination>

            {/* 공지사항 관리 */}
            <h3 className="mt-4">공지사항 관리</h3>

            {/* 공지사항 작성 버튼 */}
            <Button onClick={() => openNoticeModal('create')} className="mb-3">새 공지사항 작성</Button>

            {/* 공지사항 목록 */}
            <Table striped bordered hover className="table table-bordered">
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

            {/* 공지사항 페이징 */}
            <Pagination>
                {[...Array(noticeTotalPages).keys()].map(number => (
                    <Pagination.Item key={number + 1} active={number + 1 === noticeCurrentPage} onClick={() => setNoticeCurrentPage(number + 1)}>
                        {number + 1}
                    </Pagination.Item>
                ))}
            </Pagination>

            {/* 포인트 관리 모달 */}
            <Modal show={showModal} onHide={() => setShowModal(false)}>
            <Modal.Header closeButton>
                <Modal.Title>포인트 관리</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group>
                        <Form.Label>포인트 수정</Form.Label>
                        <Form.Control
                            type="number"
                            value={pointAmount}
                            onChange={(e) => setPointAmount(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>작업</Form.Label>
                        <Form.Select
                            value={pointOperation}
                            onChange={(e) => setPointOperation(e.target.value)}
                        >
                            <option value="add">추가</option>
                            <option value="subtract">차감</option>
                        </Form.Select>
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={() => setShowModal(false)}>
                    취소
                </Button>
                <Button variant="primary" onClick={handlePointSubmit}>
                    저장
                </Button>
            </Modal.Footer>
        </Modal>

        {/* 공지사항 관리 모달 */}
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
                            onChange={(e) => setCurrentNotice({ ...currentNotice, title: e.target.value })}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>내용</Form.Label>
                        <Form.Control
                            as="textarea"
                            rows={3}
                            value={currentNotice.content}
                            onChange={(e) => setCurrentNotice({ ...currentNotice, content: e.target.value })}
                        />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={() => setShowNoticeModal(false)}>
                    취소
                </Button>
                <Button variant="primary" onClick={handleSaveNotice}>
                    저장
                </Button>
            </Modal.Footer>
        </Modal>
    </div>
);
};

export default AdminPage;
