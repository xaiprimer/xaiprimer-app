import React from "react";
import { Helmet } from "react-helmet";

import * as styles from "../styles/tool.module.scss";

import Visualization from "../components/visualization/Visualization";

import PrimerNavbar from "../components/primer-navbar/PrimerNavbar";

const ToolPage = () => {
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>xAI Primer</title>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Helmet>
      <PrimerNavbar/>
      <div className={styles.viz}>
        <Visualization />
      </div>
    </>
  );
};

export default ToolPage;
