import { BrowserRouter as Router, Routes, Route, BrowserRouter, useLocation } from "react-router-dom";
import HomePage from "../login/HomePage";
import React from "react";
import MainPageNewsCopy from "./MainPageNewsCopy";
import "./MainPage.css"


function MainPageApp() {

  //const location = useLocation();

    return (
      <div className="main_content_02">
        <MainPageNewsCopy/>
        
        <HomePage/>
      </div>
    );
}



export default MainPageApp;
