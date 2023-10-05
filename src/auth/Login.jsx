import React, { useState } from "react";
import useAuth from "../hooks/useAuth";
import useIsMountedRef from "../hooks/useMountedRef";

const Login = () => {
  const { login } = useAuth();
  const isMountedRef = useIsMountedRef();
  const [data, setData] = useState({
    username: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
    setErrors({ ...errors, [name]: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let formIsValid = true;

    if (!data.username) {
      setErrors({ ...errors, username: "Username is required." });
      formIsValid = false;
    }

    if (!data.password) {
      setErrors({ ...errors, password: "Password is required." });
      formIsValid = false;
    }

    if (formIsValid) {
      try {
        await login(data);
      } catch (error) {
        console.error(error);
        if (isMountedRef.current) {
          setErrors("afterSubmit", error);
        }
      }
    }
  };

  return (
    <div className="a-right">
      <form className="infoForm authForm" onSubmit={handleSubmit}>
        <h3>Log In</h3>

        <div>
          <input
            type="text"
            placeholder="Username"
            className="infoInput"
            name="username"
            value={data.username}
            onChange={handleChange}
          />
          <span className="error">{errors.username}</span>
        </div>

        <div>
          <input
            type="password"
            className="infoInput"
            placeholder="Password"
            name="password"
            value={data.password}
            onChange={handleChange}
          />
          <span className="error">{errors.password}</span>
        </div>

        <div>
          <span style={{ fontSize: "12px" }}>
            Don't have an account? Sign up
          </span>
          <button className="button infoButton" type="submit">
            Login
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
