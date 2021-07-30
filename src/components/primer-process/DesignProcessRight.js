import React from "react";
import data from "./projects-data.json";
import { Row, Col, Button } from "react-bootstrap";

import * as styles from "../../styles/process.module.scss";

const DesignProcessRight = () => (
  <div>
    <Col xs={12} md={12} lg={12}>
      <div>
        {data.project.map((data) => {
          return <h1 className={"intro"}>{data.quotes}</h1>;
        })}
        <div>
          <section>
            <h5>End Users</h5>
            {data.project.map((data) => {
              return <h2>{data.end_users}</h2>;
            })}
          </section>
          <section>
            <h5>Objectives</h5>
            {data.project.map((data) => {
              return <h2>{data.objectives}</h2>;
            })}
          </section>
          <section>
            <h5>Tactics</h5>
            {data.project.map((data) => {
              return <h2>{data.challenges}</h2>;
            })}
          </section>
        </div>
      </div>
    </Col>
  </div>
);
export default DesignProcessRight;
