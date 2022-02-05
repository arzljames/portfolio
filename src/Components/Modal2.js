import React from "react";
import "./Modals.css";
import { motion } from "framer-motion";
import { HiExternalLink, HiOutlineLink, HiDownload } from "react-icons/hi";
import { FaTimes } from "react-icons/fa";
import Project1 from "../Assets/yakapp/ProjectB1.png";
import Project2 from "../Assets/yakapp/ProjectB2.jpg";
import Project3 from "../Assets/yakapp/ProjectB3.jpg";
import Project4 from "../Assets/yakapp/ProjectB4.jpg";
import Project5 from "../Assets/yakapp/ProjectB5.jpg";
import Project6 from "../Assets/yakapp/ProjectB6.jpg";
import Project7 from "../Assets/yakapp/ProjectB7.jpg";
import Project8 from "../Assets/yakapp/ProjectB8.jpg";
import Project9 from "../Assets/yakapp/ProjectB9.jpg";
import Carousel from "react-elastic-carousel";

const Modal2 = ({ modal2, setModal2 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: "-100%" }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      onClick={() => {
        setModal2(!modal2);
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
        <div onClick={() => setModal2(!modal2)} className="exit-icon">
          <FaTimes />
        </div>
        <div className="modal-carousel">
          <Carousel itemsToShow={1}>
            <div className="carousel-item">
              <img src={Project1} alt="Project" />
            </div>

            <div className="carousel-item-yakapp">
              <img src={Project2} alt="Project" />
            </div>

            <div className="carousel-item-yakapp">
              <img src={Project3} alt="Project" />
            </div>

            <div className="carousel-item-yakapp">
              <img src={Project4} alt="Project" />
            </div>

            <div className="carousel-item-yakapp">
              <img src={Project5} alt="Project" />
            </div>

            <div className="carousel-item-yakapp">
              <img src={Project6} alt="Project" />
            </div>

            <div className="carousel-item-yakapp">
              <img src={Project7} alt="Project" />
            </div>

            <div className="carousel-item-yakapp">
              <img src={Project8} alt="Project" />
            </div>

            <div className="carousel-item-yakapp">
              <img src={Project9} alt="Project" />
            </div>
          </Carousel>
        </div>
        <div className="modal-text">
          <h1>YakApp</h1>
          <h2>Yakan Language Learning Application</h2>

          <p>
            Designed and developed an open-source mobile application for the
            people who wants to learn the Yakan Language. It has an advance
            feautures like OCR - Text Detection, English to Yakan translation
            (vice versa), and etc.
          </p>

          <div className="modal-visit-container">
            <a
              href="https://drive.google.com/file/d/157TqJjQO14AD-IgZjjPWM3Rq_ZMNb5zr/view?usp=sharing"
              target="_blank"
              className="modal-visit"
            >
              <span>Download App</span>
              <HiDownload size={20} />
            </a>

            <a
              href="https://github.com/LaoArzl/Yakapp-main"
              target="_blank"
              className="modal-github"
            >
              <span>Github Source Code</span>
              <HiOutlineLink size={20} />
            </a>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Modal2;
