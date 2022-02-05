import React from "react";
import "./Email.css";
import { motion } from "framer-motion";

const Email = () => {
  return (
    <div className="email-line-container">
      <motion.div
        initial={{ y: "-100%" }}
        animate={{ y: 0 }}
        transition={{ duration: 1, delay: 3 }}
        className="email-line"
      ></motion.div>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 4 }}
      >
        arzljames15@gmail.com
      </motion.p>
    </div>
  );
};

export default Email;
