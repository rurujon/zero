import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import MemberForm from './MemberForm';
import 'bootstrap/dist/css/bootstrap.min.css';
import { adjustWindowSize } from './utils/Sizing';

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
                adjustWindowSize(window, response.data, isEditing, getAdditionalContent());
            })
            .catch(error => {
                console.error('회원 정보 조회 실패:', error);
            });
    }, [isEditing]);

    useEffect(() => {
        fetchMemberInfo();
    }, [fetchMemberInfo]);

    const getAdditionalContent = () => {
        return [
            'editButton',
            'deleteButton',
            ...(showConfirmDialog ? ['confirmDialog'] : []),
            ...(showDeleteDialog ? ['deleteDialog'] : [])
        ];
    };

    useEffect(() => {
        if (member) {
            adjustWindowSize(window, member, isEditing, getAdditionalContent());
        }
    }, [isEditing, showConfirmDialog, showDeleteDialog, member]);

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
                    if (window.opener && typeof window.opener.handleLogout === 'function') {
                        window.opener.handleLogout();
                    }
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
        setIsEditing(false)
        fetchMemberInfo()
        setIsEditing(false)
        fetchMemberInfo()
    };
    const handleCloseWindow=()=>{
        window.close()
        if(!window.closed){
            alert("창을 닫을 수 없습니다. 브라우저 설정을 확인해주세요.")

        }
    }
    const handleCloseWindow=()=>{
        window.close()
        if(!window.closed){
            alert("창을 닫을 수 없습니다. 브라우저 설정을 확인해주세요.")

        }
    }

    if (!member) return <div>유효한 회원정보를 가져올수 없습니다.회원가입 또는 로그인하세요.</div>;
    if (!member) return <div>유효한 회원정보를 가져올수 없습니다.회원가입 또는 로그인하세요.</div>;

    return (
        <div className="container" id="memberInfoContent" style={{ marginTop: '20px'}}>
            {!isEditing ? (
                <div style={{ marginLeft: '20px'}}>
                    <h2>회원 정보</h2>
                    <div class="mb-3 row" >
                        <label class="col-sm-2 col-form-label">아이디</label>
                        <div class="col-sm-10">
                        <label class="col-sm-7 col-form-label">{member.memId}</label>
                        </div>
                    </div>
                    <div class="mb-3 row">
                        <label class="col-sm-2 col-form-label">이름</label>
                        <div class="col-sm-10">
                        <label class="col-sm-7 col-form-label">{member.memName}</label>
                        </div>
                    </div>
                    <div class="mb-3 row">
                        <label class="col-sm-2 col-form-label">이메일</label>
                        <div class="col-sm-10">
                        <label class="col-sm-7 col-form-label">{member.email}</label>
                        </div>
                    </div>
                    <div class="mb-3 row">
                        <label class="col-sm-2 col-form-label">전화번호</label>
                        <div class="col-sm-10">
                        <label class="col-sm-7 col-form-label">{member.tel}</label>
                        </div>
                    </div>
                    <div class="mb-3 row">
                        <label class="col-sm-2 col-form-label">주소</label>
                        <div class="col-sm-10">
                        <label class="col-sm-7 col-form-label">{`${member.addr1} ${member.addr2}`}</label>
                        </div>
                    </div>
                    <button className="btn btn-primary btn-sm" onClick={handleCloseWindow}>창 닫 기</button>&nbsp;
                    <button className="btn btn-primary btn-sm" onClick={handleEditClick}>정보 수정</button>&nbsp;
                    <button className="btn btn-outline-secondary btn-sm " onClick={handleDeleteRequest}>회원 탈퇴</button><br/><br/>
                </div>
            ) : (
                <MemberForm
                    initialData={member}
                    onSubmit={handleEditSuccess}
                    onCancel={handleEditCancel}
                    isEditing={true}
                />
            )}

            {showConfirmDialog && (
                <div className="container">
                    <div className="alert alert-warning" role="alert">
                        정말로 탈퇴하시겠습니까?
                    </div>
                    <button className="btn btn-primary" onClick={handleConfirmDelete} style={{marginBottom:'20px'}}>확인</button>&nbsp;
                    <button className="btn btn-secondary" onClick={handleCancelDelete} style={{marginBottom:'20px'}}>취소</button>
                </div>
            )}

            {showDeleteDialog && (
                <div className="container">
                    <div className="alert alert-info" role="alert">
                        탈퇴를 원하시면 '탈퇴'라고 입력해주세요.
                    </div>
                    <input
                        type="text"
                        className="form-control"
                        value={deleteConfirmation}
                        onChange={handleDeleteConfirmation}
                        style={{marginBottom:'20px'}}
                    />
                    <button className="btn btn-danger" onClick={handleFinalDelete}>확인</button>
                </div>
            )}
        </div>
    );
};

export default MemberInfoPage;
