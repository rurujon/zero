import axios from "axios";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import { HttpHeadersContext } from "../context/HttpHeadersProvider";
import { AuthContext } from '../login/context/AuthContext';

function BbsAnswer() {
	const { headers } = useContext(HttpHeadersContext);
	const { token } = useContext(AuthContext);
	const navigate = useNavigate();
	const { parentno } = useParams(); // 부모 글 번호
	const location = useLocation();
	const { parentBbs } = location.state;

	const [title, setTitle] = useState("");
	const [content, setContent] = useState("");

	// token에서 memId 추출
	const getMemIdFromToken = (token) => {
		if (token) {
			const payloadBase64 = token.split('.')[1];
			const decodedPayload = JSON.parse(atob(payloadBase64));
			return decodedPayload.sub; // sub 필드를 memId로 사용
		}
		return null;
	};

	const memId = getMemIdFromToken(token);

	const changeTitle = (event) => setTitle(event.target.value);
	const changeContent = (event) => setContent(event.target.value);

	const createBbsAnswer = async () => {
		const req = {
			memId: memId, // token에서 추출한 memId 사용
			title: title,
			content: content
		};
		
		try {
			const resp = await axios.post(`http://localhost:8080/board/${parentno}/answer`, req, { headers });
			console.log("[BbsAnswer.js] createBbsAnswer() success :D");

			alert("답글이 등록되었습니다.");
			navigate(`/board/${resp.data.boardno}`); // 새롭게 등록한 답글 상세로 이동
		} catch (err) {
			console.log("[BbsAnswer.js] createBbsAnswer() error :<");
			console.log(err);
		}
	};

	useEffect(() => {
		if (!memId) {
			alert("로그인 한 사용자만 게시글에 대한 답글을 작성할 수 있습니다.");
			navigate(-1);
		}
	}, [memId, navigate]);

	const cancelWrite = () => {
		const confirmed = window.confirm("답글 작성을 취소하시겠습니까?");
		if (!confirmed) return;
		navigate(`/board/${parentno}`);
	};

	return (
		<div>
			{/* 부모 게시글 정보 */}
			<table className="table table-striped">
				<tbody>
					<tr>
						<th className="col-3">작성자</th>
						<td>
							<span>{parentBbs.memId}</span>
						</td>
					</tr>

					<tr>
						<th>제목</th>
						<td>
							<span>{parentBbs.title}</span>
						</td>
					</tr>

					<tr>
						<th>내용</th>
						<td>
						{parentBbs.urlFile && (
                                <div>
                                    <img 
                                        src={parentBbs.urlFile} 
                                        alt="첨부된 이미지" 
                                        style={{ maxWidth: "30%", marginTop: "20px" }}
                                    />
                                </div>
                            )}
							<span style={{ whiteSpace: "pre-line" }}>{parentBbs.content}</span>
						</td>
					</tr>
				</tbody>
			</table><br/><br/>

			{/* 답글 작성 */}
			<h3>📌 Reply</h3>
			<table className="table">
				<tbody>
					<tr>
						<th className="table-primary">작성자</th>
						<td>
							<input type="text" className="form-control" value={memId || ""} size="50px" readOnly />
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
				<button className="btn btn-outline-secondary" onClick={createBbsAnswer}>
					<i className="fas fa-pen"></i>등록하기
				</button>&nbsp;
				<button className="btn btn-outline-secondary" onClick={cancelWrite}>
					<i className="fas fa-pen"></i> 취소하기
				</button>
			</div>
		</div>
	);
}

export default BbsAnswer;
