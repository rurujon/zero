import axios from "axios";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from '../login/context/AuthContext';

import './comment.css';

function CommentWrite(props) {
	const { token } = useContext(AuthContext);
	const navigate = useNavigate();
	const boardno = props.boardno;
	const [content, setContent] = useState("");

	// token에서 memId 추출
	const getMemIdFromToken = (token) => {
		if (token) {
			const payloadBase64 = token.split('.')[1];
			const decodedPayload = JSON.parse(atob(payloadBase64));
			console.log("Decoded token payload:", decodedPayload); // 디코딩된 토큰 페이로드 확인
			return decodedPayload.sub;
		}
		return null;
	};

	const memId = getMemIdFromToken(token);

	const changeContent = (event) => setContent(event.target.value);

	const createComment = async () => {
		if (!content.trim()) {
			alert("댓글 내용을 입력해 주세요.");
			return;
		}
	
		if (!token) {
			alert("로그인이 필요합니다.");
			navigate("/login");
			return;
		}
	
		const req = {
			memId: memId,
			content: content,
		};
	
		console.log("Request payload:", req); // 요청 데이터 확인
	
		try {
			const headers = {
				Authorization: `Bearer ${token}`,
				"Content-Type": "application/json",
			};
			console.log("Headers:", headers); // 헤더가 올바르게 설정되었는지 확인
	
			// `boardno`를 URL 쿼리 파라미터로 전달
			const resp = await axios.post(
				`http://localhost:8080/comment/write?boardno=${boardno}`,
				req, // JSON 형식으로 전송
				{ headers }
			);
	
			console.log("[CommentWrite.js] createComment() success :D");
			console.log(resp.data);
	
			if (resp.data.boardno != null) {
				alert("댓글이 등록되었습니다.");
				navigate(0);
			}
		} catch (err) {
			console.log("[CommentWrite.js] createComment() error :<");
			console.log(err.response ? err.response.data : err.message); // 오류 메시지 확인
		}
	};

	return (
		<>
            <div className="my-1 d-flex justify-content-center">
                <div className="col-1">
                    <img src="/images/profile-placeholder.png" alt="프로필 이미지" className="profile-img"/>
                </div>
                <div className="col-4">
                    <span className="comment-id">{memId}</span>
                </div>
                <div className="col-2 my-1 d-flex justify-content-end">
                    <button className="btn btn-outline-secondary" onClick={createComment}>
                        <i className="fas fa-comment-dots"></i> 댓글 추가
                    </button>
                </div>
            </div>
            <div className="my-3 d-flex justify-content-center">
                <textarea className="col-7" rows="3" value={content} onChange={changeContent}></textarea>
            </div><br/><br/>
		</>
	);
}

export default CommentWrite;
