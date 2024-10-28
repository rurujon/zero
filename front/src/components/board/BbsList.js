import axios from "axios";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Pagination from "react-js-pagination";
import { ArrowRightIcon } from '@heroicons/react/24/solid';

import './bbs.css';
import './page.css';

function BbsList() {

	//서버에서 가져온 게시글 목록 저장
	const [bbsList, setBbsList] = useState([]);

	// 검색용 Hook (옵션, 검색어 저장)
	const [choiceVal, setChoiceVal] = useState("");
	const [searchVal, setSearchVal] = useState("");

	// Paging (현재 페이지 번호, 전체 게시글 수)
	const [page, setPage] = useState(1);
	const [totalCnt, setTotalCnt] = useState(0);

	// Link 용 (함수) 
	let navigate = useNavigate();


	/* [GET /bbs]: 게시글 목록 */
	const getBbsList = async (choice, search, page) => {

		//백엔드에 get 요청
		await axios.get("http://localhost:8080/board/list", { params: { "choice": choice, "search": search, "page": page } })
			.then((resp) => {
				console.log("[BbsList.js] useEffect() success :D");
				console.log(resp.data);

				setBbsList(resp.data.bbsList);
				setTotalCnt(resp.data.pageCnt);
			})
			.catch((err) => {
				console.log("[BbsList.js] useEffect() error :<");
				console.log(err);

			});
	}

	useEffect(() => {
		getBbsList("", "", 1); //초기페이지 1로 설정
	}, []);


	const changeChoice = (event) => { setChoiceVal(event.target.value); }
	const changeSearch = (event) => { setSearchVal(event.target.value); }
	const search = () => {
		console.log("[BbsList.js searchBtn()] choiceVal=" + choiceVal + ", searchVal=" + searchVal);

		navigate("/board/list");
		getBbsList(choiceVal, searchVal, 1);
	}

	// Enter 키가 눌렸을 때 검색 함수 호출
	const handleKeyDown = (event) => {
		if (event.key === 'Enter') {
			search();
		}
	}

	//페이지 변경시 호출되는 함수
	const changePage = (page) => {
		setPage(page);
		getBbsList(choiceVal, searchVal, page); //해당 페이지의 게시글 목록을 다시 가져옴
	}

	return (

		<div>

			{ /* 검색 */}
			<table className="search">
				<tbody>
					<tr>
						<td>
							<br/><select className="custom-select" value={choiceVal} onChange={changeChoice}>
								<option>검색 옵션 선택</option>
								<option value="title">제목</option>
								<option value="content">내용</option>
								<option value="writer">작성자</option>
							</select>
						</td>
						<td>
							<br/><input type="text" className="form-control" placeholder="검색어" value={searchVal} onChange={changeSearch} onKeyDown={handleKeyDown} />
						</td>
						<td>
							<br/><button type="button" className="btn btn-outline-secondary" onClick={search}><i className="fas fa-search"></i> 검색</button>
						</td>
					</tr>
				</tbody>
			</table><br />

			<table className="table table-hover">
				<thead>
					<tr>
						<th className="col-1">번호</th>
						<th className="col-2">카테고리</th>
						<th className="col-5">제목</th>
						<th className="col-1">작성자</th>
						<th className="col-1">조회수</th>
                        <th className="col-2">작성일</th>
					</tr>
				</thead>

				<tbody>
					{
						bbsList.map(function (board, idx) {
							return (
								<TableRow obj={board} key={idx} cnt={idx + 1} /> //사용자에게 보여줄 글번호여서 인덱스 +1
							)
						})
					}
				</tbody>
			</table>

			<Pagination className="pagination"
				activePage={page} //현재 보고있는 페이지
				itemsCountPerPage={10} //한 페이지에 10개 표시
				totalItemsCount={totalCnt} //전체 개시글 수
				pageRangeDisplayed={5} //5페이지씩
				prevPageText={"‹"}
				nextPageText={"›"}
				onChange={changePage} />
				
			<div className="my-5 d-flex justify-content-center">
				<Link className="btn btn-outline-secondary" to="/board/write"><i className="fas fa-pen"></i>글쓰기</Link>
			</div>

		</div>
	);
}

/* 글 목록 테이블 행 컴포넌트 */
function TableRow(props) {
	const board = props.obj;

	return (
			<tr>
				
					<th>{props.cnt}</th>
					{
						(board.del == 0) ?
						// 삭제되지 않은 게시글
						<>
							<td>[{board.category}]</td>
							<td >
								<Arrow depth={board.depth}></Arrow> {/* 답글 화살표 */}

								<Link to={{ pathname: `/board/${board.boardno}` }}> {/* 게시글 상세 링크 */}
									<span className="underline bbs-title" >{board.title} </span> { /* 게시글 제목 */}
								</Link>
							</td>
							<td>{board.memId}</td>
							<td>{board.hitcount}</td>
							<td>{new Date(board.created).toLocaleDateString()}</td>
						</>
						:
						// 삭제된 게시글
						<>
							<td></td> {/* 카테고리 비워둠 */}
							<td>
								<Arrow depth={board.depth}></Arrow> &nbsp; {/* 답글 화살표 */}

								<span className="del-span">⚠️ 이 글은 작성자에 의해 삭제됐습니다.</span>
							</td>
						</>	
					}
					
				
			</tr>
		
	);
}

const tap = "\u00A0\u00A0\u00A0\u00A0";
function Arrow( props ) { //게시글의 깊이를 표시하기 위한 컴포넌트
	//깊이에 따라 답글의 화살표를 렌더링 (0이면 아무것도 반환X)
	const depth = props.depth;

	if (depth === 0) {
		return null;
	}

	const taps = [];
	for(let i = 0; i < depth; i++) {
		taps.push(tap);
	}

	return (
		<>
			{/* {taps} <span className="arrow-right"></span> */}
			{taps} <ArrowRightIcon  style={{ height: '15px', width: '15px', color: 'black' }} />
		</> 
	 );
}

export default BbsList;