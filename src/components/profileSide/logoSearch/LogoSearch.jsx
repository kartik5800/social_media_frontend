import React from "react";
import logo from "../../../img/softlogo.png";
import { AiOutlineSearch } from "react-icons/ai";
import "./LogoSearch.css";

const LogoSearch = () => {
  return (
    <div className="LogoSearch">
      <img src={logo} alt="" height="20px" />
      <div className="Search">
        <input type="text" placeholder="#Explore" />
        <div className="s-icon">
          <AiOutlineSearch />
        </div>
      </div>
    </div>
  );
};

export default LogoSearch;
