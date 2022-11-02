import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";

const initialState = {
  name: "",
  description: "",
};

const CreateEditCategory = () => {
  const [formValue, setFormValue] = useState(initialState);
  const { name, description } = formValue;
  const [categoryEdit, setCategoryEdit] = useState(false);

  const { id } = useParams();
  const url = "http://18.192.182.140/api/categories";
  const token = "9aK4W3D7NpbWwPzJmUOIcyPmyehl0PHZLWP14rzQqKzUPtcFCo0Tn051CvwN";
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      setCategoryEdit(true);
      getSingleCategory(id);
    } else {
      setCategoryEdit(false);
      setFormValue({ ...initialState });
    }
  }, [id]);

  const getSingleCategory = async (id) => {
    const singleCategory = await axios.get(`${url}/${id}?api_token=${token}`);
    if (singleCategory.status === 200) {
      setFormValue({ ...singleCategory });
    } else {
      alert("Something is wrong");
    }
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    if (name && description) {
      if (!categoryEdit) {
        const updatedCategoryData = { ...formValue };
        const response = await axios.post("http://18.192.182.140/api/categories?api_token=9aK4W3D7NpbWwPzJmUOIcyPmyehl0PHZLWP14rzQqKzUPtcFCo0Tn051CvwN", updatedCategoryData);
        if (response.status === 200) {
          alert("Category created successfully");
        } else {
          alert("Category is not created");
        }
      } else {
        const response = await axios.put(`${url}/${id}?api_token=${token}`, formValue);
        if (response.status === 200) {
          alert("Category updated successfully");
        } else {
          alert("Category is not updated");
        }
      }

      setFormValue({ name: "", description: "" });
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
      <h1 className='ui header'>{!categoryEdit ? "Create new category" : "Edit category"}</h1>
      <div className='ui form'>
        <form className='ui form' onSubmit={handleOnSubmit}>
          <input onChange={handleOnInputChange} minLength={5} maxLength={50} name='name' value={name || ""} type='text' required placeholder='Insert headline' />
          <div className='ui hidden divider'></div>
          <textarea onChange={handleOnInputChange} rows='4' minLength={150} maxLength={1000} name='description' value={description || ""} type='text' required placeholder='Category text' />
          <div className='ui hidden divider'></div>
          <button className='ui button primary' type='submit'>
            Save category
          </button>
          <Link className='ui button danger' to={"/dashboard"}>
            Go back
          </Link>
        </form>
      </div>
    </>
  );
};

export default CreateEditCategory;
