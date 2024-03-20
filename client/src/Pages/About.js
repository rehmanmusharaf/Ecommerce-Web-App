import React from "react";
import Layout from "../Components/Layout";
import "../Components/CSS/Aboutpage.css";
import webimg from "../resources/web img.png";
import Aboutme from "../Components/Aboutme";
const About = () => {
  return (
    <Layout>
      <Aboutme />

      <div className="about-container">
        <div className="about-content">
          <div className="about-picture-container">
            <img src={webimg} alt="My Picture" className="about-picture" />
          </div>
          <div className="about-text">
            <h2 className=" border-bottom ">About Website</h2>
            <p>
              Welcome to our MERN stack e-commerce platform! As the developer
              behind this project, I've harnessed the capabilities of MongoDB,
              Express, React, and Node.js to craft a seamless full-stack web
              application. With a dynamic React-based frontend and a robust
              Express/Node.js backend powered by MongoDB, our platform offers
              users an immersive shopping experience. Whether you're a novice or
              an experienced developer.
            </p>
            <h4>Features</h4>
            <ul>
              <li>Validation</li>
              <li>Password Hashing</li>
              <li>Payment Gateway Integration</li>
              <li>Route Validation</li>
              <li>Admin Dashboard</li>
              <li>User Dashboard</li>
              <li>Login Validation</li>
              <li>Dynamic Data</li>
              <li>Filters</li>
              <li>RESTful API</li>
            </ul>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default About;
