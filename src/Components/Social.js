import React from "react";
import "./Social.css";
import {
  IoLogoFacebook,
  IoLogoGithub,
  IoLogoInstagram,
  IoLogoLinkedin,
} from "react-icons/io5";

const Social = () => {
  return (
    <div className="social-container">
      <div className="social-wrapper">
        <div className="social-icons">
          <p className="fb-icon">
            <IoLogoFacebook />
            <a
              href="https://facebook.com/arzl.james"
              target="_blank"
              className="social-fb"
            >
              arzl.james
            </a>
          </p>
          <p className="github-icon">
            <IoLogoGithub />
            <a
              href="https://github.com/LaoArzl/"
              target="_blank"
              className="social-github"
            >
              LaoArzl
            </a>
          </p>
          <p className="ig-icon">
            <IoLogoInstagram />
            <a
              href="https://www.instagram.com/arzl.james/"
              target="_blank"
              className="social-ig"
            >
              arzl.james
            </a>
          </p>
          <p className="linkedin-icon">
            <IoLogoLinkedin />
            <a
              href="https://www.linkedin.com/in/arzl-james-lao-7b41a81bb/"
              target="_blank"
              className="social-linkedin"
            >
              arzl-james-lao
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Social;
