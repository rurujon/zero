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
		<>
			{/* 상단 영역 (프로필 이미지, 댓글 작성자, 댓글 작성시간) */}
			<div className="my-1 d-flex justify-content-center">
				<div className="col-1">
					<img src="/images/profile-placeholder.png" alt="프로필 이미지" className="profile-img" />
				</div>
				<div className="col-2">
					<div className="row">
						<span className="comment-id">{comment.memId}</span>
					</div>
					<div className="row">
						<span>{new Date(comment.created).toISOString().slice(0, 16).replace('T', ' ')}</span>
					</div>
				</div>

				<div className="col-3 d-flex justify-content-end">
				{
					(memId === comment.memId || role === "ADMIN") &&
					<>
						<button className="btn btn-outline-secondary" onClick={() => setShow(!show)}>
							<i className="fas fa-edit"></i> 수정
						</button>
						&nbsp; 
						<button className="btn btn-outline-danger" onClick={deleteComment}>
							<i className="fas fa-trash-alt"></i> 삭제
						</button>
					</>
				}
				</div>
			</div>

			{/* 댓글 수정하는 경우 */}
			{show ? (
				<>
					<div className="my-3 d-flex justify-content-center">
						<textarea className="col-7" rows="3" value={content} onChange={changeContent}></textarea>
					</div>
					<div className="my-1 d-flex justify-content-center">
						<button className="btn btn-dark" onClick={updateComment}>
							<i className="fas fa-edit"></i> 수정 완료
						</button>
					</div>
				</>
			) : (
				<>
					<div className="my-4 d-flex justify-content-center">
						<div className="col-4 comment">{content}</div>
					</div>
				</>
			)}
		</>
	);
}

export default Comment;
