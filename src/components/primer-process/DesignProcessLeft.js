import React from "react";
import data from "./projects-data.json";
import { Row, Col, Button } from "react-bootstrap";

import * as styles from "../../styles/process.module.scss";

const DesignProcessLeft = () => (
  <div className={styles.processBoxFix}>
    <Col xs={12} md={12} lg={12}>
      <h1>{data.title}</h1>
      <div>
        {data.project.map((data) => {
          return <h1 className={"gradient"}>{data.title}</h1>;
        })}
        {data.project.map((data) => {
          return (
            <a href={data.link} target="_blank">
              {data.link}
            </a>
          );
        })}
        <div>
          <section>
            <h5>Authors</h5>
            {data.project.map((data) => {
              return <h2>{data.author}</h2>;
            })}
          </section>
          <section>
            <h5>Year</h5>
            {data.project.map((data) => {
              return <h2>{data.year}</h2>;
            })}
          </section>
          <section>
            <h5>Tactics</h5>
            {data.project.map((data) => {
              console.log(data.tactics);
              return <h2>{data.tactics}</h2>;
            })}
          </section>
          <section>
            <h5>Media</h5>
            {data.project.map((data) => {
              return <h2>{data.media}</h2>;
            })}
          </section>
        </div>
      </div>
    </Col>
  </div>
);
export default DesignProcessLeft;
