import Header from './components/Header';
import 'bootstrap/dist/css/bootstrap.min.css';
import Square from './components/Square';
import Body from './components/Body';

function App() {
  return (
    <div>
      <Header/>
      <Body/>
      {/* <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
        <Square width="60%" height="100px" color="red" />
        <Square width="30%" height="150px" color="blue" />
        <Square width="60%" height="30px" color="green" />
        <Square width="60%" height="120px" color="orange" />
        <Square width="30%" height="180px" color="purple" />
      </div> */}
    </div>
  );
}

export default App;
