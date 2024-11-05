import { BrowserRouter as Router, Routes, Route, BrowserRouter, useLocation } from "react-router-dom";
import HomePage from "../login/HomePage";
import React from "react";
import MainPageNews from "./MainPageNews";
import "./MainPage.css"
import BannerSlider from "./BannerSlider";


function MainPageApp() {

    //const location = useLocation();

    const images = [

      '/images/banner.jpeg',
      '/images/banner.jpeg'

    ];

    return (
      <div>
        <BannerSlider images={images} interval={4000} />
        <div className="main_content_02">
          <MainPageNews/>

          <HomePage/>
        </div>
      </div>
    );
}



export default MainPageApp;
