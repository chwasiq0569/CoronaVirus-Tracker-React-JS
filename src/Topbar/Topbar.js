import React from "react";
import "./topbar.scss";
import CovidImg from "../assets/images/icons8-coronavirus-100.png";
import { Link } from "react-router-dom";

const Topbar = () => {
  return (
    <div className="topBar__Wrapper">
      <div className="inner__Wrapper">
        <Link to="/" style={{ textDecoration: "none" }}>
          <div className="logoContainer">
            <img src={CovidImg} alt="CovidImg Logo" />
          </div>
        </Link>
        <h1>COVID-19 Coronavirus Tracker</h1>
        <p></p>
      </div>
    </div>
  );
};

export default Topbar;
