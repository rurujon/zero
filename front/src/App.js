import 'bootstrap/dist/css/bootstrap.min.css';

import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/headfootside/Header';
import Footer from './components/headfootside/Footer';
import SideBar from './components/headfootside/SideBar';
import { AuthProvider } from './components/login/context/AuthContext';
import AxiosInterceptor from './components/login/utils/AxiosInterceptor';
import HttpHeadersProvider from './components/context/HttpHeadersProvider';
import routes from './routes';

function AppContent() {

  //React Router에서 경로를 가져오는 훅. 단, 이걸 사용하기 위해서는 정의되는 함수가 <BrowserRouter> 안에 있어야 한다고 합니다.
  //그래서 아래처럼 App()에서 <BrowserRouter></BrowserRouter>로 감싼 AppContent를 불러오도록 구조를 변경해야 합니다.
  const location = useLocation();
  const isMainPage = location.pathname === '/'; // 메인 페이지인지 확인

  return (
    
    <div className='container'>
      {/* 헤더는 모든 페이지에서 공통적으로 사용 */}
      <Header className='header'/>        

        {/* 사이드바가 나오는 페이지는 flex 레이아웃을 적용 */}
        <div className={isMainPage ? 'main-content' : 'main-layout'}>
          
          {/* 메인페이지가 아닌 경우에만 사이드바 렌더링 */}
          {!isMainPage && <SideBar className='sidebar'/>}
          
          <div className={isMainPage ? 'main-content' : 'content'}>
            <Routes>
              {routes.map((route) => (
                <Route key={route.path} path={route.path} element={route.element} />
              ))}
            </Routes>
          </div>
        </div>


        {/* 풋터는 모든 페이지에서 공통적으로 사용 */}
        <Footer className='footer'/>

    </div>
  );
}

//메인페이지에선 사이드바가 나오지 않고, 그 외의 페이지에서만 사이드바가 나오도록 구현하기 위해 상위App이 필요해져
//App.js의 구조를 살짝 변경했습니다. 프론트 확인은 하던대로 위쪽에서 진행하시면 됩니다.
function App() {
  return (
    <AuthProvider>
      <HttpHeadersProvider>
        <AxiosInterceptor>
          <BrowserRouter>
            <AppContent />
          </BrowserRouter>
        </AxiosInterceptor>
      </HttpHeadersProvider>
    </AuthProvider>
  );
}

export default App;
