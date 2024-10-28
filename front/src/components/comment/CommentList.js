import axios from "axios";
import { useState, useEffect } from "react";
import Pagination from "react-js-pagination";

import Comment from "./Comment.js"

function CommentList(props) {

	const boardno = props.boardno;

	// Paging
	const [page, setPage] = useState(1);
	const [totalCnt, setTotalCnt] = useState(0);

	const [commentList, setCommentList] = useState([]);

	const changePage = (page) => {
		setPage(page);
		getCommentList(page);
	}

	const getCommentList = async (page) => {
		await axios.get(`http://localhost:8080/comment/list`, { params: { "boardno": boardno, "page": page } })
			.then((resp) => {
				console.log("[BbsComment.js] getCommentList() success :D");
				console.log(resp.data);

				setCommentList(resp.data.commentList);
				setTotalCnt(resp.data.pageCnt);

			}).catch((err) => {
				console.log("[BbsComment.js] getCommentList() error :<");
				console.log(err);

			});
	}

	useEffect(() => {
		getCommentList(1);
	}, []);

	return (
		<>

			<div className="my-1 d-flex justify-content-center">
				<h5><i className="fas fa-paperclip"></i> 댓글 목록 </h5>
			</div>

            {
            commentList.length === 0 ? (
                <div className="my-5 d-flex justify-content-center">
                    <span>등록된 댓글이 없습니다.</span>
                </div>
            ) : (
                commentList.map(function (comment, idx) {
                    return (
                        <div className="my-5" key={idx}>
                            <Comment obj={comment} key={idx} />
                        </div>
                    );
                })
            )
        }

			<Pagination
				activePage={page}
				itemsCountPerPage={5}
				totalItemsCount={totalCnt}
				pageRangeDisplayed={5}
				prevPageText={"‹"}
				nextPageText={"›"}
				onChange={changePage} />


		</>

	);
}


export default CommentList;