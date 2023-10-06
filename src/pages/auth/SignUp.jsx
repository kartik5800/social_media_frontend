import React, { useState } from "react";
import "./Auth.css";
import useAuth from "../../hooks/useAuth";
import Logo from "../../img/softlogo.png";
import { PATH_LANDING_APP } from "../../routes/path";
import { Link } from "react-router-dom";

const SignUp = () => {
  const { register } = useAuth();

  const [data, setData] = useState({
    firstname: "",
    lastname: "",
    username: "",
    password: "",
    confirmpass: "",
  });

  const [errors, setErrors] = useState({
    firstname: "",
    lastname: "",
    username: "",
    password: "",
    confirmpass: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
    setErrors({ ...errors, [name]: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let formIsValid = true;

    if (!data.firstname) {
      setErrors({ ...errors, firstname: "First name is required." });
      formIsValid = false;
    }

    if (!data.lastname) {
      setErrors({ ...errors, lastname: "Last name is required." });
      formIsValid = false;
    }

    if (!data.username) {
      setErrors({ ...errors, username: "Username is required." });
      formIsValid = false;
    }

    if (!data.password) {
      setErrors({ ...errors, password: "Password is required." });
      formIsValid = false;
    }

    if (data.password !== data.confirmpass) {
      setErrors({ ...errors, confirmpass: "Passwords do not match." });
      formIsValid = false;
    }

    if (formIsValid) {
      const response = await register(data);

      if (response?.status === "Success") {
      } else if (response?.status === "Error") {
      }
    }
  };

  return (
    <div className="Auth">
      <div className="a-left">
        <img src={Logo} alt="" />
        <div className="Webname">
          <h1>Soft-Book</h1>
          <h6>Explore the ideas throughout the world</h6>
        </div>
      </div>

      <div className="a-right">
        <form className="infoForm authForm" onSubmit={handleSubmit}>
          <h3>Sign up</h3>

          <div>
            <input
              type="text"
              placeholder="First Name"
              className="infoInput"
              name="firstname"
              value={data.firstname}
              onChange={handleChange}
            />
            <span className="error">{errors.firstname}</span>
            <input
              type="text"
              placeholder="Last Name"
              className="infoInput"
              name="lastname"
              value={data.lastname}
              onChange={handleChange}
            />
            <span className="error">{errors.lastname}</span>
          </div>

          <div>
            <input
              type="text"
              className="infoInput"
              name="username"
              placeholder="Username"
              value={data.username}
              onChange={handleChange}
            />
            <span className="error">{errors.username}</span>
          </div>

          <div>
            <input
              type="password"
              className="infoInput"
              name="password"
              placeholder="Password"
              value={data.password}
              onChange={handleChange}
            />
            <span className="error">{errors.password}</span>
            <input
              type="password"
              className="infoInput"
              name="confirmpass"
              placeholder="Confirm Password"
              value={data.confirmpass}
              onChange={handleChange}
            />
            <span className="error">{errors.confirmpass}</span>
          </div>

          <div>
            <span style={{ fontSize: "12px" }}>
              Already have an account?.{" "}
              <Link to={PATH_LANDING_APP.root}> Login!</Link>
            </span>
          </div>
          <button className="button infoButton" type="submit">
            Signup
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
