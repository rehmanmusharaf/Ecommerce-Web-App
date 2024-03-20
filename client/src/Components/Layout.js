import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import { Helmet } from "react-helmet";
const Layout = ({ children, title, description, author, keywords }) => {
  return (
    <>
      <Helmet>
        <meta charset="UTF-8" />
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
        <meta name="author" content={author} />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>{title}</title>
      </Helmet>
      <Header />
      <div style={{ minHeight: "80vh", height: "auto" }}>{children}</div>
      <Footer />
    </>
  );
};
Layout.defaultProps = {
  title: "Ecommerce site",
  description: "Ecommerce site to buy Home Essentials",
  author: "muhammad rehman",
  keywords: "html, css, js, reactjs, nodejs, express",
};
export default Layout;
