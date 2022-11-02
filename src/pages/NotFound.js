import React from "react";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <>
      <div className='ui hidden divider'></div>
      <h1 className='ui center header'>404</h1>
      <h1 className='ui header'>Page not found</h1>
      <button onClick={() => navigate("/blogs")} type='button' className='ui button primary'>
        Check the articles
      </button>
    </>
  );
};

export default NotFound;
