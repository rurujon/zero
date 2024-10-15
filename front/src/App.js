import 'bootstrap/dist/css/bootstrap.min.css';
import MainPageApp from './components/mainPage/MainPageApp';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/headfootside/Header';
import Footer from './components/headfootside/Footer';
import SideBar from './components/headfootside/SideBar';
import LoginApp from './components/login/LoginApp';
import NewsList from './components/naverapi/NewsList';
import SmartMapApp from './components/smartmap/SmartMapApp';



function AppContent() {

  //React Router에서 경로를 가져오는 훅. 단, 이걸 사용하기 위해서는 정의되는 함수가 <BrowserRouter> 안에 있어야 한다고 합니다.
  //그래서 아래처럼 App()에서 <BrowserRouter></BrowserRouter>로 감싼 AppContent를 불러오도록 구조를 변경해야 합니다.
  const location = useLocation();

  return (
    <div>
      {/* 헤더는 모든 페이지에서 공통적으로 사용 */}
      <Header />

      {location.pathname !== '/' && <SideBar/>} {/* 사이드바 조건부 렌더링 */}

      {/* <MainPageApp/> */}
      <LoginApp/>
      {/* <NewsList/> */}
      {/* <SmartMapApp/> */}
      <ImgApp/>


      {/* 풋터는 모든 페이지에서 공통적으로 사용 */}
      <Footer />


    </div>
  );
}

//메인페이지에선 사이드바가 나오지 않고, 그 외의 페이지에서만 사이드바가 나오도록 구현하기 위해 상위App이 필요해져
//App.js의 구조를 살짝 변경했습니다. 프론트 확인은 하던대로 위쪽에서 진행하시면 됩니다.
function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>

  );
}

export default App;
