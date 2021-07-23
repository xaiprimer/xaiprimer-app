import React from "react";
import { Helmet } from "react-helmet";

import * as styles from "../styles/tool.module.scss";
import PrimerNavbar from "../components/primer-navbar/PrimerNavbar";
import VisualizationBackup from "../components/visualization/VisualizationBackup";

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
        <VisualizationBackup />
      </div>
    </>
  );
};

export default ToolPage;
