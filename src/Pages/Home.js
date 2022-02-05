import React, { useEffect, useState } from "react";
import Navabar from "../Components/Navabar";
import "./Home.css";
import { HiOutlineArrowNarrowRight } from "react-icons/hi";
import Email from "../Components/Email";
import Social from "../Components/Social";
import Vector1 from "../vector1.png";
import Vector2 from "../vector2.png";
import Vector3 from "../vector3.png";
import Vector4 from "../vector4.png";
import Me from "../me.jpg";
import Drawer from "../Components/Drawer";
import { IoCaretForward } from "react-icons/io5";
import { motion, useAnimation, AnimatePresence } from "framer-motion";
import Modal1 from "../Components/Modal1";
import Modal2 from "../Components/Modal2";
import Loader from "../Components/Loader";
import Footer from "../Components/Footer";

const variants = {
  hover: {
    y: 0,
    opacity: 1,
  },
  initial: {
    y: -40,
    opacity: 0,
  },
};

const variants2 = {
  hover: {
    y: 0,
    opacity: 1,
  },
  initial: {
    y: 40,
    opacity: 0,
  },
};

const variants3 = {
  hover2: {
    y: 0,
    opacity: 1,
  },
  initial2: {
    y: -40,
    opacity: 0,
  },
};

const variants4 = {
  hover2: {
    y: 0,
    opacity: 1,
  },
  initial2: {
    y: 40,
    opacity: 0,
  },
};

const Home = () => {
  const [drawer, setDrawer] = useState(false);
  const controls = useAnimation();
  function handleMouseEnterControls() {
    controls.start("hover");
  }

  function handleMouseLeaveControls() {
    controls.start("initial");
  }

  function handleMouseEnterControls2() {
    controls.start("hover2");
  }

  function handleMouseLeaveControls2() {
    controls.start("initial2");
  }

  const [modal1, setModal1] = useState(false);
  const [modal2, setModal2] = useState(false);
  const [loader, setLoader] = useState(true);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    setTimeout(() => setLoader(false), 3000);
  }, []);
  return (
    <>
      <AnimatePresence>{loader ? <Loader /> : null}</AnimatePresence>
      <AnimatePresence>
        {modal1 ? <Modal1 modal1={modal1} setModal1={setModal1} /> : null}
      </AnimatePresence>

      <AnimatePresence>
        {modal2 ? <Modal2 modal2={modal2} setModal2={setModal2} /> : null}
      </AnimatePresence>
      <AnimatePresence>
        {drawer ? <Drawer drawer={drawer} setDrawer={setDrawer} /> : null}
      </AnimatePresence>
      <motion.div
        initial={{ y: 0 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className={
          drawer || modal1 || modal2
            ? "home-container-active"
            : "home-container"
        }
      >
        <Email />
        <Navabar drawer={drawer} setDrawer={setDrawer} />
        <Social />
        <div className="circle-bubble">
          <div className="circle-bubble-2"></div>
        </div>

        <div id="home" className="home">
          <img className="vector-1" src={Vector1} alt="Bubbles" />
          <img className="vector-2" src={Vector2} alt="Bubbles" />
          <img className="vector-3" src={Vector3} alt="Bubbles" />
          <img className="vector-4" src={Vector4} alt="Bubbles" />
          <div className="landing-text">
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 3 }}
              className="hi-my-name"
            >
              Hi, My name is
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 3.5 }}
            >
              Arzl James Lao
            </motion.h1>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 4 }}
            >
              Front-End Developer & UI/UX Designer
            </motion.h2>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 4.5 }}
            >
              <p className="code-tag">
                <i>&lt;body&gt;</i>
              </p>
              <p className="landing-text-desc">
                I’m a Front-End Web Developer and UI/UX Designer who loves{" "}
                <br className="break-line" /> to develop aesthetic websites and
                web applications.
              </p>
              <p className="code-tag">
                <i>&lt;/body&gt;</i>
              </p>
            </motion.div>

            <motion.a
              href="https://drive.google.com/file/d/19nOOYMZi7jxER37i_HPpLGe3rSWND205/view?usp=sharing"
              target="_blank"
              onClick={() => setDrawer(false)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 4.5 }}
              className="hire-me"
            >
              <p>HIRE ME</p>

              <HiOutlineArrowNarrowRight size={20} />
            </motion.a>
          </div>
        </div>

        <div id="about" className="about">
          <motion.h1
            initial={{ x: -1000, opacity: 0 }}
            whileInView={{ x: 10, opacity: 0.025 }}
            viewport={{ once: true }}
            transition={{ duration: 1.5 }}
          >
            About Me
          </motion.h1>
          <motion.div className="about-me-text">
            <motion.h2
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.5 }}
            >
              About Me
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              I’m <b>Arzl James Lao</b>, an enthusiast Web Developer
              specialiazing in Front-End and UI/UX design projects. I’m very
              passionate in working with UI designs, animations, provides
              intuitive and dynamic user experience. <br />
              <br />
              Here’s some technologies that I’ve been using:
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="tech-stacks"
            >
              <div className="tech-stacks-left">
                <p>
                  <IoCaretForward /> <span>HTML/CSS</span>
                </p>

                <p>
                  <IoCaretForward /> <span>JavaScript ES6+</span>
                </p>

                <p>
                  <IoCaretForward /> <span>ReactJS</span>
                </p>

                <p>
                  <IoCaretForward /> <span>NodeJS</span>
                </p>
              </div>
              <div className="tech-stacks-right">
                <p>
                  <IoCaretForward /> <span>ExpressJS</span>
                </p>

                <p>
                  <IoCaretForward /> <span>React Native</span>
                </p>

                <p>
                  <IoCaretForward /> <span>Figma</span>
                </p>

                <p>
                  <IoCaretForward /> <span>Adobe Illustrator</span>
                </p>
              </div>
            </motion.div>
          </motion.div>
          <div className="about-me-picture">
            <div className="profile-picture-container">
              <img className="profile-picture" src={Me} alt="Arzl James" />
              <p id="hi">Hi, I'm Arzl!</p>
            </div>
          </div>
        </div>

        <div id="projects" className="projects">
          <motion.h1
            initial={{ x: -1000, opacity: 0 }}
            whileInView={{ x: 10, opacity: 0.025 }}
            viewport={{ once: true }}
            transition={{ duration: 1.5 }}
          >
            Projects
          </motion.h1>
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.5 }}
          >
            Projects
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="projects-container"
          >
            <div
              onMouseEnter={handleMouseEnterControls}
              onMouseLeave={handleMouseLeaveControls}
              className="project-1"
            >
              <motion.div
                initial={{ opacity: 0, y: -40 }}
                variants={variants}
                animate={controls}
                transition={{ duration: 0.5 }}
                id="project-name"
              >
                <p className="project-1-title">ECPLC LMS</p>
                <p className="project-1-tech">
                  ReactJs • ExpressJS • MongoDB • NodeJS
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 40 }}
                variants={variants2}
                animate={controls}
                transition={{ duration: 0.5 }}
                id="project-btn"
              >
                <div onClick={() => setModal1(true)} className="learn-btn">
                  View Project
                </div>
              </motion.div>
            </div>
            <div
              onMouseEnter={handleMouseEnterControls2}
              onMouseLeave={handleMouseLeaveControls2}
              className="project-2"
            >
              <motion.div
                initial={{ opacity: 0, y: -40 }}
                variants={variants3}
                animate={controls}
                transition={{ duration: 0.5 }}
                id="project-name"
              >
                <p className="project-1-title">YakApp</p>
                <p className="project-1-tech">React Native • MongoDB</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 40 }}
                variants={variants4}
                animate={controls}
                transition={{ duration: 0.5 }}
                id="project-btn"
              >
                <div onClick={() => setModal2(true)} className="learn-btn">
                  View Project
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>

        <div id="contact" className="contact">
          <motion.h1
            initial={{ x: -1000, opacity: 0 }}
            whileInView={{ x: 10, opacity: 0.025 }}
            viewport={{ once: true }}
            transition={{ duration: 1.5 }}
          >
            Contact
          </motion.h1>
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.5 }}
          >
            Contact
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Have a question or do you want to collaborate with me? <br /> That's
            awesome! Feel free to leave a message.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <form className="message-form">
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Name"
                type="text"
                className="name-input"
              />
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                type="email"
                className="email-input"
              />
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Your Message"
              ></textarea>
              <div
                onClick={() => {
                  setName("");
                  setEmail("");
                  setMessage("");
                  alert(
                    "Server is currently being fix right now and your message cannot be send at the moment. Please try again later. Thank you!"
                  );
                }}
                className={
                  !name || !email || !message
                    ? "submit-btn-disable"
                    : "submit-btn"
                }
              >
                Submit
              </div>
            </form>
          </motion.div>
        </div>
        <Footer />
      </motion.div>
    </>
  );
};

export default Home;
