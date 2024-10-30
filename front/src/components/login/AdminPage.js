import React, { useState, useEffect,useContext } from 'react';
import axios from 'axios';
import { AuthContext } from './context/AuthContext';

const AdminPage = () => {
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState('');
    const [points, setPoints] = useState(0);
    const [operation, setOperation] = useState('add');
    const [reason, setReason] = useState('');
    const { role } = useContext(AuthContext);

    useEffect(() => {
        if (role !== 'ADMIN') {
            alert('관리자 권한이 확인되었습니다.');
            return;
        }
        fetchUsers();
    }, [role]);

    const fetchUsers = async () => {
        try {
            const response = await axios.get('/member/admin/users');
            setUsers(response.data);
        } catch (error) {
            console.error('사용자 목록 조회 실패:', error);
            if (error.response && error.response.status === 403) {
                alert('관리자 권한이 필요합니다. 다시 로그인해주세요.');
            }
        }
    };

    const handleRoleChange = async (memId, newRole) => {
        try {
            await axios.post('/member/admin/change-role', null, { params: { memId, role: newRole } });
            alert('역할이 성공적으로 변경되었습니다.');
            fetchUsers();
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
                params: {
                    memId: selectedUser,
                    points,
                    operation,
                    reason
                }
            });
            alert('포인트가 성공적으로 조정되었습니다.');
            fetchUsers();
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
                await axios.delete(`/member/${memId}`);
                alert('회원이 성공적으로 삭제되었습니다.');
                fetchUsers(); // 사용자 목록 새로고침
            } catch (error) {
                console.error('회원 삭제 실패:', error);
                alert('회원 삭제 중 오류가 발생했습니다.');
            }
        }
    };

    return (
        <div className="container mt-5">
            <h2>관리자 페이지</h2>
            <hr />
            <h3>사용자 목록</h3>
            <table className="table table-bordered">
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
            </table>

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
        </div>
    );

};

export default AdminPage;
