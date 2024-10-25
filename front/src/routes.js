import ImgArticle from "./components/imgboard/ImgArticle";
import ImgCreated from "./components/imgboard/ImgCreated";
import ImgList from "./components/imgboard/ImgList";
import HomePage from "./components/login/HomePage";
import MainPageApp from "./components/mainPage/MainPageApp";
import NewsList from "./components/naverapi/NewsList";
import BoardWrite from "./components/board/BoardWrite";



//링크 경로를 기록하는 파일입니다.
//공용 파일이니 보기 쉽도록 App.js와 같은 위치에 만들었습니다.
//가장 상위 Router인 App에서 실행되므로, 여기다가 경로 기록하시면 어디서든 원하는 경로로 들어갈 수 있습니다.
//헷갈릴 수 있으니, 주석처리로 어느 페이지인지 기록한 뒤 링크 경로를 기록해두시면 될 것 같습니다.

export const routes = [

    
    // { path:'/', element:<MainPageApp/>},    //메인페이지

    // { path:'/naverNewsList', element:<NewsList/>},   //네이버api 뉴스리스트

    // { path:'/seoulNewsEnv', element:<SeoulNewsEnv/>},   //서울env 뉴스리스트
    // { path:'/seoulNewsEco', element:<SeoulNewsEco/>},   //서울eco 뉴스리스트
    // { path:'/seoulNewsAir', element:<SeoulNewsAir/>},   //서울air 뉴스리스트
    // { path:'/seoulNewsGreen', element:<SeoulNewsGreen/>},   //서울green 뉴스리스트


    //ImgBoard
    { path: '/imgboard/created', element: <ImgCreated /> },
    { path: '/imgboard/list', element: <ImgList /> },
   { path: '/imgboard/article', element: <ImgArticle/> }, //QueryParameter 위함



    //TipBoard
    // { path: '/bbs/list', element: <BbsList /> },
    { path: '/board/write', element: <BoardWrite /> },
    // { path: '/bbsdetail/:seq', element: <BbsDetail /> },
    // { path: '/bbsupdate', element: <BbsUpdate /> },
    // { path: '/bbsanswer/:parentSeq', element: <BbsAnswer /> }




]