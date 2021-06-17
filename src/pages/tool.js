import * as React from "react";
import { Link } from "gatsby";
import * as D3 from "d3";
import { useD3, userD3 } from "d3blackbox";

import Layout from "../components/layout";

const getRandomData = () =>
  D3.range(20).map(() => ({ x: Math.random(), y: Math.random() }));

const Axis = ({ x, y, scale, axisType }) => {
  const fnName = axisType === "left" ? "axisLeft" : "axisBottom";
  const ref = useD3((el) => D3.select(el).call(D3[fnName](scale)));

  return <g transform={`translate(${x}, ${y})`} ref={ref} />;
};

export default () => {
  const data = getRandomData();
  const margin = { top: 100, right: 50, bottom: 100, left: 50 };
  const width = 1600;
  const height = 1000 - margin.top - margin.bottom;
  const veri = D3.scaleOrdinal().domain(["0", "1"]).range(["#fff","#3479FF"]);

  const xScale = D3.scaleLinear().domain([0, 1]).range([45, width]);
  const yScale = D3.scaleLinear()
    .domain([0, 1])
    .range([height - 45, 5]);

  // compute the density data
  var densityData = (D3.contourDensity()
    .x(function (d) {
      return xScale(d.x);
    })
    .y(function (d) {
      return yScale(d.y);
    })
    .size([width, height])
    .bandwidth(10)(data).value = (x, y) =>
    (1 +
      (x + y + 1) ** 2 *
        (19 - 14 * x + 3 * x ** 2 - 14 * y + 6 * x * y + 3 * y ** 2)) *
    (30 +
      (2 * x - 3 * y) ** 2 *
        (18 - 32 * x + 12 * x * x + 48 * y - 36 * x * y + 27 * y ** 2)))
    .selectAll("path")
    .data(densityData)
    .enter()
    .append("path")
    .attr("d", D3.geoPath())
    .attr("fill", (d) => veri(d.value))
    .attr("opacity", 0.4);

  return (
    <Layout>
      <svg width={width} height={height}>
        {data.map((d) => (
          <circle cx={xScale(d.x)} cy={yScale(d.y)} r={5} />
        ))}
        <Axis x={40} y={5} scale={yScale} axisType="left" />
        <Axis x={0} y={height - 40} scale={xScale} axisType="bottom" />
      </svg>
    </Layout>
  );
};
