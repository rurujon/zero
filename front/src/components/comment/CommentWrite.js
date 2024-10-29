import axios from "axios";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

import { HttpHeadersContext } from "../context/HttpHeadersProvider";

import './comment.css';

function CommentWrite(props) {

	const { headers, setHeaders } = useContext(HttpHeadersContext);

	const memId = localStorage.getItem("memId");
	const boardno  = props.boardno;

	const navigate = useNavigate();

	const [content, setContent] = useState("");

	const chageContent = (event) => {
		setContent(event.target.value);
	}

	const createComment = async() => {

		if (!content.trim()) {
			alert("댓글 내용을 입력해 주세요.");
			return;
		}

		const req = {
			memId: memId,
			content: content,
			boardno: boardno 
		}

		await axios.post(`http://localhost:8080/comment/write`, req, { params: { boardno: boardno }, headers })
		.then((resp) => {
			console.log("[CommentWrite.js] createComment() success :D");
			console.log(resp.data);

			if (resp.data.boardno != null) {
				alert("댓글이 등록되었습니다.");
				navigate(0);
			}

		}).catch((err) => {
			console.log("[CommentWrite.js] createComment() error :<");
			console.log(err);

		});
	}

	return (
		<>
            {/* 상단 영역 (프로필 이미지, 댓글 작성자) */}
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
            {/* 하단 영역 (댓글 내용) */}
            <div className="my-3 d-flex justify-content-center">
                <textarea className="col-7" rows="3" value={content} onChange={chageContent}></textarea>
            </div><br/><br/>
		</>
	)
}

export default CommentWrite;