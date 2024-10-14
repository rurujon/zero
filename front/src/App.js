import 'bootstrap/dist/css/bootstrap.min.css';
import ImgApp from './components/imgboard/ImgApp';
import { BrowserRouter } from 'react-router-dom';
/* import MainPageApp from './components/mainPage/MainPageApp';
import Header from './components/mainPage/Header';
import Footer from './components/mainPage/Footer';
import LoginApp from './components/login/LoginApp';
import NewsList from './components/naverapi/NewsList';
 */
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
    {/*   <NewsList/> */}
    </BrowserRouter>

  );
}

export default App;
