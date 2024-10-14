import 'bootstrap/dist/css/bootstrap.min.css';
import MainPageApp from './components/mainPage/MainPageApp';
import { BrowserRouter } from 'react-router-dom';
import Header from './components/mainPage/Header';
import Footer from './components/mainPage/Footer';
import ImgApp from './components/imgboard/ImgApp';
import LoginApp from './components/login/LoginApp';
import NewsList from './components/naverapi/NewsList';

function App() {
  return (
    <BrowserRouter>
    <div>
  
       {/* <MainPageApp/>
     <LoginApp/> */}
    <ImgApp/>  

    
    </div>
      {/* <MainPageApp/> */}
      {/* <LoginApp/> */}
      <NewsList/>

    </BrowserRouter>
  );
}

export default App;
