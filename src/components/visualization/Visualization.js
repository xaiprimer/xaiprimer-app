import React from "react";
import { useEffect, useRef } from "react";

import * as d3 from "d3";

import data from "./data-primer.json";

const Visualization = () => {
  const svgEl = useRef();
  const g1El = useRef();
  const miniMapEl = useRef();
  useEffect(() => {
    let zoomLevel = 0;
    const xy = d3.scaleLinear().domain([0, 1]).range([0, 100]);
    const radius = d3.scaleSqrt().domain([0, 1]).range([0, 30]);
    const linkDistance = d3.scaleSqrt().domain([0, 1]).range([0, 50]);
    const simulation = d3
      .forceSimulation()
      .force(
        "x",
        d3
          .forceX((d) => xy(+d._x))
          .strength((d) => (d.category === "tactic" ? 0 : 0.2))
      )
      .force(
        "y",
        d3
          .forceY((d) => xy(+d._y))
          .strength((d) => (d.category === "tactic" ? 0 : 0.2))
      )
      .force(
        "link",
        d3
          .forceLink()
          .id((d) => d.id)
          .distance((d) => linkDistance(d.target.size))
      )
      .force("charge", d3.forceManyBody().strength(-200))
      .force(
        "collide",
        d3
          .forceCollide()
          .radius((d) => radius(d.size || 1) * (d.category ? 0.6 : 1))
          .iterations(1)
      )
      .on("tick", ticked)
      .velocityDecay(0.65)
      .alphaDecay(0.01)
      .stop();

    const zoom = d3.zoom().on("zoom", zoomed),
      svg = d3.select(svgEl.current).call(zoom),
      g1 = d3.select(g1El.current),
      miniMap = d3.select(miniMapEl.current),
      bbox = svg.node().getBoundingClientRect(),
      width = bbox.width,
      height = bbox.height;

    // contours
    const extent_x = d3.extent(data, (d) => +d._x);
    const extent_y = d3.extent(data, (d) => +d._y);

    const cont_x = d3
      .scaleLinear()
      .domain(extent_x)
      .range([0, extent_x[1] - extent_x[0]]);
    const cont_y = d3
      .scaleLinear()
      .domain(extent_y)
      .range([0, extent_y[1] - extent_y[0]]);

    let dataContour = data.map((d) => [xy(cont_x(+d._x)), xy(cont_y(+d._y))]);

    const maxX = d3.max(dataContour, (d) => d[0]);
    const maxY = d3.max(dataContour, (d) => d[1]);

    const contours = d3
      .contourDensity()
      .size([maxX, maxY])
      .bandwidth(130)
      .thresholds(7)(dataContour);

    let contour = g1
      .append("g")
      .attr("transform", `translate(${xy(extent_x[0])}, ${xy(extent_y[0])})`)
      .selectAll("path");

    contour
      .data(contours)
      .join("path")
      .attr("stroke", "#ccc")
      .attr("fill", "#fff")
      .attr("fill-opacity", 0.35)
      .attr("d", d3.geoPath());

    let link = g1.append("g").selectAll(".link");
    let item = g1.append("g").selectAll(".item");
    
    // mini map
    const mm_opts = {
      width: 240,
      margin: 10,
    };
    mm_opts.height = (height / width) * mm_opts.width;
    mm_opts.x = width - mm_opts.width - 2 * mm_opts.margin;
    mm_opts.y = height - mm_opts.height - 2 * mm_opts.margin;
    miniMap.attr("transform", `translate(${mm_opts.x}, ${mm_opts.y})`);

    const mm_scale = d3.scaleLinear().domain([0,width]).range([0,mm_opts.width]);

    miniMap
      .append("rect")
      .attr("width", mm_opts.width)
      .attr("height", mm_opts.height)
      .attr("fill", "white")
      .attr("stroke", "#ccc");
    
    miniMap.selectAll("circle")
      .data(data)
      .join("circle")
      .attr("r",2)
      .attr("cx",d=>d._x)
      .attr("cy",d=>d._y)

    miniMap
      .append("rect")
      .attr("width", mm_opts.width)
      .attr("height", mm_opts.height)
      .attr("fill", "rgba(255,255,255,0.5)")
      .attr("stroke", "#3479FF");

    update(makeClusters(data), []);

    // set initial zoom
    
    const gBBox = g1.node().getBBox(),
          x0 = gBBox.x,
          y0 = gBBox.y,
          x1 = x0 + gBBox.width,
          y1 = y0 + gBBox.height;

    const scale = 1 / Math.max((x1 - x0) / width, (y1 - y0) / height)

    const translation = [
      -(x0*scale + (gBBox.width*scale - width)/2),
      -(y0*scale + (gBBox.height*scale - height)/2)
    ]

    svg
      .attr("viewbox", `0 0 ${width} ${height}`)
      .call(
        zoom.transform,
        d3.zoomIdentity.translate(width / 2, height / 2).scale(0.01)
      )
      .transition()
      .duration(1000)
      .call(
        zoom.transform,
        d3.zoomIdentity.translate(translation[0], translation[1]).scale(scale)
      );
      
    function zoomed(e) {
      const { x, y, k } = e.transform;
      const previousZoom = zoomLevel;
      if (k < 0.2) {
        zoomLevel = 0;
      } else if (k < 0.5) {
        zoomLevel = 1;
      } else {
        zoomLevel = 2;
      }
      g1.style("transform", `translate(${x}px,${y}px) scale(${k})`);

      if (previousZoom !== zoomLevel) {
        switch (zoomLevel) {
          case 0:
            update(makeClusters(data), []);
            svg.style("background-color", "#F9F9F9");
            break;
          case 1:
            const projects = makeItems(data, previousZoom !== 2);
            update(projects, []);
            svg.style("background-color", "#F5F5F5");
            break;
          case 2:
            const net = makeNetworks(data);
            update(net.nodes, net.links);
            svg.style("background-color", "#EBEBEB");
            break;
          default:
          // do nothing
        }
      }
    }

    function ticked() {
      item.attr("transform", (d) => `translate(${d.x}, ${d.y})`);
      link.attr("d", linkArc);
    }

    function update(nodes, links) {
      link = link.data(links, (d) => d.id);
      link.exit().transition().duration(250).style("opacity", "-0.5").remove();
      link = link
        .enter()
        .append("path")
        .classed("link", true)
        .attr("stroke", "black")
        .attr("fill", "none")
        .style("opacity", "0")
        .merge(link);

      link.transition().delay(500).duration(500).style("opacity", "1");

      item = item.data(nodes, (d) => d.id);
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
        .merge(item);

      item.transition().duration(500).style("opacity", "1");

      item
        .selectAll("circle")
        .data(
          (d) => [d],
          (d) => d.id
        )
        .join("circle")
        .attr("r", (d) => radius(d.size || 1))
        .attr("fill", (d) =>
          d.category === "cluster"
            ? "#7765E3"
            : d.category === "tactic"
            ? "#FFFFFF"
            : "#E4FF1A"
        );

      item
        .selectAll("text")
        .data(
          (d) => [d],
          (d) => d.id
        )
        .join("text")
        .attr("fill", "black")
        .attr("font-size", 30)
        .attr("y", 10)
        .attr("text-anchor", "middle")
        .text((d) => d.title.toUpperCase());

      simulation.nodes(nodes);
      simulation.force("link").links(links);
      simulation.alpha(1).restart();
    }

    function linkArc(d) {
      const r = Math.hypot(d.target.x - d.source.x, d.target.y - d.source.y);
      return `
        M${d.source.x},${d.source.y}
        A${r},${r} 0 0,1 ${d.target.x},${d.target.y}
      `;
    }

    function makeClusters(data) {
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
          x: xy(d[1][0]),
          y: xy(d[1][1]),
          fading_x: xy(d[1][0]),
          fading_y: xy(d[1][1]),
          category: "cluster",
          size: d[1][2],
          title: "Cluster " + d[0],
        }));
      return clusters;
    }

    function makeItems(data, setCoordinates) {
      const clustersPositions = d3.flatRollup(
        data,
        (v) => [d3.mean(v, (d) => d._x), d3.mean(v, (d) => d._y)],
        (d) => d.cluster
      );

      data.forEach((d) => {
        const _clusterPosition = clustersPositions.find(
          (c) => c[0] === d.cluster
        );
        if (setCoordinates) {
          d.x = xy(_clusterPosition[1][0]);
          d.y = xy(_clusterPosition[1][1]);
        }
        d.fading_x = xy(_clusterPosition[1][0]);
        d.fading_y = xy(_clusterPosition[1][1]);
      });

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
          const _arr = v.map((vv) => vv.alltactics.split(";")).flat();
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
              x: xy(_cluster[1][0]),
              y: xy(_cluster[1][1]),
              fading_x: xy(_cluster[1][0]) + 0,
              fading_y: xy(_cluster[1][1]) + 0,
              category: "tactic",
              size: d[1],
            }));
        },
        (d) => d.cluster
      );
      const flatTactics = tactics.map((d) => d[1]).flat();

      const links = d3.flatRollup(
        data,
        (v) => {
          return v.map((d) => {
            const temp = d.cluster + "-" + d.id + "-";
            return d.alltactics.split(";").map((t) => ({
              id: temp + t,
              source: d,
              target: flatTactics.find((ft) => ft.id === d.cluster + "-" + t),
            }));
          });
        },
        (d) => d.cluster
      );
      const flatLinks = links.map((d) => d[1].flat()).flat();

      return { nodes: flatTactics.concat(data), links: flatLinks };
    }
  }, []);

  return (
    <>
      <svg ref={svgEl} style={{ width: "100%", height: "100%" }}>
        <g ref={g1El}></g>
        <g ref={miniMapEl}></g>
      </svg>
    </>
  );
};

export default Visualization;
