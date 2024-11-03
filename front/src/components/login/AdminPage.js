import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from './context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Table, Form, Button, Pagination, Modal } from 'react-bootstrap';

const AdminPage = () => {
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState('');
    const [points, setPoints] = useState(0);
    const [operation, setOperation] = useState('add');
    const [reason, setReason] = useState('');
    const { role, token } = useContext(AuthContext);
    const navigate = useNavigate();

    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [pageSize] = useState(10);

    const [notices, setNotices] = useState([]);
    const [showNoticeModal, setShowNoticeModal] = useState(false);
    const [currentNotice, setCurrentNotice] = useState({ title: '', content: '' });
    const [noticeOperation, setNoticeOperation] = useState('create');


  useEffect(() => {
    const checkAdminStatus = async () => {
      if (!token) {
        alert('로그인이 필요합니다.');
        navigate('/login');
        return;
      }
      try {
        const response = await axios.get('/member/info', {
          headers: { Authorization: `Bearer ${token}` }
        });
        if (response.data.role !== 'ADMIN') {
          alert('관리자 권한이 없습니다.');
          navigate('/');
          return;
        }
        fetchMembers();
      } catch (error) {
        console.error('사용자 정보 확인 실패:', error);
        alert('사용자 정보를 확인하는 데 실패했습니다.');
        navigate('/');
      }
    };
    checkAdminStatus();
  }, [token, navigate]);

  const fetchMembers = async () => {
    try {
      const response = await axios.get('/member/admin/search', {
        headers: { Authorization: `Bearer ${token}` },
        params: { searchTerm, page: currentPage, size: pageSize }
      });
      setUsers(response.data.members);
      setTotalPages(Math.ceil(response.data.totalCount / pageSize));
    } catch (error) {
      console.error('사용자 목록 조회 실패:', error);
      if (error.response) {
        if (error.response.status === 403) {
          alert('관리자 권한이 필요합니다. 다시 로그인해주세요.');
          navigate('/login');
        } else {
          alert(`사용자 목록을 불러오는 데 실패했습니다: ${error.response.data}`);
        }
      } else {
        alert('서버와의 통신 중 오류가 발생했습니다.');
      }
    }
  };

  useEffect(() => {
    fetchMembers();
  }, [currentPage, searchTerm]);

  const handleRoleChange = async (memId, newRole) => {
    try {
      await axios.post('/member/admin/change-role', null, {
        params: { memId, role: newRole }
      });
      alert('역할이 성공적으로 변경되었습니다.');
      fetchMembers();
    } catch (error) {
      console.error('역할 변경 실패:', error);
      alert('역할 변경 중 오류가 발생했습니다.');
    }
  };

  const handlePointManagement = async () => {
    if (!selectedUser || points <= 0) {
      alert('사용자와 포인트를 올바르게 입력해주세요.');
      return;
    }
    try {
      await axios.post('/api/point/admin/manage-points', null, {
        params: { memId: selectedUser, points, operation, reason }
      });
      alert('포인트가 성공적으로 조정되었습니다.');
      fetchMembers();
      setSelectedUser('');
      setPoints(0);
      setReason('');
    } catch (error) {
      console.error('포인트 조정 실패:', error);
      alert('포인트 조정 중 오류가 발생했습니다.');
    }
  };

  const handlePointsChange = (e) => {
    const value = parseInt(e.target.value, 10);
    if (isNaN(value)) {
      setPoints(0);
    } else {
      setPoints(value);
    }
  };

  const handleDeleteUser = async (memId) => {
    if (window.confirm('정말로 이 회원을 삭제하시겠습니까? 이 작업은 되돌릴 수 없습니다.')) {
      try {
        await axios.delete(`/member/admin/${memId}`);
        alert('회원이 성공적으로 삭제되었습니다.');
        fetchMembers();
      } catch (error) {
        console.error('회원 삭제 실패:', error);
        alert('회원 삭제 중 오류가 발생했습니다.');
      }
    }
  };

  // 페이지 변경 핸들러
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

    // 검색 핸들러
    const handleSearch = (e) => {
        e.preventDefault();
        setCurrentPage(1);
        fetchUsers();
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

    useEffect(() => {
        if (role === 'ADMIN') {
            fetchNotices();
        }
    }, [role, currentPage]);

    // 공지사항 모달 열기
    const openNoticeModal = (operation, notice = { title: '', content: '' }) => {
        setNoticeOperation(operation);
        setCurrentNotice(notice);
        setShowNoticeModal(true);
    };

    // 공지사항 저장
    const handleSaveNotice = async () => {
        try {
            const response = await axios.post('/api/notices', currentNotice, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}` // 토큰을 헤더에 추가
                }
            });
            setShowNoticeModal(false);
            fetchNotices();
            alert('공지사항이 성공적으로 저장되었습니다.');
        } catch (error) {
            console.error('공지사항 저장 실패:', error);
            if (error.response) {
                alert(`공지사항 저장에 실패했습니다: ${error.response.data.error || error.response.data}`);
            } else {
                alert('공지사항 저장 중 오류가 발생했습니다.');
            }
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
            <hr />
            <h3>사용자 목록</h3>
            <Form onSubmit={handleSearch} className="mb-3">
                <Form.Group className="mb-3" controlId="searchForm">
                    <Form.Control
                        type="text"
                        placeholder="아이디, 이름, 이메일 또는 전화번호를 직접 입력하여 자동 검색"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </Form.Group>

            </Form>
            <Table className="table table-bordered">
                <thead>
                    <tr>
                        <th>아이디</th>
                        <th>이름</th>
                        <th>이메일</th>
                        <th>전화번호</th>
                        <th>역할</th>
                        <th>역할 변경</th>
                        <th>회원삭제</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(user => (
                        <tr key={user.memId}>
                            <td>{user.memId}</td>
                            <td>{user.memName}</td>
                            <td>{user.email}</td>
                            <td>{user.tel}</td>
                            <td>{user.role}</td>
                            <td>
                                <select
                                    value={user.role}
                                    onChange={(e) => handleRoleChange(user.memId, e.target.value)}
                                    className="form-select form-select-sm"
                                >
                                    <option value="USER">USER</option>
                                    <option value="ADMIN">ADMIN</option>
                                </select>
                            </td>
                            <td>
                                <button
                                    className="btn btn-danger btn-sm"
                                    onClick={() => handleDeleteUser(user.memId)}
                                >
                                    삭제
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
            <Pagination>
                {[...Array(totalPages).keys()].map(number => (
                    <Pagination.Item
                        key={number + 1}
                        active={number + 1 === currentPage}
                        onClick={() => handlePageChange(number + 1)}
                    >
                        {number + 1}
                    </Pagination.Item>
                ))}
            </Pagination>

            <h3 className="mt-4">포인트 관리</h3>
            <div className="row mb-3">
                <div className="col-md-3">
                    <label htmlFor="userSelect" className="form-label">사용자 선택</label>
                    <select
                        id="userSelect"
                        className="form-select"
                        value={selectedUser}
                        onChange={(e) => setSelectedUser(e.target.value)}
                    >
                        <option value="">선택하세요</option>
                        {users.map(user => (
                            <option key={user.memId} value={user.memId}>
                                {user.memId} - {user.memName}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="col-md-3">
                    <label htmlFor="points" className="form-label">포인트</label>
                    <input
                        type="number"
                        id="points"
                        className="form-control"
                        value={points}
                        onChange={handlePointsChange}
                        min="1"
                    />
                </div>
                <div className="col-md-3">
                    <label htmlFor="operation" className="form-label">작업</label>
                    <select
                        id="operation"
                        className="form-select"
                        value={operation}
                        onChange={(e) => setOperation(e.target.value)}
                    >
                        <option value="add">추가</option>
                        <option value="subtract">차감</option>
                    </select>
                </div>
                <div className="col-md-3">
                    <label htmlFor="reason" className="form-label">변경 사유</label>
                    <input
                        type="text"
                        id="reason"
                        className="form-control"
                        value={reason}
                        onChange={(e) => setReason(e.target.value)}
                    />
                </div>
            </div>
            <button className="btn btn-primary" onClick={handlePointManagement}>포인트 조정</button>

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
