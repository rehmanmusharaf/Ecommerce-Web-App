import React from "react";
import Layout from "./Layout";
import Adminmenu from "./Adminmenu";
const Users = () => {
  return (
    <Layout>
      <div style={{ marginTop: "10px" }}>
        <div className="d-flex justify-content-evenly  ">
          <div style={{ width: "25%" }}>
            <Adminmenu />
          </div>
          <div style={{ width: "70%" }}>
            <h3>All Users </h3>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Users;
