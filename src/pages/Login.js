import React from "react";
import { useNavigate, Link } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../components/auth";

const Login = () => {
  const [user, setUser] = useState("");
  const auth = useAuth();

  const navigate = useNavigate();

  const handleLogin = () => {
    auth.login(user);
    navigate("/dashboard");
  };

  return (
    <>
      <div className='ui hidden divider'></div>
      <h1 className='ui header'>Login</h1>
      <div className='ui form'>
        <label className='ui pointing below ignored language label' htmlFor='user'>
          Username:{""}
        </label>
        <br />
        <input
          className='ui form'
          onChange={(e) => {
            setUser(e.target.value);
          }}
          type='text'
          placeholder='Log in with any username'
        />
        <div className='ui hidden divider'></div>
        <button type='button' className='ui button primary' onClick={handleLogin}>
          Login
        </button>
        <Link className='ui button danger' to={"/blogs"}>
          Check out the blogs
        </Link>
      </div>
    </>
  );
};

export default Login;
