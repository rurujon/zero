import axios from "axios";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Pagination from "react-js-pagination";
import { ArrowRightIcon } from '@heroicons/react/24/solid';

import './bbs.css';
import './page.css';

function BbsList() {
	const [bbsList, setBbsList] = useState([]);
	const [choiceVal, setChoiceVal] = useState("");
	const [searchVal, setSearchVal] = useState("");
	const [category, setCategory] = useState(""); 
	const [page, setPage] = useState(1);
	const [totalCnt, setTotalCnt] = useState(0);
	let navigate = useNavigate();

	const getBbsList = async (choice, search, page) => {
		await axios.get("http://localhost:8080/board/list", { params: { "choice": choice, "search": search, "page": page, "category": category } })
			.then((resp) => {
				setBbsList(resp.data.bbsList);
				setTotalCnt(resp.data.pageCnt);
			})
			.catch((err) => console.log(err));
	};

	useEffect(() => {
		getBbsList("", "", 1, "");
	}, []);

	const changeChoice = (event) => setChoiceVal(event.target.value);
	const changeSearch = (event) => setSearchVal(event.target.value);

	const changeCategory = (event) => {
		const selectedCategory = event.target.value;
		setCategory(selectedCategory);
		setPage(1);
		getBbsList("", "", 1, selectedCategory);
	};

	const search = () => {
		navigate("/board/list");
		getBbsList(choiceVal, searchVal, 1, category);
	};

	const handleKeyDown = (event) => {
		if (event.key === 'Enter') search();
	};

	const changePage = (page) => {
		setPage(page);
		getBbsList(choiceVal, searchVal, page);
	};

	return (
		<div>
			{/* 검색 */}
			<table className="search">
				<tbody>
					<tr className="category-filter">
						<td>
							<select value={category} onChange={changeCategory} className="form-control">
								<option value="">전체 카테고리</option>
								<option value="제로웨이스트 실천 팁">제로웨이스트 실천 팁</option>
								<option value="재활용 정보 및 가이드">재활용 정보 및 가이드</option>
								<option value="업사이클링 아이디어">업사이클링 아이디어</option>
								<option value="기타">기타</option>
							</select>
						</td>
					</tr>
					<tr>
						<td>
							<select className="custom-select" value={choiceVal} onChange={changeChoice}>
								<option>검색 옵션 선택</option>
								<option value="title">제목</option>
								<option value="content">내용</option>
								<option value="writer">작성자</option>
							</select>
						</td>
						<td>
							<input type="text" className="form-control" placeholder="검색어" value={searchVal} onChange={changeSearch} onKeyDown={handleKeyDown} />
						</td>
						<td>
							<button type="button" className="btn btn-outline-secondary" onClick={search}><i className="fas fa-search"></i> 검색</button>
						</td>
					</tr>
				</tbody>
			</table>

			<br />

			{/* 게시글 목록 */}
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
					{bbsList.map((board, idx) => (
						<TableRow obj={board} key={idx} cnt={idx + 1} />
					))}
				</tbody>
			</table>

			{/* 페이지네이션 */}
			<Pagination
				className="pagination"
				activePage={page}
				itemsCountPerPage={10}
				totalItemsCount={totalCnt}
				pageRangeDisplayed={5}
				prevPageText={"‹"}
				nextPageText={"›"}
				onChange={changePage}
			/>
			
			<div className="my-5 d-flex justify-content-center">
				<Link className="btn btn-outline-secondary" to="/board/write"><i className="fas fa-pen"></i>글쓰기</Link>
			</div>
		</div>
	);
}

function TableRow(props) {
	const board = props.obj;

	return (
		<tr>
			<th>{props.cnt}</th>
			{board.del === 0 ? (
				<>
					<td>[{board.category}]</td>
					<td>
						<Arrow depth={board.depth} />
						<Link to={{ pathname: `/board/${board.boardno}` }}>
							<span className="underline bbs-title">{board.title}</span>
						</Link>
					</td>
					<td>{board.memId}</td>
					<td>{board.hitcount}</td>
					<td>{new Date(board.created).toLocaleDateString()}</td>
				</>
			) : (
				<>
					<td></td>
					<td>
						<Arrow depth={board.depth} />
						<span className="del-span">⚠️ 삭제된 게시물입니다.</span>
					</td>
				</>
			)}
		</tr>
	);
}

const tap = "\u00A0\u00A0\u00A0\u00A0";
function Arrow({ depth }) {
	if (depth === 0) return null;

	const taps = Array(depth).fill(tap);

	return (
		<>
			{taps}
			<ArrowRightIcon style={{ height: '15px', width: '15px', color: 'black' }} />
		</>
	);
}

export default BbsList;
