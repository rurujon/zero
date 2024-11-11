import React, { useState, useEffect, useCallback, useContext } from 'react';
import axios from 'axios';
import MemberForm from './MemberForm';
import 'bootstrap/dist/css/bootstrap.min.css';
import { adjustWindowSize } from './utils/Sizing';
import { AuthContext } from './context/AuthContext';
import Calendar from './Calendar';
import 'react-calendar/dist/Calendar.css';
import './MemberInfoPage.css';
import { useNavigate } from 'react-router-dom';

const MemberInfoPage = () => {
  const navigate = useNavigate();
  const [member, setMember] = useState(null);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [deleteConfirmation, setDeleteConfirmation] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const { token, logout } = useContext(AuthContext);

  const [initialSize, setInitialSize] = useState({ width: 1000, height: 800 });

  useEffect(() => {
    setInitialSize({ width: window.outerWidth, height: window.outerHeight });

    const handleStorageChange = (e) => {
      if (e.key === 'logoutEvent') {
        window.close();
      }
    };

    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  const resetWindowSize = () => {
    window.resizeTo(initialSize.width, initialSize.height);
  };

  const fetchMemberInfo = useCallback(() => {
    return axios
      .get('/member/info', { headers: { Authorization: `Bearer ${token}` } })
      .then((response) => {
        setMember(response.data);
        return response.data;
      })
      .catch((error) => {
        console.error('회원 정보 조회 실패:', error);
      });
  }, [token]);

  useEffect(() => {
    if (token) {
      fetchMemberInfo();
    }
  }, [fetchMemberInfo, token]);

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
      if (!token) {
        console.error('인증 토큰이 없습니다.');
        alert('로그인 상태를 확인해주세요.');
        return;
      }
      axios
        .delete(`/member/${member.memId}`, { headers: { Authorization: `Bearer ${token}` } })
        .then(() => {
          alert('회원 탈퇴가 완료되었습니다.');
          logout();
          window.close();
          if (window.opener) {
            window.opener.location.href = '/mainpage';
          }
        })
        .catch((error) => {
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
    resetWindowSize();
    setIsEditing(false);
  };

  const handleEditSuccess = () => {
    resetWindowSize();
    setIsEditing(false);
    fetchMemberInfo();
  };

  const handleCloseWindow = () => {
    resetWindowSize();
    window.close();
  };

  if (!member)
    return <div>유효한 회원정보를 가져올 수 없습니다. 회원가입 또는 로그인하세요.</div>;

  return (
    <div className="container" id="memberInfoContent" style={{ marginTop: '20px' }}>
      <div className="row">
        <div className="col-md-6">
          {!isEditing ? (
            <div style={{ marginLeft: '20px' }}>
              <h2 style={{ fontFamily: '"Noto Sans KR", "나눔고딕", "맑은 고딕", sans-serif', fontWeight: '700', color: '#353535',margin:'20px 0' }}>회원 정보</h2>
              <div className="info-box mb-3 row">
                <label className="col-sm-2 col-form-label" style={{ fontWeight: 'bold' }}>아&nbsp;&nbsp;이&nbsp;&nbsp;디</label>
                <div className="col-sm-10">
                  <label className="col-sm-7 col-form-label">{member.memId}</label>
                </div>
              </div>
              <div className="info-box mb-3 row">
                <label className="col-sm-2 col-form-label" style={{ fontWeight: 'bold' }}>이&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;름</label>
                <div className="col-sm-10">
                  <label className="col-sm-7 col-form-label">{member.memName}</label>
                </div>
              </div>
              <div className="info-box mb-3 row">
                <label className="col-sm-2 col-form-label" style={{ fontWeight: 'bold' }}>이&nbsp;&nbsp;메&nbsp;&nbsp;일</label>
                <div className="col-sm-10">
                  <label className="col-sm-7 col-form-label">{member.email}</label>
                </div>
              </div>
              <div className="info-box mb-3 row">
                <label className="col-sm-2 col-form-label" style={{ fontWeight: 'bold' }}>전화번호</label>
                <div className="col-sm-10">
                  <label className="col-sm-7 col-form-label">{member.tel}</label>
                </div>
              </div>
              <div className="info-box mb-3 row">
                <label className="col-sm-2 col-form-label" style={{ fontWeight: 'bold' }}>주&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;소</label>
                <div className="col-sm-10">
                <label className="col-sm-7 col-form-label" style={{ whiteSpace: 'pre-line' }}>
                  {`${member.addr1}\n${member.addr2}`}
                </label>
                </div>
              </div>

              <button className="btn btn-primary btn-sm" onClick={handleCloseWindow}>
                창 닫기
              </button>&nbsp;
              <button className="btn btn-primary btn-sm" onClick={handleEditClick}>
                정보 수정
              </button>&nbsp;
              <button className="btn btn-primary btn-sm"
              onClick={() => navigate('/donatehistory')} >
                후원 내역
              </button>&nbsp;
              <button
                className="btn btn-outline-secondary btn-sm"
                onClick={handleDeleteRequest}
              >
                회원 탈퇴
              </button><br /><br />
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
              <button
                className="btn btn-primary"
                onClick={handleConfirmDelete}
                style={{ marginBottom: '20px' }}
              >
                확인
              </button>&nbsp;
              <button
                className="btn btn-secondary"
                onClick={handleCancelDelete}
                style={{ marginBottom: '20px' }}
              >
                취소
              </button>
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
                style={{ marginBottom: '20px' }}
              />
              <button
                className="btn btn-danger"
                onClick={handleFinalDelete}
                style={{ marginBottom: '20px' }}
              >
                확인
              </button>
            </div>
          )}
        </div>

        {!isEditing && (
          <div className="col-md-6">
            <h2 style={{ fontFamily: '"Noto Sans KR", "나눔고딕", "맑은 고딕", sans-serif', fontWeight: '700', color: '#353535',margin:'20px 0' }}>월별 출석현황</h2>
            <Calendar memId={member.memId} />
          </div>
        )}
      </div>
    </div>
  );
};

export default MemberInfoPage;
