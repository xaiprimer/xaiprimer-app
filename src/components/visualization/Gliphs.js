import * as d3 from "d3";

const cluster = (parent, data) => {
  d3.select(parent)
    .selectAll("circle")
    .data(data, (d) => d.id)
    .join("circle")
    .attr("r", (d) => d.r)
    .attr("stroke", "#7765E3")
    .attr("fill", "none");

  d3.select(parent)
    .selectAll("rect")
    .data(data, (d) => d.id)
    .join("rect")
    .attr("fill", "#7765E3")
    .attr("width", (d) => d.side)
    .attr("height", (d) => d.side)
    .attr("x", (d) => -0.5*d.side)
    .attr("y", (d) => -0.5*d.side);
};

const project = (parent, data) => {
  d3.select(parent)
    .selectAll("circle")
    .data(
      data,
      (d) => d.id
    )
    .join("circle")
    .attr("r", (d) => d.r)
    .attr("fill", d=>d.fill);

  d3.select(parent)
    .selectAll("text")
    .data(
      data,
      (d) => d.id
    )
    .join("text")
    .attr("fill", "black")
    .attr("font-size", 30)
    .attr("y", 10)
    .attr("text-anchor", "middle")
    .text((d) => d.title.toUpperCase());
};

export { cluster, project };
