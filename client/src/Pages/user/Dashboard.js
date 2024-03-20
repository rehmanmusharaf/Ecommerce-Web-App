import React from "react";
import Layout from "../../Components/Layout";
import { useAuth } from "../../Components/Context/Auth";
import Usermenu from "../../Components/Usermenu";
const Dashboard = () => {
  let [auth] = useAuth();
  return (
    <Layout
      title="User Dashboard- Ecommerce-app"
      description="Ecommerce site to buy Home Essentials"
      author="Muhammad Rehman"
      keywords="html, css, js, reactjs, nodejs, express"
    >
      <div style={{ marginTop: "10px" }}>
        <div className="d-flex justify-content-evenly  ">
          <div style={{ width: "25%" }}>
            <Usermenu />
          </div>
          <div style={{ width: "70%" }}>
            <h3>User Dashboard: {auth?.user.name} </h3>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
