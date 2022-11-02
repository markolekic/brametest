import React, { useState } from "react";
import CategoryCards from "./CategoryCards";
import BlogCards from "./BlogCards";
import "./Tabs.css";

const Tabs = () => {
  const [ToggleState, setToggleState] = useState(1);

  const toggleTab = (index) => {
    setToggleState(index);
  };

  const getActiveClass = (index, className) => (ToggleState === index ? className : "");

  return (
    <div className='container'>
      <ul className='tab-list'>
        <li className={`tabs ${getActiveClass(1, "active-tabs")}`} onClick={() => toggleTab(1)}>
          <h1 className='ui header'>Blogs</h1>
        </li>
        <li className={`tabs ${getActiveClass(2, "active-tabs")}`} onClick={() => toggleTab(2)}>
          <h1 className='ui header'>Categories</h1>
        </li>
      </ul>
      <div className='content-container'>
        <div className={`content ${getActiveClass(1, "active-content")}`}>
          <BlogCards />
        </div>
        <div className={`content ${getActiveClass(2, "active-content")}`}>
          <CategoryCards />
        </div>
      </div>
    </div>
  );
};

export default Tabs;
