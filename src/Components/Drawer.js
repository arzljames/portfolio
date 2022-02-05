import React from "react";
import "./Drawer.css";
import { motion, AnimatePresence } from "framer-motion";
import { FaTimes } from "react-icons/fa";

const Drawer = ({ drawer, setDrawer }) => {
  return (
    <motion.div onClick={() => setDrawer(false)} className="drawer-container">
      <motion.div
        onClick={(e) => e.stopPropagation()}
        initial={{ opacity: 0, x: "100vw" }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: "100vw" }}
        transition={{ duration: 0.5 }}
        className="drawer"
      >
        <div className="drawer-header">
          <motion.p
            initial={{ opacity: 0, rotate: "180deg" }}
            animate={{ opacity: 1, rotate: 0 }}
            transition={{ duration: 1 }}
            onClick={() => setDrawer(!drawer)}
          >
            <FaTimes />
          </motion.p>
        </div>

        <div className="drawer-body">
          <ul className="navlinks">
            <motion.li
              onClick={() => setDrawer(!drawer)}
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.25, duration: 0.5 }}
            >
              <a href="#home">HOME</a>
            </motion.li>
            <motion.li
              onClick={() => setDrawer(!drawer)}
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5, duration: 0.5 }}
            >
              <a href="#about">ABOUT</a>
            </motion.li>
            <motion.li
              onClick={() => setDrawer(!drawer)}
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.75, duration: 0.5 }}
            >
              <a href="#projects">PROJECTS</a>
            </motion.li>
            <motion.li
              onClick={() => setDrawer(!drawer)}
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1, duration: 0.5 }}
            >
              <a href="#contact">CONTACT ME</a>
            </motion.li>
          </ul>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Drawer;
