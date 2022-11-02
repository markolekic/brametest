import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Blog from "../components/Blog";
import BlogPagination from "../components/BlogPagination";

const GridBlog = () => {
  const [loading, setLoading] = useState(false);
  const [blogs, setBlogs] = useState([]);
  const [links, setLinks] = useState([]);

  const url = "http://18.192.182.140/api/articles";

  useEffect(() => {
    const fetchBlogs = async () => {
      setLoading(true);
      const response = await axios.get(url);
      if (response.status === 200) {
        setBlogs(response.data.data);
        setLinks(response.data.links);
        setLoading(false);
      } else {
        alert("Something went wrong");
      }
    };
    fetchBlogs();
  }, []);

  const paginate = async (pageNumber) => {
    const response = await axios.get(`${url}?page=${pageNumber}`);
    if (response.status === 200) {
      setLinks(response.data.links);
      setBlogs(response.data.data);
    } else {
      alert("Something went wrong");
    }
  };

  return (
    <>
      <div className='ui hidden divider'></div>
      <Link to={"/"} className='ui button primary basic'>
        Log in
      </Link>
      {blogs.length === 0 && <h1 className='ui header'>Loading...</h1>}
      <div className='ui hidden divider'></div>
      <h1 className='ui header'>Article page</h1>
      <div className='ui stackable grid container'>
        <div className='three column row'>
          <Blog blogs={blogs} loading={loading} />
        </div>
      </div>
      <div className='ui hidden divider'></div>
      <BlogPagination blogPosts={blogs} activeLinks={links} paginate={paginate} />
      <div className='ui hidden section divider'></div>
    </>
  );
};

export default GridBlog;
