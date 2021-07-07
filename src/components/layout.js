/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.com/docs/use-static-query/
 */

import * as React from "react";
import PropTypes from "prop-types";

import Navbar from "./Navbar/Navbar";
import Footer from "./footer";

import "./layout.css";

const Layout = ({ children }) => {
  return (
    <>
      <Navbar></Navbar>
      <div
        style={{
          margin: `0`,
          maxWidth: `auto`,
          height: `auto`,
        }}
      >
        <main>{children}</main>
      </div>
      <Footer></Footer>
    </>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
