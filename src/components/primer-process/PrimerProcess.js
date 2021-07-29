import React from "react";
import { Carousel, Button } from "react-bootstrap";
import data from "../visualization/data-primer.json";

// import * as styles from "../../styles/process.module.scss";

const PrimerProcess = (data, id) => {
  return (
    <div key={id}>
      <h2>{data.title}</h2>
    </div>
  );
};

export default PrimerProcess;
