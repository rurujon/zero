import { BrowserRouter as Router, Routes, Route, BrowserRouter, useLocation } from "react-router-dom";
import Body from "./Body";
import Header from "../headfootside/Header";
import HomePage from "../login/HomePage";
import React from "react";
import Footer from "../headfootside/Footer";
import SideBar from "../headfootside/SideBar";


function MainPageApp() {

  //const location = useLocation();

    return (
      <div>
        
          <Routes>
            <Route path="/" element={<Body/>}/>
          </Routes>

      </div>
    );
}


  
export default MainPageApp;