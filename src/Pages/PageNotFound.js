import React from "react";
import "./PageNotFound.css";
import { useNavigate } from "react-router-dom";
import { BsArrowLeft } from "react-icons/bs";

const PageNotFound = () => {
  const navigate = useNavigate();
  return (
    <div className="page-not-found">
      <div>
        <h1>404 </h1>
        <h2>Page not found</h2>
        <p>Sorry we couldn't find the page you are looking for</p>
        <div className="back-btn" onClick={() => navigate("/")}>
          <BsArrowLeft size={18} /> Portfolio
        </div>
      </div>
    </div>
  );
};

export default PageNotFound;
