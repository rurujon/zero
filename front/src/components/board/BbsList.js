// BbsList.js
import axios from "axios";
import { useState, useEffect, useContext } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import Pagination from "react-js-pagination";
import { AuthContext } from '../login/context/AuthContext';
import './bbs.css';
import './page.css';

function BbsList() {
    const { token } = useContext(AuthContext); // AuthContext에서 token 가져오기
    const [bbsList, setBbsList] = useState([]);
    const [choiceVal, setChoiceVal] = useState("");
    const [searchVal, setSearchVal] = useState("");
    const [category, setCategory] = useState("");
    const [page, setPage] = useState(1);
    const [totalCnt, setTotalCnt] = useState(0);
    const navigate = useNavigate();
    const location = useLocation();

    const getBbsList = async (choice, search, page) => {
		try {
			const headers = token ? { Authorization: `Bearer ${token}` } : {};
			const response = await axios.get("http://localhost:8080/board/list", {
				headers: headers,
				params: { choice, search, page, category }
			});
			setBbsList(response.data.bbsList);
			setTotalCnt(response.data.pageCnt);
		} catch (err) {
			console.log("게시글 목록 조회 실패:", err);
		}
	};

    useEffect(() => {
        const urlParams = new URLSearchParams(location.search);
        const pageFromUrl = parseInt(urlParams.get("page"), 10) || 1;
        setPage(pageFromUrl);
        getBbsList(choiceVal, searchVal, pageFromUrl);
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
        navigate("/board/list?page=1");
        getBbsList(choiceVal, searchVal, 1, category);
    };

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') search();
    };

    const changePage = (page) => {
        setPage(page);
        getBbsList(choiceVal, searchVal, page);
        navigate(`/board/list?page=${page}`);
    };

    return (
        <div>
            <div className="table-container">
                {/* 테이블 제목과 설명 */}
                <div className="table-header d-flex align-items-center justify-content-start">
                    <h3 className="table-title">참여게시판</h3>
                    <p className="table-description ms-3">여러분의 소중한 후기와 정보를 공유해 주세요.</p>
                </div>
                <tbody>
                    <tr className="category-filter">
                        <td>
                            <select value={category} onChange={changeCategory} className="form-control" style={{border: 0} }>
                                <option value="">전체 카테고리</option>
                                <option value="제로웨이스트 실천 팁">제로웨이스트 실천 팁</option>
                                <option value="재활용 정보 및 가이드">재활용 정보 및 가이드</option>
                                <option value="대체용품 사용후기">대체용품 사용후기</option>
                                <option value="기타">기타</option>
                            </select>
                        </td>
                        <td>
                            <select className="form-control" value={choiceVal} onChange={changeChoice} style={{border: 0}}>
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


            <br />

            {/* 게시글 목록 */}
            <table className="table custom-table">
                <thead>
                    <tr>
                        <th className="col-1">번호</th>
                        <th className="col-2">카테고리</th>
                        <th className="col-5">제목</th>
                        <th className="col-1">작성자</th>
                        <th className="col-1">조회</th>
                        <th className="col-2">작성일</th>
                    </tr>
                </thead>
                <tbody>
                    {bbsList.map((board, idx) => (
                        <TableRow obj={board} key={idx} cnt={idx + 1} page={page} />
                    ))}
                </tbody>
            </table>
        </div>

            {/* 페이지네이션 */}
            <div className="d-flex justify-content-between align-items-center mb-2">
                <div className="mx-auto">
                    <Pagination
                        className="pagination"
                        activePage={page}
                        itemsCountPerPage={15}
                        totalItemsCount={totalCnt}
                        pageRangeDisplayed={5}
                        prevPageText={"‹"}
                        nextPageText={"›"}
                        onChange={changePage}
                    />
                </div>
                <Link className="btn btn-outline-secondary" to="/board/write">
                    <i className="fas fa-pen"></i> 글쓰기
                </Link>
            </div>
        </div>
    );
}

function TableRow(props) {
    const board = props.obj;
    const { page } = props;

    return (
        <tr>
            
            {board.del === 0 ? (
                <>
                    <th>{board.boardno}</th>
                    <td>[{board.category}]</td>
                    <td>
                        <Arrow depth={board.depth} />
                        <Link to={{ pathname: `/board/${board.boardno}`, search: `?page=${page}` }} style={{ textDecoration: 'none', color: 'inherit' }}>
                            <span className="underline bbs-title">
                                &nbsp;{board.title}
                                {board.urlFile && board.urlFile !== '' && (
                                    <span style={{ marginLeft: '5px' }}>🧷</span>
                                )}
                                {/* 댓글 수 표시 */}
                                {board.commentCount > 0 && (
									<span style={{ marginLeft: '10px', color: '#ff6347', fontWeight: 'bold' }}>[{board.commentCount}]</span>
								)}
                            </span>
                        </Link>
                    </td>
                    <td>{board.memId}</td>
                    <td>{board.hitcount}</td>
                    <td>{new Date(board.created).toLocaleDateString()}</td>
                </>
            ) : (
                <>
                    <td></td>
                    <td></td>
                    <td>
                        <Arrow depth={board.depth} />
                        <span className="del-span">⚠️ 삭제된 게시물입니다.</span>
                    </td>
                    <td></td>
                    <td></td>
                    <td></td>
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
            {taps}➥&nbsp;[Re:]&nbsp;
        </>
    );
}

export default BbsList;
