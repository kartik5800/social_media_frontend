import React from "react";
import "./Auth.css";
import Logo from "../../img/softlogo.png";
import Login from "../../auth/Login";
import SignUp from "../../auth/SignUp";

const Auth = () => {
  return (
    <div className="Auth">
      <div className="a-left">
        <img src={Logo} alt="" />
        <div className="Webname">
          <h1>Soft-Book</h1>
          <h6>Explore the ideas throughout the world</h6>
        </div>
      </div>

      <Login />
      <SignUp />
    </div>
  );
};

export default Auth;
