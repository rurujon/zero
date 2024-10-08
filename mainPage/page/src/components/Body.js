import React from 'react';
import './Body.css'; // 스타일 파일
import ProgressBar from 'react-bootstrap/esm/ProgressBar';
import Login from './Login';

const Body = () => {

    function BasicExample() {
        return (
            <ProgressBar>
              <ProgressBar variant="success" now={35} key={1} />
              <ProgressBar variant="warning" now={20} key={2} />
              <ProgressBar variant="info" now={45} key={3} />
            </ProgressBar>
        );
    }

  return (
    <div className="main-container">
      <div className="left-section">
        {/* 50% 크기의 좌측 세로열 게시판들 */}
        <div className="board" style={{ height: '200px', marginBottom: '20px' }}>Board 1</div>
        <div className="board" style={{ height: '300px', marginBottom: '20px' }}>Board 2</div>
        <div className="board" style={{ height: '250px' }}>Board 3</div>
      </div>
      <div className="right-section">
        {/* 30% 크기의 우측 세로열 게시판들 */}
        <div className="board" style={{ height: '150px', marginBottom: '20px' }}>Board A</div>
        <div className="board" style={{ marginBottom: '20px' }}>
            <Login/>
            <br/>
            <BasicExample/>
        </div>
      </div>
    </div>
  );
};

export default Body;