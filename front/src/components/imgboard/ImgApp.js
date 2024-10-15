import React, { useEffect, useState } from 'react';
import Imgcreated from './Imgcreated';
import ImgList from './ImgList';

const ImgApp = () => {

        
        const [showImgcreated , setShowImgcreated] = useState(false)
        const [showImgList , setShowImgList] = useState(false)


        const click1 =()=>{
            setShowImgcreated(true)
        }

        const click2 =()=>{
            setShowImgList(true)
        }
 
  

    return (
        <div>

          {  showImgcreated ? <Imgcreated/>
            :     
            <>
                <button onClick={click1}>ImgCreated.js</button>
            </>
            }<br/>
          {  showImgList ? <ImgList/>
            :     
            <>
                <button onClick={click2}>ImgList.js</button>
            </>
            }<br/>




        </div>
    );
};

export default ImgApp;