import React, { useState } from 'react';
import Imgcreated from './Imgcreated';

const ImgApp = () => {

        const [showImgcreated , setShowImgcreated] = useState(false)

        const click1 =()=>{
            setShowImgcreated(true)
        }
 
  

    return (
        <div>
   
        
          {  showImgcreated ? <Imgcreated/>
            :     
            <>
                <button onClick={click1}>ImgApp.js</button>
            </>
            }







            

        </div>
    );
};

export default ImgApp;