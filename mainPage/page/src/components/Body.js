import React from 'react';
import './Body.css'; // 스타일 파일
import ProgressBar from 'react-bootstrap/esm/ProgressBar';
import Login from './Login';
import MainPageNews from './MainPageNews';

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
      <div style={styles.container}>
        {/* 첫 번째 층 */}
        <div style={styles.row} paddingTop="100px">
          <div style={{ ...styles.box, ...styles.alignTop, flexGrow: 3 }}><MainPageNews/></div>
          <div style={{ ...styles.box, flexGrow: 1 }}><Login/></div>
        </div>
        {/* 두 번째 층 */}
        <div style={styles.row}>
          <div style={{ ...styles.box, flexGrow: 1 }}><BasicExample/></div>
          <div style={{ ...styles.box, flexGrow: 1.5 }}>Box 4</div>
          <div style={{ ...styles.box, flexGrow: 1 }}>Box 5</div>
        </div>
        {/* 세 번째 층 */}
        <div style={styles.row}>
          <div style={{ ...styles.box, flexGrow: 2 }}>Box 6</div>
          <div style={{ ...styles.box, flexGrow: 1 }}>Box 7</div>
        </div>
      </div>
    );
};

const styles = {
  container: {
    marginTop:'100px',
    display: 'flex',
    flexDirection: 'column',
    gap: '20px', // 층 간 간격
    padding: '0 15%', // 좌우 15% 여백
    paddingTop: '20px',
  },
  row: {
    marginTop:'50px',
    marginBottom:'50px',
    display: 'flex',
    justifyContent: 'space-between', // div 간 간격을 자동으로 조절
    gap: '10px',
    height: '500px', // 각 층의 고정된 세로 길이
  },
  box: {
    flex: '1', // div 크기를 균등하게 맞춤
    padding: '10px',
    backgroundColor: '#d3d3d3',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    margin:'20px'
  },
  alignTop: {
    alignItems: 'flex-start', // 박스 안에서 위쪽으로 정렬
    justifyContent: 'flex-start',
  },
};

export default Body;