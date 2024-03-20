import React from "react";
import { Link } from "react-router-dom";

const Usermenu = () => {
  return (
    <div>
      <div className="list-group">
        <Link
          to="/dashboard/user/profile"
          className="list-group-item list-group-item-action"
        >
          Profile
        </Link>
        <Link
          to="/dashboard/user/orders"
          className="list-group-item list-group-item-action"
        >
          Orders
        </Link>
      </div>
    </div>
  );
};

export default Usermenu;
