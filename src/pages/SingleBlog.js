import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

const SingleBlog = () => {
  const [blog, setBlog] = useState();
  const [comments, setComments] = useState([]);
  const { id } = useParams();

  const url = "http://18.192.182.140/api/articles";

  useEffect(() => {
    if (id) {
      getSingleBlog();
      getComments();
    }
  }, [id]);

  const getSingleBlog = async () => {
    const response = await axios.get(`${url}/${id}`);
    if (response.status === 200) {
      setBlog(response.data.data);
    } else {
      alert("Something is wrong");
    }
  };

  const getComments = async () => {
    const response = await axios.get(`${url}/${id}/comments`);
    if (response.status === 200) {
      setComments(response.data.data);
    } else {
      alert("Something is wrong");
    }
  };

  return (
    <>
      <div className='center aligned grid'>
        <div className='ui hidden divider'></div>
        <Link to={"/blogs"} className='ui button primary basic'>
          Back
        </Link>
        <div className='ui hidden divider'></div>
        <h1 className='ui header'>{blog && blog.title}</h1>
        <p>{blog && blog.body}</p>
        <span>
          Category: <span className='ui button'>{blog && blog.category_id}</span>
        </span>
        <div className='ui hidden divider'></div>
        <p>
          <strong>Blog created at:</strong> {blog && blog.created_at.split("T")[0]}
        </p>
        <p>
          <strong>Blog edited: </strong>
          {blog && blog.updated_at.split("T")[0]}
        </p>
        <div className='ui comments'>
          <h3 className='ui dividing header'>Comments</h3>
          {comments.map((comment) => {
            const { description, id, title, created_at } = comment;
            return (
              <div className='comment' key={id}>
                <div className='avatar'>
                  <img src='https://react.semantic-ui.com/images/avatar/small/jenny.jpg' alt='avatar' />
                </div>
                <div className='content'>
                  <p className='author'>User</p>
                  <div className='metadata'>
                    <p>{created_at.split("T")[0]}</p>
                  </div>
                  <h4 className='text'>{title}</h4>
                  <p>{description}</p>
                </div>
                <div className='ui hidden divider'></div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default SingleBlog;
