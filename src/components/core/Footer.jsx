import React from 'react';
import './Footer.css';
import {
  FaLinkedinIn,
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaWhatsapp,
  FaTiktok,
  FaYoutube,
} from 'react-icons/fa';

function Footer() {
  return (
    <footer className="Footer">
      <div className="w-[100vw] xl:w-[1200px]  mx-auto flex flex-col md:flex-row gap-[40px] md:gap-0 justify-between px-[15px] py-[40px] md:px-[80px] md:py-[60px]">
        <div className="socials flex flex-col gap-[10px]">
          <span className="socials-title">Follow us</span>
          <ul className="social-links">
            <li>
              <FaLinkedinIn />
            </li>
            <li>
              <FaInstagram />
            </li>
            <li>
              <FaFacebookF />
            </li>
            <li>
              <FaTwitter />
            </li>
            <li>
              <FaWhatsapp />
            </li>
            <li>
              <FaTiktok />
            </li>
            <li>
              <FaYoutube />
            </li>
          </ul>
        </div>
        <div className="legalities">Privacy Policy . Terms of Use</div>
      </div>
    </footer>
  );
}

export default Footer;
