import 'bootstrap/dist/css/bootstrap.min.css';
import MainPageApp from './components/mainPage/MainPageApp';
import { BrowserRouter } from 'react-router-dom';
import Header from './components/mainPage/Header';
import Footer from './components/mainPage/Footer';
import NewsList from './components/naverapi/NewsList';

function App() {
  return (
    <BrowserRouter>

      {/* <MainPageApp/> */}
      {/* <LoginApp/> */}
      <NewsList/>

    </BrowserRouter>
  );
}

export default App;
