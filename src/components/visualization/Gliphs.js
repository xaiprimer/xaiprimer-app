import * as d3 from "d3";

const exploration = d3
  .scaleOrdinal()
  .domain(["guided", "open ended", "mixed"])
  .range(["#000", "#fff", "#CECECE"]);
const scenario = d3
  .scaleOrdinal()
  .domain(["exhibition", "multiple", "desktop"])
  .range(["#FF451D", "#3479FF", "#FFC200"])
  .unknown("#5151fc");

const cluster = (parent, data) => {
  // anti collision circle
  // d3.select(parent)
  //   .selectAll("circle")
  //   .data(data, (d) => d.id)
  //   .join("circle")
  //   .attr("r", (d) => d.r)
  //   .attr("stroke", "grey")
  //   .attr("fill", "none");

  d3.select(parent)
    .selectAll(".exploration")
    .data(data, (d) => d.id)
    .join((enter) => enter.append("rect").classed(".exploration", true))
    .attr("fill", d=>exploration(d.exploration))
    .attr("width", (d) => d.side)
    .attr("height", (d) => d.side / 5)
    .attr("x", (d) => -0.5 * d.side)
    .attr("y", (d) => -0.5 * d.side);

  d3.select(parent)
    .selectAll(".exhibition")
    .data(data, (d) => d.id)
    .join((enter) => enter.append("rect").classed(".exhibition", true))
    .attr("fill", d=>scenario("exhibition"))
    .attr("width", (d) => d.side * d.scenario_exhibition)
    .attr("height", (d) => (d.side / 5) * 4)
    .attr("x", (d) => -0.5 * d.side)
    .attr("y", (d) => -0.5 * d.side + d.side / 5);

  d3.select(parent)
    .selectAll(".multiple")
    .data(data, (d) => d.id)
    .join((enter) => enter.append("rect").classed(".multiple", true))
    .attr("fill", scenario("multiple"))
    .attr("width", (d) => d.side * d.scenario_multiple)
    .attr("height", (d) => (d.side / 5) * 4)
    .attr("x", (d) => -0.5 * d.side + d.side * d.scenario_exhibition)
    .attr("y", (d) => -0.5 * d.side + d.side / 5);

  d3.select(parent)
    .selectAll(".desktop")
    .data(data, (d) => d.id)
    .join((enter) => enter.append("rect").classed(".desktop", true))
    .attr("fill", scenario("desktop"))
    .attr("width", (d) => d.side * d.scenario_desktop)
    .attr("height", (d) => (d.side / 5) * 4)
    .attr(
      "x",
      (d) =>
        -0.5 * d.side +
        d.side * d.scenario_exhibition +
        d.side * d.scenario_desktop
    )
    .attr("y", (d) => -0.5 * d.side + d.side / 5);

  d3.select(parent)
    .selectAll(".mostRecurrentExpl")
    .data(data, (d) => d.id)
    .join((enter) => enter.append("rect").classed(".mostRecurrentExpl", true))
    .attr("fill", "none")
    .attr("stroke", d=>exploration("guided"))
    .attr("stroke-width", 3)
    .attr("width", (d) => d.side)
    .attr("height", (d) => d.side)
    .attr("x", (d) => -0.5 * d.side)
    .attr("y", (d) => -0.5 * d.side);
};

const project = (parent, data) => {
  d3.select(parent)
    .selectAll("circle")
    .data(data, (d) => d.id)
    .join("circle")
    .attr("r", (d) => d.r)
    .attr("stroke", "grey")
    .attr("fill", "none");

  d3.select(parent)
    .selectAll("rect")
    .data(data, (d) => d.id)
    .join("rect")
    .attr("fill", (d) => d.fill)
    .attr("width", (d) => d.side)
    .attr("height", (d) => d.side)
    .attr("x", (d) => -0.5 * d.side)
    .attr("y", (d) => -0.5 * d.side);

  // d3.select(parent)
  //   .selectAll("text")
  //   .data(data, (d) => d.id)
  //   .join("text")
  //   .attr("fill", "black")
  //   .attr("font-size", 30)
  //   .attr("y", 10)
  //   .attr("text-anchor", "middle")
  //   .text((d) => d.title.toUpperCase());
};

export { cluster, project };
