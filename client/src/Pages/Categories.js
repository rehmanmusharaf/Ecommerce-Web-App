import React from "react";

const Categories = (props) => {
  return (
    <div className="d-flex flex-column ">
      {props.category.map((value, index) => {
        return (
          <div key={index}>
            <input
              type="checkbox"
              id={value.name}
              value={value.name}
              onChange={(e) => {
                props.func(e.target.value, e.target.checked);
              }}
            />
            <label htmlFor={value.name}>{value.name}</label>
          </div>
        );
      })}
    </div>
  );
};

export default Categories;
