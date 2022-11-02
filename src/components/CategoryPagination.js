import React from "react";

const CategoryPagination = ({ activeLinks, paginate }) => {
  return (
    <div className='pagination' style={{ textAlign: "center" }}>
      {activeLinks.map((link) => {
        const { label } = link;
        return (
          <button
            onClick={() => {
              paginate(label);
            }}
            className='ui button primary small pagination-btn'
            style={{ padding: "5x" }}
            key={label}
          >
            <b style={{ display: "block" }}>{label}</b>
          </button>
        );
      })}
    </div>
  );
};

export default CategoryPagination;
