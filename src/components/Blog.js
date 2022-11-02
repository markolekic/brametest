import React from "react";
import { useNavigate } from "react-router-dom";

const Blogs = ({ blogs, loading }) => {
  const maxLength = 150;
  const navigate = useNavigate();

  if (loading) {
    return <h1 className='ui heading'>Loading...</h1>;
  }
  return (
    <>
      {blogs.map((blog) => {
        const { category_id, title, body, id } = blog;
        return (
          <div className='column ui card' key={id}>
            <div className='ui hidden divider'></div>
            <h3 className='ui header'>{title}</h3>
            <p>
              {`${body.substring(0, maxLength)}... `}
              <span style={{ color: "blue", cursor: "pointer" }} className='blue' onClick={() => navigate(`/blogs/${id}`)}>
                Read more
              </span>
            </p>
            <span>
              Category: <span className='ui button'>{category_id}</span>
            </span>
            <div className='ui hidden divider'></div>
          </div>
        );
      })}
    </>
  );
};

export default Blogs;
