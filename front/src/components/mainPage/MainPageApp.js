import { BrowserRouter as Router, Routes, Route, BrowserRouter, useLocation } from "react-router-dom";
import HomePage from "../login/HomePage";
import React from "react";
import MainPageNews from "./MainPageNews";
import "./MainPage.css"
import BannerSlider from "./BannerSlider";


function MainPageApp() {

    return (
      <div>
        <BannerSlider/>
        <div className="main_content_02">
          <MainPageNews/>

          <div className="main-right-wrap">
            <HomePage/>
            <div className="main-right-banner1">
              <a href="https://www.kcen.kr/USR_main2016.jsp??=MAIN/index" target="_blank">
              <img src="images/airEnv.gif"></img></a>
            </div>
            <div className="main-right-banner2">
              <a href="https://ecolife.me.go.kr/ecolife/" target="_blank">
              <img src="images/greenNuri.png"></img></a>
            </div>
            <div className="main-right-banner3">
              <a href="https://cpoint.or.kr/" target="_blank">
              <img src="images/point.gif"></img></a>
            </div>
          </div>
        </div>
      </div>
    );
}



export default MainPageApp;
