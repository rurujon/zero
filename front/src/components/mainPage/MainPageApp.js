import { BrowserRouter as Router, Routes, Route, BrowserRouter, useLocation } from "react-router-dom";
import HomePage from "../login/HomePage";
import React from "react";
import MainPageNews from "./MainPageNews";
import "./MainPage.css"


function MainPageApp() {

  //const location = useLocation();

    return (
      <div className="main_content_02">
        <MainPageNews/>

        <HomePage/>
      </div>
    );
}



export default MainPageApp;
