import { BrowserRouter as Router, Routes, Route, BrowserRouter } from "react-router-dom";
import Body from "./Body";
import Header from "./Header";
import HomePage from "../login/HomePage";
import React from "react";
import Footer from "./Footer";


function MainPageApp() {
    return (
      <div>
        <Header/>
          <Routes>
            <Route path="/" element={<Body/>}/>
            <Route path="/loginMain" element={<HomePage/>}/>
          </Routes>

        <Footer/>


      </div>
    );
}
  
export default MainPageApp;