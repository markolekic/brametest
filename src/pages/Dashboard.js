import React from "react";
import { useAuth } from "../components/auth";
import { useNavigate, Link } from "react-router-dom";
import Tabs from "../components/Tabs";

const Dashboard = () => {
  const navigate = useNavigate();
  const auth = useAuth();

  const handleLogout = () => {
    auth.logout();
    navigate("/");
  };

  return (
    <>
      <div className='ui hidden divider'></div>
      <h1>Dashboard</h1>
      <Link to={"/blogs"} target='_blank' className='ui button primary basic'>
        Visit Blog Page
      </Link>
      <div className='ui hidden divider'></div>
      <div className='extra'>
        <div className='right floated author'>
          <img className='ui avatar image' src='https://semantic-ui.com/images/avatar/small/matt.jpg' alt='avatar' />
          {auth.user}
        </div>
        <div className='ui hidden divider'></div>
        <button type='button' onClick={() => navigate("/addBlog")} className='ui button primary'>
          Create new blog
        </button>
        <button type='button' onClick={() => navigate("/addCategory")} className='ui button secondary'>
          Create new category
        </button>
        <button onClick={handleLogout} type='button' className='ui button danger'>
          Log out
        </button>
      </div>
      <div className='ui hidden divider'></div>
      <Tabs />
      <div className='ui hidden divider'></div>
    </>
  );
};

export default Dashboard;
