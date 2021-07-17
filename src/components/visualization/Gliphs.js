import * as d3 from "d3";

const exploration = d3
  .scaleOrdinal()
  .domain(["guided", "open ended", "mixed"])
  .range(["#000", "#fff", "#E5E5E5"]);
const scenario = d3
  .scaleOrdinal()
  .domain(["exhibition", "desktop", "mobile", "multiple"])
  .range(["#FF451D", "#3479FF", "#FFC200", "#E5E5E5"])
  .unknown("#04CE31");

const cluster = (parent, data) => {
  const cluster = d3
    .select(parent)
    .append("g")
    .selectAll(".cluster")
    .data(data)
    .join((enter) => enter.append("g").classed("cluster", true))
    .attr("transform",d=>`translate(-${d.side/2},-${d.side/2 - d.side*1/5})`);
  // map data
  data = data.map((d) => {
    // add treemap data structure, for scenarios
    const treemapOptions = {
      width: d.side,
      height: (d.side * 4) / 5,
      padding: 0,
      round: true,
    };
    d.root = treemap(d.scenarios, treemapOptions);
    return d;
  });

  console.log("cluster data", data);

  // anti collision circle
  // d3.select(parent)
  //   .selectAll("circle")
  //   .data(data, (d) => d.id)
  //   .join("circle")
  //   .attr("r", (d) => d.r)
  //   .attr("stroke", "grey")
  //   .attr("fill", "none");

  // render treemap scenarios
  const leaf = cluster
    .selectAll("g")
    .data((d) => d.root.leaves())
    .join("g")
    .classed("leaf", true)
    .attr("transform", (d) => `translate(${d.x0},${d.y0})`);

  leaf
    .append("rect")
    .attr(
      "id",
      (d, i) => (d.leafUid = "leaf-cluster" + d.parent.data.name + "-" + i)
    )
    .attr("fill", (d) => {
      while (d.depth > 1) d = d.parent;
      return scenario(d.data.name);
    })
    .attr("width", (d) => d.x1 - d.x0)
    .attr("height", (d) => d.y1 - d.y0);

  leaf
    .append("clipPath")
    .attr("id", (d, i) => (d.clipUid = "leaf-" + d.parent.data.name + "-" + i))
    .append("use")
    .attr("xlink:href", (d) => d.leafUid.href);

  d3.select(parent)
    .selectAll(".exploration")
    .data(data, (d) => d.id)
    .join((enter) => enter.append("rect").classed("exploration", true))
    .attr("fill", (d) => exploration(d.exploration))
    .attr("width", (d) => d.side)
    .attr("height", (d) => d.side / 5)
    .attr("x", (d) => -0.5 * d.side)
    .attr("y", (d) => -0.5 * d.side);

  d3.select(parent)
    .selectAll(".mostRecurrentExpl")
    .data(data, (d) => d.id)
    .join((enter) => enter.append("rect").classed("mostRecurrentExpl", true))
    .attr("fill", "none")
    .attr("stroke", (d) => exploration("guided"))
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

function treemap(
  data,
  options = { width: 10, height: 10, padding: 0, round: true }
) {
  return d3
    .treemap()
    .tile(d3.treemapDice)
    .size([options.width, options.height])
    .padding(options.padding)
    .round(options.round)(
    d3
      .hierarchy(data)
      .sum((d) => d.value)
      .sort((a, b) => b.value - a.value)
  );
}
