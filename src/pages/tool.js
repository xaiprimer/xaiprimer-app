import React from "react";

import * as styles from "../styles/tool.module.scss";
import Visualization from "../components/visualization/Visualization"

const ToolPage = () => {
    return <>
        <div className={styles.viz}><Visualization/></div>
    </>
};

export default ToolPage;
