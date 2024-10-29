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

	const changeTitle = (event) => {
		setTitle(event.target.value);
	}

	const changeContent = (event) => {
		setContent(event.target.value);
	}

	const changeCategory = (event) => { // 카테고리 변경 핸들러 추가
        setCategory(event.target.value);
    }


	/* [POST /bbs]: 게시글 작성 */
	const insertBoard = async () => {
		const req = {
			memId: localStorage.getItem("memId"),
			category: category,
			title: title,
			content: content
		};



		await axios.post("http://localhost:8080/board/write", req, { headers: headers })
			.then((resp) => {
				console.log("[BbsWrite.js] insertBoard() success :D");
				console.log(resp.data);

				alert("게시글이 등록되었습니다.");
				navigate(`/board/${resp.data.boardno}`); // 새롭게 등록한 글 상세로 이동
			})
			.catch((err) => {
				console.log("[BbsWrite.js] insertBoard() error :<");
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
                            <select
                                value={category}
                                onChange={changeCategory}
                                className="form-control"
                            >
                                <option value="">정보 유형을 선택하세요</option>
                                <option value="제로웨이스트 실천 팁">제로웨이스트 실천 팁</option>
                                <option value="재활용 정보 및 가이드">재활용 정보 및 가이드</option>
                                <option value="업사이클링 아이디어">업사이클링 아이디어</option>
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
				</tbody>
			</table>

			<div className="my-5 d-flex justify-content-center">
				<button className="btn btn-outline-secondary" onClick={insertBoard}><i className="fas fa-pen"></i> 등록하기</button>&nbsp;
				<button className="btn btn-outline-secondary" onClick={cancelWrite}><i className="fas fa-pen"></i> 취소하기</button>
			</div>
		</div>
	);
}

export default BbsWrite;
