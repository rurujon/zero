import axios from "axios";
import { useState, useEffect } from "react";
import Comment from "./Comment.js";

function CommentList(props) {

	const boardno = props.boardno;

	const [page, setPage] = useState(1);
	const [totalCnt, setTotalCnt] = useState(0);
	const [commentList, setCommentList] = useState([]);

	const getCommentList = async (page) => {
		try {
			const resp = await axios.get(`http://localhost:8080/comment/list`, { params: { "boardno": boardno, "page": page } });
			console.log("[BbsComment.js] getCommentList() success :D");

			// 기존 commentList에 새로운 댓글 리스트를 추가합니다.
			setCommentList((prevList) => [...prevList, ...resp.data.commentList]);
			setTotalCnt(resp.data.pageCnt);

		} catch (err) {
			console.log("[BbsComment.js] getCommentList() error :<", err);
		}
	};

	const loadMoreComments = () => {
		const nextPage = page + 1;
		setPage(nextPage);
		getCommentList(nextPage);
	};

	useEffect(() => {
		getCommentList(1);
	}, []);

	return (
		<>
			<div className="my-1 d-flex justify-content-center">
				<h5><i className="fas fa-paperclip"></i>댓글 [{totalCnt}]</h5>
			</div>

			{commentList.length === 0 ? (
				<div className="my-5 d-flex justify-content-center">
					<span>등록된 댓글이 없습니다.</span>
				</div>
			) : (
				commentList.map((comment, idx) => (
					<div className="my-5" key={idx}>
						<Comment obj={comment} />
					</div>
				))
			)}

			{totalCnt > commentList.length && (
				<div className="my-3 d-flex justify-content-center">
					<button onClick={loadMoreComments} className="more-button">
					더보기 <span className="more-button-icon">⌵</span>
					</button>
				</div>
			)}
		</>
	);
}

export default CommentList;
