import React from "react";
import "./Modals.css";
import { motion } from "framer-motion";
import { HiExternalLink, HiOutlineLink } from "react-icons/hi";
import { FaTimes } from "react-icons/fa";
import Project1 from "../Assets/ecplclms/projectA1.png";
import Project2 from "../Assets/ecplclms/ProjectA2.png";
import Project3 from "../Assets/ecplclms/ProjectA3.png";
import Project4 from "../Assets/ecplclms/ProjectA4.png";
import Project5 from "../Assets/ecplclms/ProjectA5.png";
import Project6 from "../Assets/ecplclms/ProjectA6.png";
import Project7 from "../Assets/ecplclms/ProjectA7.png";
import Carousel from "react-elastic-carousel";
import Item from "react-elastic-carousel";

const Modal1 = ({ modal1, setModal1 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: "-100%" }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      onClick={() => {
        setModal1(!modal1);
      }}
      className="modal-container"
    >
      <motion.div
        onClick={(e) => {
          e.stopPropagation();
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        className="modal"
      >
        <div onClick={() => setModal1(false)} className="exit-icon">
          <FaTimes />
        </div>
        <div className="modal-carousel">
          <Carousel itemsToShow={1}>
            <div className="carousel-item">
              <img src={Project1} alt="Project" />
            </div>

            <div className="carousel-item">
              <img src={Project2} alt="Project" />
            </div>

            <div className="carousel-item">
              <img src={Project3} alt="Project" />
            </div>

            <div className="carousel-item">
              <img src={Project4} alt="Project" />
            </div>

            <div className="carousel-item">
              <img src={Project5} alt="Project" />
            </div>

            <div className="carousel-item">
              <img src={Project6} alt="Project" />
            </div>

            <div className="carousel-item">
              <img src={Project7} alt="Project" />
            </div>
          </Carousel>
        </div>
        <div className="modal-text">
          <h1>ECPLC LMS</h1>
          <h2>Learning Management System</h2>

          <p>
            Designed and developed a fullstack web application for ECPLC, a
            private school located in Zamboanga City. ECPLC LMS is a learning
            management sytem that cater the needs of the school.
          </p>

          <div className="modal-visit-container">
            <a href="http://ecplc.site" target="_blank" className="modal-visit">
              <span>Visit Site</span>
              <HiExternalLink size={20} />
            </a>

            {/* <a
              href="https://github.com/LaoArzl/Yakapp-main"
              target="_blank"
              className="modal-github"
            >
              <span>Github Source Code</span>
              <HiOutlineLink size={20} />
            </a> */}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Modal1;
