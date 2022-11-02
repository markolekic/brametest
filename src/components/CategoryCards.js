import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import CategoryPagination from "./CategoryPagination";

export const CategoryCards = () => {
  const [categories, setCategories] = useState([]);
  const [links, setLinks] = useState([]);

  const urlCategory = "http://18.192.182.140/api/categories";
  const token = "9aK4W3D7NpbWwPzJmUOIcyPmyehl0PHZLWP14rzQqKzUPtcFCo0Tn051CvwN";
  const maxLength = 150;

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    const response = await axios.get(urlCategory);
    if (response.status === 200) {
      setCategories(response.data.data);
      setLinks(response.data.links);
    } else {
      alert("Something went wrong");
    }
  };

  const paginate = async (pageNumber) => {
    const response = await axios.get(`${urlCategory}?page=${pageNumber}`);
    if (response.status === 200) {
      setLinks(response.data.links);
      setCategories(response.data.data);
    } else {
      alert("Something went wrong");
    }
  };

  const handleDeleteCategories = async (id) => {
    if (window.confirm("Are you sure you want to delete this category?")) {
      const response = await axios.delete(`${urlCategory}/${id}?api_token=${token}`);
      if (response.status === 200) {
        alert("Category deleted");
        loadCategories();
      } else {
        alert("Something went wrong");
      }
    }
  };
  return (
    <>
      <div className='ui stackable grid container'>
        <div className='three column row'>
          {categories.map((category) => {
            const { name, description, id } = category;
            return (
              <div className='column ui card' key={id}>
                <div className='ui hidden divider'></div>
                <h3 className='ui header'>{name}</h3>
                <p>{`${description.substring(0, maxLength)}... `}</p>
                <div className='ui hidden divider'></div>
                <div className='center aligned grid'>
                  <Link to={`/editCategory/${id}`}>
                    <i className='pencil alternate icon large'></i>
                  </Link>
                  <span
                    style={{ color: "red", cursor: "pointer", marginLeft: "10px" }}
                    onClick={() => {
                      handleDeleteCategories(id);
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
      <CategoryPagination activeLinks={links} paginate={paginate} />
    </>
  );
};

export default CategoryCards;
