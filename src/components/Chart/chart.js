import * as React from "react";
import { Component } from "react";

import * as D3 from "d3";
import { useD3 } from "d3blackbox";

import Layout from "../layout";

// import data from './glyphs.json';

// D3.(data, function(data) { console.log(data); });

class Chart extends Component {
  state = {};

  componentDidMount() {}

  render() {
    return (
      <Layout>
        <div className="trasformare main">
          <div className="the-body-viz"></div>
        </div>
      </Layout>
    );
  }
}

export default Chart;
