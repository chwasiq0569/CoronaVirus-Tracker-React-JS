import React, { useState } from "react";
import "./sidebar.scss";
import HomeOutlinedIcon from "@material-ui/icons/HomeOutlined";
import InfoOutlinedIcon from "@material-ui/icons/InfoOutlined";
import ChatOutlinedIcon from "@material-ui/icons/ChatOutlined";
import LanguageIcon from "@material-ui/icons/Language";
import { NavLink, useLocation } from "react-router-dom";
const Sidebar = () => {
  const [activeLink, setActiveLink] = useState("home");
  const { pathname } = useLocation();
  console.log("pathname: ", pathname);
  return (
    <div className="sidebar__Wrapper">
      <div className="inner__Wrapper">
        <div className="iconsContainer">
          <div className="icons">
            <NavLink to="/">
              <HomeOutlinedIcon
                className={
                  pathname === "/" ? "activeIconStyle" : "iconsDefaultStyle"
                }
              />
            </NavLink>
            <NavLink to="/worldwide">
              <LanguageIcon
                className={
                  pathname === "/worldwide"
                    ? "activeIconStyle"
                    : "iconsDefaultStyle"
                }
              />
            </NavLink>
            <NavLink to="/importantinfo">
              <InfoOutlinedIcon
                // onClick={() => setActiveLink("importantinfo")}
                className={
                  pathname === "/importantinfo"
                    ? "activeIconStyle"
                    : "iconsDefaultStyle"
                }
              />
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
