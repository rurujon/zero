import axios from "axios";
import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { HttpHeadersContext } from "../context/HttpHeadersProvider";

function BbsWrite() {
	const { headers } = useContext(HttpHeadersContext);
	const navigate = useNavigate();

	const [title, setTitle] = useState("");
	const [content, setContent] = useState("");
	const [category, setCategory] = useState("");
	const [file, setFile] = useState(null);
	const [loading, setLoading] = useState(false); // 로딩 상태 관리

	const changeTitle = (event) => {
		setTitle(event.target.value);
	};

	const changeContent = (event) => {
		setContent(event.target.value);
	};

	const changeCategory = (event) => {
		setCategory(event.target.value);
	};

	const handleFileChange = (event) => setFile(event.target.files[0]);

	const uploadFile = async (boardno) => {
		if (!file) return; // 파일이 없으면 종료

		const formData = new FormData();
		formData.append("file", file);
		formData.append("boardno", boardno); // 게시글 번호 추가

		setLoading(true); // 로딩 시작
		try {
			await axios.post("http://localhost:8080/board/uploadFile", formData, {
				headers: {
					...headers,
					"Content-Type": "multipart/form-data",
				},
			});
			console.log("[BbsWrite.js] uploadFile() success :D");
		} catch (err) {
			console.log("[BbsWrite.js] uploadFile() error :<");
			alert("파일 업로드에 실패했습니다: " + err.message);
		} finally {
			setLoading(false); // 로딩 종료
		}
	};

	// 게시글 작성
	const insertBoard = async () => {
		const formData = new FormData();
		formData.append("memId", localStorage.getItem("memId"));
		formData.append("category", category);
		formData.append("title", title);
		formData.append("content", content);

		setLoading(true); // 로딩 시작
		try {
			const resp = await axios.post("http://localhost:8080/board/write", formData, {
				headers: {
					...headers,
					"Content-Type": "multipart/form-data",
				},
			});
			console.log("[BbsWrite.js] insertBoard() success :D");
			console.log(resp.data);
			const boardno = resp.data.boardno; // 새로 생성된 게시글 번호

			// 게시글이 성공적으로 등록된 후 파일 업로드
			await uploadFile(boardno);
			alert("게시글이 등록되었습니다.");
			navigate(`/board/${boardno}`); // 새롭게 등록한 글 상세로 이동
		} catch (err) {
			console.log("[BbsWrite.js] insertBoard() error :<");
			alert("게시글 등록에 실패했습니다: " + err.message);
		} finally {
			setLoading(false); // 로딩 종료
		}
	};

	// 로그인 상태 확인
	useEffect(() => {
		const isLoggedIn = localStorage.getItem("memId"); // 로그인된 사용자 ID가 있으면 로그인 상태로 간주

		if (!isLoggedIn) {
			alert("로그인 한 사용자만 게시글을 작성할 수 있습니다 !");
			navigate("/login"); // 로그인 페이지로 이동
		}
	}, [navigate]);

	const cancelWrite = () => {
		const confirmed = window.confirm("게시물 작성을 취소하시겠습니까?");
		if (!confirmed) return;
		navigate("/board/list");
	};

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
						<th className="table-primary">정보유형</th>
						<td>
							<select value={category} onChange={changeCategory} className="form-control">
								<option value="">정보 유형을 선택하세요</option>
								<option value="제로웨이스트 실천 팁">제로웨이스트 실천 팁</option>
								<option value="재활용 정보 및 가이드">재활용 정보 및 가이드</option>
								<option value="대체용품 사용후기">대체용품 사용후기</option>
								<option value="기타">기타</option>
							</select>
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
					<tr>
						<th className="table-primary">파일 업로드</th>
						<td>
							<input type="file" onChange={handleFileChange} />
						</td>
					</tr>
				</tbody>
			</table>

			<div className="my-5 d-flex justify-content-center">
				<button className="btn btn-outline-secondary" onClick={insertBoard} disabled={loading}>
					<i className="fas fa-pen"></i> {loading ? "등록 중..." : "등록하기"}
				</button>&nbsp;
				<button className="btn btn-outline-secondary" onClick={cancelWrite}>
					<i className="fas fa-pen"></i> 취소하기
				</button>
			</div>
		</div>
	);
}

export default BbsWrite;
