import * as d3 from "d3";
import { cluster as renderCluster, project as renderProject } from "./Gliphs";
// values
let data,
  originalData,
  bbox,
  width,
  height,
  zoomMode = "clusters", // modes can be 3: "clusters", "projects" and "networks"
  zoomValues = {
    clusters: 2,
    projects: 4,
    networks: 7,
  },
  mm_w = d3.max([width / 4, 280]),
  mm_h,
  mm_x,
  mm_y,
  factor;
// d3 selections
let svg, g0, g, contour, cluster, item, tactic, link, minimap;
// scales
const _k = 4;
const radius = d3
  .scaleSqrt()
  .domain([0, 1])
  .range([0, 0.8 * _k]);
const side = d3
  .scaleSqrt()
  .domain([0, 1])
  .range([0, 5 * _k]);
const medium = d3.scaleLinear().domain([0, 1]).range([0, 0.58]); // to size elements within the project gliph, size is in percentage. By default is set as if there is a single medium in every gliph
const linkDistance = d3
  .scaleSqrt()
  .domain([0, 1])
  .range([0, 4 * _k]);
// functions
let setMode, setTooltip, setZoomState, zoom;
const zoomed = (e) => {
  setTooltip(null);
  setZoomState(e.transform);
  const { x, y, k } = e.transform;
  g0.attr("transform", `translate(${x},${y}) scale(${k})`);

  minimap
    .select(".mm-view")
    .attr("width", (width * factor) / k)
    .attr("height", (height * factor) / k)
    .attr("x", -((x * factor) / k))
    .attr("y", -((y * factor) / k));

  document.documentElement.style.setProperty("--stroke-width", 1 / k);
  document.documentElement.style.setProperty("--label-size", 10 / k);
  const previousMode = zoomMode;
  if (k <= zoomValues.clusters) {
    zoomMode = "clusters";
  } else if (k <= zoomValues.projects) {
    zoomMode = "projects";
  } else {
    zoomMode = "networks";
  }
  if (previousMode !== zoomMode) {
    switch (zoomMode) {
      case "clusters":
        switchRender("clusters");
        setMode("clusters");
        break;
      case "projects":
        switchRender("projects", previousMode === "clusters");
        setMode("projects");
        break;
      case "networks":
        switchRender("networks");
        setMode("networks");
        break;
      default:
        console.log("😱 no case matched. Don't update visualization.");
    }
  }
};
const setZoom = ({ k, x, y, duration = 1000 }) => {
  const oldZoom = d3.zoomTransform(g.node());
  let newZoom;
  if (!x || !y) {
    newZoom = svg.transition().duration(duration).call(zoom.scaleTo, k);
    return;
  }
  newZoom = new d3.ZoomTransform(k, x, y);
  svg.transition().duration(duration).call(zoom.transform, newZoom);
};
const zoomToSelection = ({ dataSelection, k, duration }) => {
  // need to match the selection through id with the data stored in this component
  // the reason is that _x and _y positions are rescaled according to screen size
  const selectionMatched = data.filter((d) =>
    dataSelection.map((d) => d.id).indexOf(d.id) !== -1
  );

  let [x0, x1] = d3.extent(selectionMatched, (d) => d._x);
  let [y0, y1] = d3.extent(selectionMatched, (d) => d._y);

  // because of initial translation
  x0 += width / 2;
  x1 += width / 2;
  y0 += height / 2;
  y1 += height / 2;

  let bbox_width = x1 - x0;
  let bbox_height = y1 - y0;

  k = k ? k : 1 / Math.max((x1 - x0) / width, (y1 - y0) / height);
  const [x, y] = [
    -(x0 * k + (bbox_width * k - width) / 2),
    -(y0 * k + (bbox_height * k - height) / 2),
  ];
  setZoom({ x, y, k, duration });
};
const linkArc = (d) => {
  const r = Math.hypot(d.target.x - d.source.x, d.target.y - d.source.y);
  return `
    M${d.source.x},${d.source.y}
    A${r},${r} 0 0,1 ${d.target.x},${d.target.y}
  `;
};
const rescalePositions = (data, _width = width, _height = height) => {
  const value = _width > _height ? _height / 2 : _width / 2;
  const scale = d3
    .scaleLinear()
    .domain(d3.extent(data, (d) => Number(_width > _height ? d._y : d._x)))
    .range([-value * 0.8, value * 0.8]);
  return data.map((d) => ({ ...d, _x: scale(d._x), _y: scale(d._y) }));
};
const makeContours = (data) => {
  const extent_x = d3.extent(data, (d) => Number(d._x));
  const extent_y = d3.extent(data, (d) => Number(d._y));

  const cont_x = d3
    .scaleLinear()
    .domain(extent_x)
    .range([0, extent_x[1] - extent_x[0]]);
  const cont_y = d3
    .scaleLinear()
    .domain(extent_y)
    .range([0, extent_y[1] - extent_y[0]]);

  let dataContour = data.map((d) => [
    cont_x(Number(d._x)),
    cont_y(Number(d._y)),
  ]);

  const maxX = d3.max(dataContour, (d) => d[0]);
  const maxY = d3.max(dataContour, (d) => d[1]);

  // contours react to screen size
  const bandwidthScale = d3.scaleLinear().domain([720, 2160]).range([15, 35]);
  const thresholdsScale = d3.scaleLinear().domain([720, 2160]).range([6, 10]);

  const contours = d3
    .contourDensity()
    .size([maxX, maxY])
    .bandwidth(bandwidthScale(d3.min([width, height])))
    .thresholds(thresholdsScale(d3.min([width, height])))(dataContour);

  contour
    .data(contours)
    .join("path")
    .attr("transform", `translate(${extent_x[0]}, ${extent_y[0]})`)
    .attr("stroke", "#ccc")
    .attr("stroke-width", "var(--stroke-width)")
    .attr("stroke-linejoin", "round")
    .attr("fill", "#fff")
    .attr("fill-opacity", 0.35)
    .attr("d", d3.geoPath());
};
function makeClusters(data) {
  const data_expl = data
    .map((d) => {
      return d.exploration
        .split(",")
        .map((dd) => ({ cluster: d.cluster, exploration: dd }));
    })
    .flat();

  const temp_expl = d3.flatRollup(
    data_expl,
    (v) => v.length,
    (d) => d.cluster,
    (d) => d.exploration
  );

  const explorations = d3.flatRollup(
    temp_expl,
    (v) => v,
    (d) => d[0]
  );
  // console.log("explorations",explorations)

  const returnExploration = (cluster) => {
    const _exploration = explorations.find((e) => e[0] === cluster);
    const value =
      _exploration[1].length === 1 ? _exploration[1][0][1] : "mixed";
    return value;
  };

  const data_scenarios = data
    .map((d) => {
      return d.scenarios
        .split(";")
        .map((dd) => ({ cluster: d.cluster, individual_scenario: dd }));
    })
    .flat();

  // // everything that is not "mobile" or "desktop" or "exhibition" becomes "multiple"
  const data_scenarios_reworked = data_scenarios.map((d) => {
    d.individual_scenario =
      d.individual_scenario === "mobile" ||
      d.individual_scenario === "desktop" ||
      d.individual_scenario === "exhibition"
        ? d.individual_scenario
        : "multiple";
    return d;
  });

  const temp_scenarios = d3.flatRollup(
    data_scenarios_reworked,
    (v) => v.length,
    (d) => d.cluster,
    (d) => d.individual_scenario
  );

  const scenarios = d3.flatRollup(
    temp_scenarios,
    (v) => v,
    (d) => d[0]
  );
  // console.log("scenarios",scenarios)

  const returnScenarios = (cluster) => {
    const _scenarios = scenarios.find((e) => e[0] === cluster);
    return _scenarios[1].map((d) => ({ name: d[1], value: d[2] }));
  };

  const clusters = d3
    .flatRollup(
      data,
      (v) => [d3.mean(v, (d) => d._x), d3.mean(v, (d) => d._y), v.length],
      (d) => d.cluster
    )
    .map((d) => ({
      id: d[0],
      _x: d[1][0],
      _y: d[1][1],
      x: Number(d[1][0]),
      y: Number(d[1][1]),
      fading_x: Number(d[1][0]),
      fading_y: Number(d[1][1]),
      category: "cluster",
      exploration: returnExploration(d[0]),
      scenarios: returnScenarios(d[0]),
      size: d[1][2],
      title: "Cluster " + d[0],
    }));

  // console.log("clusters data", clusters);
  return clusters;
}
function makeItems(data, setCoordinates) {
  const clustersPositions = d3.flatRollup(
    data,
    (v) => [d3.mean(v, (d) => d._x), d3.mean(v, (d) => d._y)],
    (d) => d.cluster
  );

  data.forEach((d) => {
    const _clusterPosition = clustersPositions.find((c) => c[0] === d.cluster);
    if (setCoordinates) {
      d.x = Number(_clusterPosition[1][0]);
      d.y = Number(_clusterPosition[1][1]);
    }
    d.fading_x = Number(_clusterPosition[1][0]);
    d.fading_y = Number(_clusterPosition[1][1]);
    d.media = Array.isArray(d.media) ? d.media : d.media.split(";");
  });
  // set size of a "medium" in the gliph
  const mediumSize = 0.58 / d3.max(data, (d) => d.media.length);
  medium.range([0, mediumSize]);

  return data;
}
function makeNetworks(data) {
  const clustersPositions = d3.flatRollup(
    data,
    (v) => [d3.mean(v, (d) => d._x), d3.mean(v, (d) => d._y)],
    (d) => d.cluster
  );
  const tactics = d3.flatRollup(
    data,
    (v) => {
      const _arr = v.map((vv) => vv.tactics.split(";")).flat();
      const _cluster = clustersPositions.find((c) => c[0] === v[0].cluster);
      return d3
        .flatRollup(
          _arr,
          (v) => v.length,
          (d) => d
        )
        .map((d) => ({
          id: _cluster[0] + "-" + d[0],
          title: d[0],
          _x: _cluster[1][0],
          _y: _cluster[1][1],
          x: Number(_cluster[1][0]),
          y: Number(_cluster[1][1]),
          fading_x: Number(_cluster[1][0]) + 0,
          fading_y: Number(_cluster[1][1]) + 0,
          category: "tactic",
          size: d[1],
        }));
    },
    (d) => d.cluster
  );
  const flatTactics = tactics.map((d) => d[1]).flat();
  // console.log("flatTactics", flatTactics);

  const media = d3.flatRollup(
    data,
    (v) => {
      const _arr = v
        .map((vv) =>
          Array.isArray(vv.media) ? vv.media.flat() : vv.media.split(";").flat()
        )
        .flat();
      const _cluster = clustersPositions.find((c) => c[0] === v[0].cluster);
      return d3
        .flatRollup(
          _arr,
          (v) => v.length,
          (d) => d
        )
        .map((d) => ({
          id: _cluster[0] + "-" + d[0],
          title: d[0],
          _x: _cluster[1][0],
          _y: _cluster[1][1],
          x: Number(_cluster[1][0]),
          y: Number(_cluster[1][1]),
          fading_x: Number(_cluster[1][0]) + 0,
          fading_y: Number(_cluster[1][1]) + 0,
          category: "medium",
          size: d[1],
        }));
    },
    (d) => d.cluster
  );
  const flatMedia = media.map((d) => d[1]).flat();
  // console.log("flatMedia", flatMedia);

  const links = d3.flatRollup(
    data,
    (v) => {
      return v.map((d) => {
        const temp = d.cluster + "-" + d.id + "-";

        const linksTactics = d.tactics.split(";").map((t) => ({
          id: temp + t,
          source: d,
          target: flatTactics.find((ft) => ft.id === d.cluster + "-" + t),
        }));

        d.media = Array.isArray(d.media) ? d.media : d.media.split(";");
        const linksMedia = d.media.map((t) => ({
          id: temp + t,
          source: d,
          target: flatMedia.find((fm) => fm.id === d.cluster + "-" + t),
        }));
        return linksTactics.concat(linksMedia);
      });
    },
    (d) => d.cluster
  );
  const flatLinks = links.map((d) => d[1].flat()).flat();
  // console.log("flatLinks", flatLinks);

  return { nodes: data.concat(flatTactics, flatMedia), links: flatLinks };
}
const makeTourStep = ({ ids, k, duration }) => {
  const dataSelection = data.filter((d) => ids.indexOf(d.id) !== -1);
  zoomToSelection({ dataSelection, k, duration });
};
// simulation
const ticked = () => {
  cluster.attr("transform", (d) => `translate(${d.x}, ${d.y})`);
  item.attr("transform", (d) => `translate(${d.x}, ${d.y})`);
  tactic.attr("transform", (d) => `translate(${d.x}, ${d.y})`);
  link.attr("d", linkArc);
};
const simulation = d3
  .forceSimulation()
  .force(
    "x",
    d3
      .forceX((d) => Number(d._x))
      .strength((d) => (d.category === "tactic" ? 0 : 0.2))
  )
  .force(
    "y",
    d3
      .forceY((d) => Number(d._y))
      .strength((d) => (d.category === "tactic" ? 0 : 0.2))
  )
  .force(
    "link",
    d3
      .forceLink()
      .id((d) => d.id)
      .distance((d) => linkDistance(d.target.size))
  )
  .force("charge", d3.forceManyBody().strength(-5))
  .force(
    "collide",
    d3
      .forceCollide()
      .radius((d) => {
        const _radius = !d.category
          ? Math.sqrt(2 * Math.pow(side(d.size || 1), 2)) / 2
          : radius(d.size) * 0.85;
        return _radius;
      })
      .iterations(1)
  )
  .on("tick", ticked)
  .velocityDecay(0.65)
  .alphaDecay(0.01)
  .stop();
const switchRender = (mode, setCoordinates) => {
  switch (mode) {
    case "clusters":
      // console.log("update, clusters");
      update(makeClusters(data), []);
      break;
    case "projects":
      // console.log("update, projects");
      const projects = makeItems(data, setCoordinates);
      update(projects, []);
      break;
    case "networks":
      // console.log("update, networks");
      const net = makeNetworks(data);
      update(net.nodes, net.links);
      break;
    default:
      console.log("😱 no case matched. Don't update visualization.");
  }
};
const initialize = (element, _data, _setMode, _setTooltip, _setZoomState) => {
  console.log("initialize visualization");

  // Initialize variables
  originalData = JSON.parse(JSON.stringify(_data));
  data = _data;
  setTooltip = _setTooltip;
  setMode = _setMode;
  setZoomState = _setZoomState;

  svg = d3.select(element);
  g0 = svg.append("g");
  g = g0.append("g");
  contour = g
    .append("g")
    .classed("contours", true)
    .style("transform-origin", "0 0")
    .selectAll("path");
  link = g.append("g").classed("g-links", true).selectAll(".link");
  cluster = g.append("g").classed("g-clusters", true).selectAll(".cluster");
  item = g.append("g").classed("g-items", true).selectAll(".item");
  tactic = g.append("g").classed("g-tactics", true).selectAll(".tactic");

  bbox = svg.node().getBoundingClientRect();
  width = bbox.width;
  height = bbox.height;

  zoom = d3
    .zoom()
    .scaleExtent([1, 10])
    .translateExtent([
      [0, 0],
      [width, height],
    ])
    .on("zoom", zoomed);

  svg.attr("viewbox", `0 0 ${width} ${height}`).call(zoom);
  g.attr("transform", `translate(${width / 2}, ${height / 2})`);
  data = rescalePositions(data);
  makeContours(data); // need to pass original data
  switchRender("clusters");

  factor = mm_w / width;
  mm_h = height * factor;

  mm_x = width - mm_w - 20;
  mm_y = height - mm_h - 20;

  minimap = svg.append("g").attr("transform", `translate(${mm_x}, ${mm_y})`);
  minimap
    .append("rect")
    .attr("width", mm_w)
    .attr("height", mm_h)
    .attr("stroke", "var(--cognac-primer)")
    .attr("fill", "var(--light-grey-primer)");

  minimap
    .append("rect")
    .classed("mm-view", true)
    .attr("width", mm_w)
    .attr("height", mm_h)
    .attr("fill", "white")
    .attr("stroke", "var(--cognac-primer)")
    .attr("fill-opacity", 0.5);

  minimap
    .selectAll("circle")
    .data(data)
    .join("circle")
    .attr("r", 1)
    .attr("cx", (d) => d._x * factor + mm_w / 2)
    .attr("cy", (d) => d._y * factor + mm_h / 2);
};
const update = (nodes, links) => {
  // console.log("update");
  // console.log(nodes, links);

  link = link.data(links, (d) => d.id);
  link.exit().transition().duration(250).style("opacity", "-0.5").remove();
  link = link
    .enter()
    .append("path")
    .classed("link", true)
    .attr("stroke", "var(--dark-grey-primer)")
    .attr("stroke-width", "var(--stroke-width)")
    .attr("fill", "none")
    .style("opacity", "0")
    .merge(link);

  link.transition().delay(500).duration(500).style("opacity", "1");

  // clusters
  cluster = cluster.data(
    nodes.filter((d) => d.category === "cluster"),
    (d) => d.id
  );
  cluster
    .exit()
    .transition()
    .duration(750)
    .style("opacity", "-0.5")
    .attr("transform", (d) => `translate(${d.fading_x}, ${d.fading_y})`)
    .remove();
  cluster = cluster
    .enter()
    .append("g")
    .classed("cluster", true)
    .style("opacity", "0")
    .merge(cluster);

  cluster.transition().duration(500).style("opacity", "1");

  cluster.each(function (d) {
    const _side = side(d.size);
    const _r = Math.sqrt(2 * Math.pow(_side, 2)) / 2;
    const _data = [
      {
        id: d.id,
        r: _r,
        fill: "#7765E3",
        side: _side,
        exploration: d.exploration,
        scenarios: { name: d.id, children: d.scenarios },
      },
    ];
    renderCluster(this, _data);
  });

  // projects
  item = item.data(
    nodes.filter((d) => !d.category),
    (d) => d.id
  );
  item
    .exit()
    .transition()
    .duration(750)
    .style("opacity", "-0.5")
    .attr("transform", (d) => `translate(${d.fading_x}, ${d.fading_y})`)
    .remove();
  item = item
    .enter()
    .append("g")
    .classed("item", true)
    .style("opacity", "0")
    .on("click", (e, d) => {
      const data = {
        ...d,
        posX: e.pageX,
        posY: e.pageY,
      };
      return setTooltip(data);
    })
    .merge(item);

  item.transition().duration(500).style("opacity", "1");

  item.each(function (d) {
    const _side = side(1);
    const _r = Math.sqrt(2 * Math.pow(_side, 2)) / 2;
    const _data = [{ ...d, r: _r, side: _side }];
    renderProject(this, _data, medium(1));
  });

  // tactics
  tactic = tactic.data(
    nodes.filter((d) => d.category === "tactic" || d.category === "medium"),
    (d) => d.id
  );
  tactic
    .exit()
    .transition()
    .duration(750)
    .style("opacity", "-0.5")
    .attr("transform", (d) => `translate(${d.fading_x}, ${d.fading_y})`)
    .remove();
  tactic = tactic
    .enter()
    .append("g")
    .classed("tactic", true)
    .attr("stroke-width", "var(--stroke-width)")
    .style("opacity", "0")
    .on("click", (e, d) => {
      const data = {
        ...d,
        posX: e.pageX,
        posY: e.pageY,
      };
      minimap
        .selectAll("circle")
        .attr("fill", "black")
        .attr("r", 1)
        .filter(
          (dd) => dd.tactics.includes(d.title) || dd.media.includes(d.title)
        )
        .attr("fill", "var(--cognac-primer")
        .attr("r", 1.5);
      return setTooltip(data);
    })
    .merge(tactic);

  tactic.transition().duration(500).style("opacity", "1");

  tactic
    .selectAll("circle")
    .data(
      (d) => [d],
      (d) => d.id
    )
    .join("circle")
    .attr("r", (d) => radius(d.size))
    .attr("fill", (d) =>
      d.category === "medium" ? "var(--white-primer)" : "var(--grey-primer)"
    )
    .attr("stroke", "var(--black-primer)");

  tactic
    .selectAll("text")
    .data(
      (d) => [d],
      (d) => d.id
    )
    .join("text")
    .attr("fill", "black")
    .attr("font-size", "var(--label-size)")
    .attr("text-anchor", "middle")
    .text((d) => d.title.toUpperCase());

  // simulation
  simulation.nodes(nodes);
  simulation.force("link").links(links);
  simulation.alpha(1).restart();
};
const destroy = (element) => {
  d3.select(element).selectAll("*").remove();
};

export {
  initialize,
  update,
  switchRender,
  setZoom,
  zoomValues,
  zoomToSelection,
  rescalePositions,
  makeTourStep,
  destroy,
};
