import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./Loader.css";

const Loader = () => {
  return (
    <motion.div
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="loader"
    >
      <motion.svg
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        width="100"
        height="100"
        viewBox="0 0 500 500"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="svg"
      >
        <motion.rect
          initial={{ opacity: 0, pathLength: 0 }}
          animate={{ opacity: 1, pathLength: 1 }}
          transition={{ duration: 1.25, ease: "easeInOut" }}
          x="10"
          y="10"
          width="480"
          height="480"
          stroke="#3AB2CC"
          stroke-width="30"
        />
      </motion.svg>

      <motion.h1
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.25, duration: 1, ease: "easeInOut" }}
      >
        AJ
      </motion.h1>
    </motion.div>
  );
};

export default Loader;
