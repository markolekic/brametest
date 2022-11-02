import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";

const initialState = {
  title: "",
  body: "",
  category_id: "",
};

const CreateEditBlog = () => {
  const [formValue, setFormValue] = useState(initialState);
  const { title, body, category_id } = formValue;
  const [blogEdit, setBlogEdit] = useState(false);

  const { id } = useParams();
  const url = "http://18.192.182.140/api/articles";
  const token = "9aK4W3D7NpbWwPzJmUOIcyPmyehl0PHZLWP14rzQqKzUPtcFCo0Tn051CvwN";
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      setBlogEdit(true);
      getSingleBlog(id);
    } else {
      setBlogEdit(false);
      setFormValue({ ...initialState });
    }
  }, [id]);

  const getSingleBlog = async (id) => {
    const singleBlog = await axios.get(`${url}/${id}?api_token=${token}`);
    if (singleBlog.status === 200) {
      setFormValue({ ...singleBlog });
    } else {
      alert("Something is wrong");
    }
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    if (title && body && category_id) {
      if (!blogEdit) {
        const updatedBlogData = { ...formValue };
        const response = await axios.post(`${url}?api_token=${token}`, updatedBlogData);
        if (response.status === 200) {
          alert("Blog created successfully");
        } else {
          alert("Blog is not created");
        }
      } else {
        const response = await axios.put(`${url}/${id}?api_token=${token}`, formValue);
        if (response.status === 200) {
          alert("Blog updated successfully");
        } else {
          alert("Blog is not updated");
        }
      }

      setFormValue({ title: "", body: "", category_id: "" });
      navigate("/dashboard");
    }
  };

  const handleOnInputChange = (e) => {
    let { name, value } = e.target;
    setFormValue({ ...formValue, [name]: value });
  };

  return (
    <>
      <div className='ui hidden divider'></div>
      <h1 className='ui header'>{!blogEdit ? "Create new blog" : "Edit blog"}</h1>
      <div className='ui form'>
        <form className='ui form' onSubmit={handleOnSubmit}>
          <input onChange={handleOnInputChange} minLength={5} maxLength={50} name='title' value={title || ""} type='text' required placeholder='Insert headline' />
          <div className='ui hidden divider'></div>
          <textarea onChange={handleOnInputChange} rows='4' minLength={150} maxLength={1000} name='body' value={body || ""} type='text' required placeholder='Blog text' />
          <div className='ui hidden divider'></div>
          <input onChange={handleOnInputChange} minLength={1} maxLength={2} name='category_id' value={category_id || ""} type='text' required placeholder='Category' />
          <div className='ui hidden divider'></div>
          <button className='ui button primary' type='submit'>
            Save blog
          </button>
          <Link className='ui button danger' to={"/dashboard"}>
            Go back
          </Link>
        </form>
      </div>
    </>
  );
};

export default CreateEditBlog;
