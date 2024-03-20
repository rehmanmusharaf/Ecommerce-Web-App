import React from "react";
import { Link } from "react-router-dom";

const Adminmenu = () => {
  return (
    <div>
      <div className="list-group">
        <Link
          to="/dashboard/admin/create-category"
          className="list-group-item list-group-item-action"
        >
          Create Category
        </Link>
        <Link
          to="/dashboard/admin/create-product"
          className="list-group-item list-group-item-action"
        >
          createProduct
        </Link>
        <Link
          to="/dashboard/admin/all-users"
          className="list-group-item list-group-item-action"
        >
          Users
        </Link>
        <Link
          to="/dashboard/admin/orders"
          className="list-group-item list-group-item-action"
        >
          Users Orders
        </Link>
      </div>
    </div>
  );
};

export default Adminmenu;
