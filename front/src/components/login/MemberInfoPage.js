import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import MemberForm from './MemberForm';
import 'bootstrap/dist/css/bootstrap.min.css';

const MemberInfoPage = () => {
    const [member, setMember] = useState(null);
    const [showConfirmDialog, setShowConfirmDialog] = useState(false);
    const [showDeleteDialog, setShowDeleteDialog] = useState(false);
    const [deleteConfirmation, setDeleteConfirmation] = useState('');
    const [isEditing, setIsEditing] = useState(false);

    const fetchMemberInfo = useCallback(() => {
        axios.get('/member/info', { withCredentials: true })
            .then(response => {
                setMember(response.data);
            })
            .catch(error => {
                console.error('회원 정보 조회 실패:', error);
            });
    }, []);

    useEffect(() => {
        fetchMemberInfo();
    }, [fetchMemberInfo]);

    const handleDeleteRequest = () => {
        setShowConfirmDialog(true);
    };

    const handleConfirmDelete = () => {
        setShowConfirmDialog(false);
        setShowDeleteDialog(true);
    };

    const handleCancelDelete = () => {
        setShowConfirmDialog(false);
    };

    const handleDeleteConfirmation = (e) => {
        setDeleteConfirmation(e.target.value);
    };

    const handleFinalDelete = () => {
        if (deleteConfirmation.toLowerCase() === '탈퇴') {
            axios.delete(`/member/${member.memId}`, { withCredentials: true })
                .then(() => {
                    alert('회원 탈퇴가 완료되었습니다.');
                    window.opener.handleLogout();
                    window.close();
                })
                .catch(error => {
                    console.error('회원 탈퇴 실패:', error);
                    alert('회원 탈퇴 중 오류가 발생했습니다.');
                });
        } else {
            alert('올바른 확인 단어를 입력해주세요.');
        }
    };

    const handleEditClick = () => {
        setIsEditing(true);
    };

    const handleEditCancel = () => {
        setIsEditing(false);
    };

    const handleEditSuccess = () => {
        setIsEditing(false);
        fetchMemberInfo();
    };

    if (!member) return <div>로딩 중...</div>;

    return (
        <div className="container" id="memberInfoContent" style={{ marginTop: '20px' }}>
            {!isEditing ? (
                <>
                    <h2>회원 정보</h2><br/>
                    <p>아이디: {member.memId}</p>
                    <p>이름: {member.memName}</p>
                    <p>이메일: {member.email}</p>
                    <p>전화번호: {member.tel}</p>
                    <p>주소: {member.addr1} {member.addr2}</p>
                    <button className="btn btn-primary btn-sm" onClick={handleEditClick}>정보 수정</button>&nbsp;
                    <button className="btn btn-outline-secondary btn-sm" onClick={handleDeleteRequest}>회원 탈퇴</button>
                </>
            ) : (
                <MemberForm
                    initialData={member}
                    onSubmit={handleEditSuccess}
                    onCancel={handleEditCancel}
                    isEditing={true}
                />
            )}

            {showConfirmDialog && (
                <div className="dialog"><br/>
                    <div className="alert alert-warning" role="alert">
                        정말로 탈퇴하시겠습니까?
                    </div>
                    <button className="btn btn-primary" onClick={handleConfirmDelete}>확인</button>&nbsp;
                    <button className="btn btn-secondary" onClick={handleCancelDelete}>취소</button>
                </div>
            )}

            {showDeleteDialog && (
                <div className="dialog">
                    <div className="alert alert-info" role="alert">
                        탈퇴를 원하시면 '탈퇴'라고 입력해주세요.
                    </div>
                    <input
                        type="text"
                        className="form-control"
                        value={deleteConfirmation}
                        onChange={handleDeleteConfirmation}
                    />
                    <button className="btn btn-danger" onClick={handleFinalDelete}>확인</button>
                </div>
            )}
        </div>
    );
};

export default MemberInfoPage;
