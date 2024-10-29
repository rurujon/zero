import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";


/* 댓글 컴포넌트 */
function Comment(props) {
	const comment = props.obj;
    const boardno = props.boardno;

	const navigate = useNavigate();

	const [show, setShow] = useState(false); //상태변수, 초기값은 댓글 수정창이 닫혀있는 상태
	const [content, setContent] = useState(comment.content);

	const memId = localStorage.getItem("memId");
	const headers = { "memId": memId };

	const changeContent = (event) => {
		setContent(event.target.value);
	};

	/* 댓글 수정 */
	const updateComment = async () => {
		const req = {
			content: content
		};
        
		await axios.post(`http://localhost:8080/comment/${comment.commentno}?boardno=${comment.boardno}`, req, { headers })
			.then((resp) => {
				console.log("[Comment.js] updateComment() success :D");
				console.log(resp.data);

				alert("댓글이 수정되었습니다.");
				setContent(resp.data.updatedContent);
				navigate(0); // 새로고침
			}).catch((err) => {
				console.log("[Comment.js] updateComment() error :<");
				console.log(err);

				alert(err.response.data);
			});

		updateToggle(); // show 상태를 토글
	};

	/* 댓글 삭제 */
	const deleteComment = async () => {
		const confirmed = window.confirm("정말 이 게시글을 삭제하시겠습니까?");
    	if (!confirmed) return;
		
		await axios.get(`http://localhost:8080/comment/${comment.commentno}?boardno=${boardno}`, { headers })
			.then((resp) => {
				console.log("[Comment.js] deleteComment() success :D");
				console.log(resp.data);

				if (resp.data.deletedRecordCount === 1) {
					alert("댓글이 삭제되었습니다.");
					navigate(0);
				}
			}).catch((err) => {
				console.log("[Comment.js] deleteComment() error :<");
				console.log(err);
			});
	};

	function updateToggle() { 
		setShow(show => !show) 
	}

	// 삭제되지 않은 댓글의 경우
	if (comment.del === 0) {
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
						/* 자신이 작성한 댓글인 경우에만 수정 삭제 가능 */
						(memId === comment.memId) ?
							<>
								<button className="btn btn-outline-secondary" onClick={updateToggle}><i className="fas fa-edit"></i> 수정</button> &nbsp; 
								<button className="btn btn-outline-danger" onClick={deleteComment}><i className="fas fa-trash-alt"></i> 삭제</button>
							</>
							: null
					}
					</div>
				</div>

				{
					/* 댓글 수정하는 경우 */
					show ?
						<>
							{/* 하단 영역 (댓글 내용 + 댓글 내용 편집 창) */}
							<div className="my-3 d-flex justify-content-center">
								<textarea className="col-7" rows="3" value={content} onChange={changeContent}></textarea>
							</div>
							<div className="my-1 d-flex justify-content-center">
								<button className="btn btn-dark" onClick={updateComment}><i className="fas fa-edit"></i> 수정 완료</button>
							</div>
						</>
					:
						<>
							{/* 하단 영역 (댓글 내용) */}
							<div className="my-4 d-flex justify-content-center">
								<div className="col-4 comment">{content}</div>
							</div>
						</>
				}
			</>
		);
	}

	else {
		return (
			<>
				<div className="my-5 d-flex justify-content-center">
					<div className="comment">
						<span className="del-span">⚠️ 삭제된 댓글입니다.</span>
					</div>
				</div>
			</>
		);
	}
}

export default Comment;
