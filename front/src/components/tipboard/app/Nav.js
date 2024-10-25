import { useContext } from "react";
import { AuthContext } from "../context/AuthProvider";
import { Link } from "react-router-dom";

function Nav() {

	const { auth, setAuth } = useContext(AuthContext);

	return (
<div className="container">
    {/* 메인 화면 */}
    <p>
        <Link to="/"><i className="fas fa-home"></i> Home</Link> &nbsp;|&nbsp;
        <Link to="/bbs/list"><i className="fas fa-home"></i> 글목록</Link> &nbsp;|&nbsp;
        <Link to="/bbs/write"><i className="fas fa-home"></i> 글쓰기</Link>
    </p>

    {							
        (auth) ? 
            <>
                {/* 회원 정보 */}
                <p> {auth} 님 반갑습니다 <i className="fab fa-ello"></i> &nbsp; </p>
                {/* 로그아웃
                <Link to="/logout"><i className="fas fa-sign-out-alt"></i> 로그아웃</Link> */}
            </>
            :
            <>
                {/* 로그인 */}
                <p><Link to="/login">로그인</Link></p>
                {/* 회원가입
                <p><Link to="/join">회원가입</Link></p> */}
            </>
    }
</div>
	);
}

export default Nav;