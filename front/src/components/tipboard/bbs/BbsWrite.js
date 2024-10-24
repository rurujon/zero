import axios from "axios";
import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { HttpHeadersContext } from "../context/HttpHeadersProvider";

function BbsWrite() {
	const { headers } = useContext(HttpHeadersContext);

	const navigate = useNavigate();

	const [title, setTitle] = useState("");
	const [content, setContent] = useState("");

	const changeTitle = (event) => {
		setTitle(event.target.value);
	}

	const changeContent = (event) => {
		setContent(event.target.value);
	}

	/* [POST /bbs]: 게시글 작성 */
	const createBbs = async () => {
		const req = {
			memId: localStorage.getItem("memId"),
			title: title,
			content: content
		};

		await axios.post("http://localhost:8080/bbs/write", req, { headers: headers })
			.then((resp) => {
				console.log("[BbsWrite.js] createBbs() success :D");
				console.log(resp.data);

				alert("새로운 게시글을 성공적으로 등록했습니다 :D");
				navigate(`/bbsdetail/${resp.data.seq}`); // 새롭게 등록한 글 상세로 이동
			})
			.catch((err) => {
				console.log("[BbsWrite.js] createBbs() error :<");
				console.log(err);
			});
	}

	// 로그인 상태를 localStorage에서 확인
	useEffect(() => {
		const isLoggedIn = localStorage.getItem("memId"); // 로그인된 사용자 ID가 있으면 로그인 상태로 간주

		if (!isLoggedIn) {
			alert("로그인 한 사용자만 게시글을 작성할 수 있습니다 !");
			navigate("/login"); // 로그인 페이지로 이동
		}
	}, [navigate]);

	return (
		<div>
			<table className="table">
				<tbody>
					<tr>
						<th className="table-primary">작성자</th>
						<td>
							<input type="text" className="form-control" value={localStorage.getItem("memId")} size="50px" readOnly />
						</td>
					</tr>

					<tr>
						<th className="table-primary">제목</th>
						<td>
							<input type="text" className="form-control" value={title} onChange={changeTitle} size="50px" />
						</td>
					</tr>

					<tr>
						<th className="table-primary">내용</th>
						<td>
							<textarea className="form-control" value={content} onChange={changeContent} rows="10"></textarea>
						</td>
					</tr>
				</tbody>
			</table>

			<div className="my-5 d-flex justify-content-center">
				<button className="btn btn-outline-secondary" onClick={createBbs}><i className="fas fa-pen"></i> 등록하기</button>
			</div>
		</div>
	);
}

export default BbsWrite;
