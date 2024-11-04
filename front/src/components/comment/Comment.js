import axios from "axios";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from '../login/context/AuthContext';

function Comment(props) {
	const comment = props.obj;
	const boardno = props.boardno;
	const navigate = useNavigate();
	const { token } = useContext(AuthContext);

	const [show, setShow] = useState(false); // 상태변수, 초기값은 댓글 수정창이 닫혀있는 상태
	const [content, setContent] = useState(comment.content);

	// token에서 memId와 role 추출
	const getTokenData = (token) => {
		if (token) {
			const payloadBase64 = token.split('.')[1];
			const decodedPayload = JSON.parse(atob(payloadBase64));
			return { memId: decodedPayload.sub, role: decodedPayload.role };
		}
		return { memId: null, role: null };
	};

	const { memId, role } = getTokenData(token);

	const headers = token ? { Authorization: `Bearer ${token}`, memId: memId } : {};

	const changeContent = (event) => setContent(event.target.value);

	/* 댓글 수정 */
	const updateComment = async () => {
		const req = { content };
        
		try {
			const resp = await axios.post(`http://localhost:8080/comment/${comment.commentno}?boardno=${comment.boardno}`, req, { headers });
			console.log("[Comment.js] updateComment() success :D", resp.data);
			alert("댓글이 수정되었습니다.");
			setContent(resp.data.updatedContent);
			navigate(0); // 새로고침
		} catch (err) {
			console.error("[Comment.js] updateComment() error :<", err);
			alert(err.response?.data || "댓글 수정 중 오류 발생");
		}

		setShow(false);
	};

	/* 댓글 삭제 */
	const deleteComment = async () => {
		const confirmed = window.confirm("정말 이 댓글을 삭제하시겠습니까?");
		if (!confirmed) return;
	
		try {
			const headers = { Authorization: `Bearer ${token}` };
			const resp = await axios.delete(`http://localhost:8080/comment/${comment.commentno}`, { headers });
			console.log("[Comment.js] deleteComment() success :D", resp.data);
	
			if (resp.data.deletedRecordCount === 1) {
				alert("댓글이 삭제되었습니다.");
				navigate(0); // 페이지 새로고침
			}
		} catch (err) {
			console.error("[Comment.js] deleteComment() error :<", err);
			alert("댓글 삭제 중 오류가 발생했습니다.");
		}
	};
	

	return (
		<div className="d-flex justify-content-center">
			<div className="comment-container p-3 mb-3 rounded">
				{/* 상단 영역: 프로필 이미지와 사용자 ID, 시간, 수정/삭제 버튼 */}
				<div className="d-flex align-items-center justify-content-between mb-1">
					<div className="d-flex align-items-center">
						{/* 프로필 이미지 */}
						<img src="/images/profile-placeholder.png" alt="프로필 이미지" className="profile-img me-3" style={{ width: '50px', height: '50px', borderRadius: '50%' }}/>

						{/* 사용자 ID와 시간 */}
						<span className="comment-id">{comment.memId}</span>&nbsp;&nbsp;
						<span className="comment-date ms-2">
							{new Date(comment.created).toLocaleDateString()} {new Date(comment.created).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false })}
						</span>
					</div>
					
					{/* 수정/삭제 버튼 */}
					{(memId === comment.memId || role === "ADMIN") && (
						<div>
							<button className="btn btn-sm btn-link" onClick={() => setShow(!show)}>
								수정
							</button>
							<button className="btn btn-sm btn-link text-danger" onClick={deleteComment}>
								삭제
							</button>
						</div>
					)}
				</div>

				{/* 댓글 내용 */}
				<div className="comment-text">{content}</div>

				{/* 댓글 수정 폼 */}
				{show && (
					<div className="mt-2">
						<textarea
							className="form-control"
							rows="2"
							value={content}
							onChange={changeContent}
						></textarea>
						<button className="btn btn-dark btn-sm mt-2" onClick={updateComment}>
							수정 완료
						</button>
					</div>
				)}
			</div>
		</div>


	);
}

export default Comment;
