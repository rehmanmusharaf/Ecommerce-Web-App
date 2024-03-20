import React from "react";
import "./CSS/Aboutpage.css";
import CV from "../resources/cv.docx";
import mineImg from "../resources/mineimg.png";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import { Link } from "react-router-dom";
import XIcon from "@mui/icons-material/X";
import InstagramIcon from "@mui/icons-material/Instagram";
const Aboutme = () => {
  return (
    <div className="about-container">
      <div className="about-content">
        <div className="about-picture-container">
          <img src={mineImg} alt="My Picture" className="about-picture" />
        </div>
        <div className="about-text">
          <h2 className="text-center border-bottom ">About Developer</h2>
          <h5>Muhammad Rehman</h5>
          <Link
            to="https://www.linkedin.com/in/muhammad-rehman-musharaf-7b3175265/"
            target="_blank"
            className=" mx-1 "
          >
            <LinkedInIcon />
          </Link>

          <Link
            to="https://twitter.com/rehmanmusharraf"
            target="_blank"
            className=" text-decoration-none text-black mx-1"
          >
            <XIcon />
          </Link>
          <Link
            to="https://www.instagram.com/rehmanmusharraf/"
            target="_blank"
            className=" text-decoration-none text-black mx-1"
          >
            <InstagramIcon />
          </Link>

          <p>
            I am a website developer skilled in creating dynamic web
            applications using React, Express, Node.js, and MongoDB as the
            database. With 1 year of experience in web development, I have a
            strong understanding of frontend and backend technologies, allowing
            me to build robust and scalable solutions.
          </p>
          <a href={CV} download className="download-button">
            Download CV
          </a>
        </div>
      </div>
    </div>
  );
};

export default Aboutme;
