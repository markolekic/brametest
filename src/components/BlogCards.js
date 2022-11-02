import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import BlogPagination from "./BlogPagination";

const BlogCards = () => {
  const [blogs, setBlogs] = useState([]);
  const [links, setLinks] = useState([]);

  const urlBlog = "http://18.192.182.140/api/articles";
  const token = "9aK4W3D7NpbWwPzJmUOIcyPmyehl0PHZLWP14rzQqKzUPtcFCo0Tn051CvwN";

  const maxLength = 150;

  useEffect(() => {
    loadBlogs();
  }, []);

  const loadBlogs = async () => {
    const response = await axios.get(urlBlog);
    if (response.status === 200) {
      setBlogs(response.data.data);
      setLinks(response.data.links);
    } else {
      alert("Something went wrong");
    }
  };

  const paginate = async (pageNumber) => {
    const response = await axios.get(`${urlBlog}?page=${pageNumber}`);
    if (response.status === 200) {
      setLinks(response.data.links);
      setBlogs(response.data.data);
    } else {
      alert("Something went wrong");
    }
  };

  const handleDeleteBlogs = async (id) => {
    if (window.confirm("Are you sure you want to delete this blog?")) {
      const response = await axios.delete(`${urlBlog}/${id}?api_token=${token}`);
      if (response.status === 200) {
        alert("Blog deleted");
        loadBlogs();
      } else {
        alert("Something went wrong");
      }
    }
  };

  return (
    <>
      <div className='ui stackable grid container'>
        <div className='three column row'>
          {blogs.map((item) => {
            const { category_id, title, body, id } = item;
            return (
              <div className='column ui card' key={id}>
                <div className='ui hidden divider'></div>
                <h3 className='ui header'>{title}</h3>
                <p>{`${body.substring(0, maxLength)}... `}</p>
                <span>
                  Category: <span className='ui button'>{category_id}</span>
                </span>
                <div className='ui hidden divider'></div>
                <div className='center aligned grid'>
                  <Link to={`/editBlog/${id}`}>
                    <i className='pencil alternate icon large'></i>
                  </Link>
                  <span
                    style={{ color: "red", cursor: "pointer", marginLeft: "10px" }}
                    onClick={() => {
                      handleDeleteBlogs(id);
                    }}
                    type='button'
                  >
                    <i className='window close outline icon large'></i>
                  </span>
                </div>
                <div className='ui hidden divider'></div>
              </div>
            );
          })}
        </div>
      </div>
      <div className='ui hidden divider'></div>
      <BlogPagination blogPosts={blogs} activeLinks={links} paginate={paginate} />
    </>
  );
};

export default BlogCards;
