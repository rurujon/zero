import React from 'react';
import './Main.css'
import './Footer.css'; // 스타일을 위한 CSS 파일 (필요에 따라 파일명 변경)
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="footer-distributed">
      <div className="footer-left">
      <Link to="/mainpage"><img src='/images/login/elogo.png' style={{width: '250px', cursor: 'pointer'}} alt="홈" /></Link>
        <p className="footer-links">
          <a href="#" className="link-1">Home</a>
          <a href="#">Blog</a>
          <a href="#">Pricing</a>
          <a href="#">About</a>
          <a href="#">Faq</a>
          <a href="#">Contact</a>
        </p>
        <p className="footer-company-name">ZERO DONGHAENG © 2024</p>
      </div>

      <div className="footer-center">
        <div>
          <i className="fa fa-map-marker"></i>
          <p><span>444 S. Cedros Ave</span> Yeoksam-dong Samwon Tower, Seoul</p>
        </div>
        <div>
          <i className="fa fa-phone"></i>
          <p>+82.02.406.0000</p>
        </div>
        <div>
          <i className="fa fa-envelope"></i>
          <p><a href="mailto:support@company.com">zerotogether@itwill.com</a></p>
        </div>
      </div>

      <div className="footer-right">
        <p className="footer-company-about">
          <span>About the company</span>
          Lorem ipsum dolor sit amet, consectateur adispicing elit. Fusce euismod convallis velit, eu auctor lacus vehicula sit amet.
        </p>
        <div className="footer-icons">
          <a href="#"><i className="fa fa-facebook"></i></a>
          <a href="#"><i className="fa fa-twitter"></i></a>
          <a href="#"><i className="fa fa-linkedin"></i></a>
          <a href="#"><i className="fa fa-github"></i></a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
