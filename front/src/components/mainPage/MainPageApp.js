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
              대충 배너 이미지
            </div>
            <div className="main-right-banner2">
              대충 배너 이미지
            </div>
            <div className="main-right-banner3">
              대충 배너 이미지
            </div>
          </div>
        </div>
      </div>
    );
}



export default MainPageApp;
