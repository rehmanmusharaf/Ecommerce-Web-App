import React from "react";
import Layout from "../../Components/Layout";
import Adminmenu from "../../Components/Adminmenu";
import { useAuth } from "../../Components/Context/Auth";
const Admindashboard = () => {
  let [auth] = useAuth();
  return (
    <Layout
      title="Admin Dashboard- Ecommerce-app"
      description="Ecommerce site to buy Home Essentials"
      author="Muhammad Rehman"
      keywords="html, css, js, reactjs, nodejs, express"
    >
      <div style={{ marginTop: "10px" }}>
        <div className="d-flex justify-content-evenly  ">
          <div style={{ width: "25%" }}>
            <Adminmenu />
          </div>
          <div style={{ width: "70%" }}>
            <h3>Admin Dashboard: {auth?.user.name} </h3>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Admindashboard;
