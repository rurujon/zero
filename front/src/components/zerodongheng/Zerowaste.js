import React from 'react';
import './Maincss.css';
import './Sub1.css';
import YouTube,{YouTubeProps} from 'react-youtube'
import Sub1 from './Sub1';

const Zerowaste = () => {


    return (
        <div className="zero-waste-intro" >
          <h2>제로 웨이스트란?</h2>

            <div>
              <p>
                    제로 웨이스트는 가능한 한 쓰레기를 줄이고, 모든 자원을 재활용하거나 재사용하여 환경을 보호하는 운동입니다. 
                    우리의 소비 방식과 생활 습관을 개선함으로써 지속 가능한 미래를 추구합니다.
              </p>
            </div>

          <div>
          </div>
          

        <YouTube
  videoId={'ir_0L0hbdRw'}
  opts={{
    width:"560",
    height:"315",
    playerVars:{
      autoplay:0, //자동재생 1:재생, 0:비활성화
      rel: 0, //관련동영상 미표시
      modestbranding: 1, //youtube로고 미표시
    }
  }}
  //이벤트 리스너
  onEnd={(e)=> e.target.stopVideo(0)}/>  
  <br/><br/><br/>
        <h2>제로 웨이스트의 원칙</h2>
        
        <Sub1/>
                    
        <br/><br/><br/>
        <h2>제로 웨이스트 실천 방법</h2>
        <p>
          제로 웨이스트를 실천하는 것은 작은 습관에서 시작할 수 있습니다. 
          장바구니 사용하기, 일회용 플라스틱 줄이기, 중고품 구매하기 등 일상에서 실천할 수 있는 방법들이 많습니다.
        </p>
      </div>
    );
};

export default Zerowaste;