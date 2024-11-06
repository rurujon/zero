import { BrowserRouter as Router, Routes, Route, BrowserRouter, useLocation } from "react-router-dom";
import HomePage from "../login/HomePage";
import React from "react";
import MainPageNews from "./MainPageNews";
import "./MainPage.css"
import BannerSlider from "./BannerSlider";


function MainPageApp() {

    //const location = useLocation();

    

    return (
      <div>
        <BannerSlider/>
        <div className="main_content_02">
          <MainPageNews/>

          <div className="main-right-wrap">
            <HomePage/>
            <div className="main-right-banner1">
              <img src="images/bannerImage1.jpg"></img>
            </div>
            <div className="main-right-banner2">
              <img src="images/bannerImage1.jpg"></img>
            </div>
            <div className="main-right-banner3">
              <img src="images/bannerImage1.jpg"></img>
            </div>
          </div>
        </div>
      </div>
    );
}



export default MainPageApp;
