import React, { useState, useEffect, useRef } from "react";
import * as d3 from "d3";
import miserables from "./D3/miserables.json";
import { TextField, MenuItem, Box, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyle = makeStyles(theme => ({
  wrapper: {
    overflowY: "auto"
  },
  recordsWrapper: {
    width: "100%"
  },
  svgHeatmap: {
    font: "10px sans-serif"
  },
  background: {
    fill: "#eee"
  },
  line: {
    stroke: "#fff"
  },
  text: {
    "&.active": {
      fill: "red"
    }
  }
}));

const D3Component = props => {
  const classes = useStyle();
  const d3Container = useRef(null);
  const orderRef = useRef(null);
  const [order, setOrder] = useState("name");
  const [init, setInit] = useState(true);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const draw = () => {
    var margin = { top: 80, right: 0, bottom: 10, left: 80 },
      width = 720,
      height = 720;

    var x = d3.scaleBand().range([0, width]),
      z = d3
        .scaleLinear()
        .domain([0, 4])
        .clamp(true),
      c = d3.scaleOrdinal(d3.schemeCategory10);

    var svg = d3
      .select(d3Container.current)
      .append("svg")
      .attr("class", classes.svgHeatmap)
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    d3.json(
      "https://raw.githubusercontent.com/d3/d3-plugins/master/graph/data/miserables.json"
    ).then(function(miserables) {
      var matrix = [],
        nodes = miserables.nodes,
        n = nodes.length;

      // Compute index per node.
      nodes.forEach(function(node, i) {
        node.index = i;
        node.count = 0;
        matrix[i] = d3.range(n).map(function(j) {
          return { x: j, y: i, z: 0 };
        });
      });

      // Convert links to matrix; count character occurrences.
      miserables.links.forEach(function(link) {
        matrix[link.source][link.target].z += link.value;
        matrix[link.target][link.source].z += link.value;
        matrix[link.source][link.source].z += link.value;
        matrix[link.target][link.target].z += link.value;
        nodes[link.source].count += link.value;
        nodes[link.target].count += link.value;
      });

      // Precompute the orders.
      var orders = {
        name: d3.range(n).sort(function(a, b) {
          return d3.ascending(nodes[a].name, nodes[b].name);
        }),
        count: d3.range(n).sort(function(a, b) {
          return nodes[b].count - nodes[a].count;
        }),
        group: d3.range(n).sort(function(a, b) {
          return nodes[b].group - nodes[a].group;
        })
      };

      // The default sort order.
      x.domain(orders[order]);

      svg
        .append("rect")
        .attr("class", classes.background)
        .attr("width", width)
        .attr("height", height);

      var row = svg
        .selectAll(".row")
        .data(matrix)
        .enter()
        .append("g")
        .attr("class", "row")
        .attr("transform", function(d, i) {
          return "translate(0," + x(i) + ")";
        })
        .each(rowfn);

      row
        .append("line")
        .attr("class", classes.line)
        .attr("x2", width);

      row
        .append("text")
        .attr("x", -6)
        .attr("y", x.bandwidth() / 2)
        .attr("dy", ".32em")
        .attr("text-anchor", "end")
        .text(function(d, i) {
          return nodes[i].name;
        });

      var column = svg
        .selectAll(".column")
        .data(matrix)
        .enter()
        .append("g")
        .attr("class", "column")
        .attr("transform", function(d, i) {
          return "translate(" + x(i) + ")rotate(-90)";
        });

      column
        .append("line")
        .attr("class", classes.line)
        .attr("x1", -width);

      column
        .append("text")
        .attr("x", 6)
        .attr("y", x.bandwidth() / 2)
        .attr("dy", ".32em")
        .attr("text-anchor", "start")
        .text(function(d, i) {
          return nodes[i].name;
        });

      function rowfn(row) {
        d3.select(this)
          .selectAll(".cell")
          .data(
            row.filter(function(d) {
              return d.z;
            })
          )
          .enter()
          .append("rect")
          .attr("class", "cell")
          .attr("x", function(d) {
            return x(d.x);
          })
          .attr("width", x.bandwidth())
          .attr("height", x.bandwidth())
          .style("fill-opacity", function(d) {
            return z(d.z);
          })
          .style("fill", function(d) {
            return nodes[d.x].group === nodes[d.y].group
              ? c(nodes[d.x].group)
              : null;
          })
          .on("mouseover", mouseover)
          .on("mouseout", mouseout);
      }

      function mouseover(p) {
        d3.selectAll(".row text").classed("active", function(d, i) {
          return i === p.y;
        });
        d3.selectAll(".column text").classed("active", function(d, i) {
          return i === p.x;
        });
      }

      function mouseout() {
        d3.selectAll("text")
          .attr("class", classes.text)
          .classed("active", false);
      }

      d3.select(orderRef.content).on("change", function() {
        orderPlot(order);
        /* clearTimeout(timeout); */
      });

      function orderPlot(value) {
        x.domain(orders[value]);

        var t = svg.transition().duration(2500);

        t.selectAll(".row")
          .delay(function(d, i) {
            return x(i) * 4;
          })
          .attr("transform", function(d, i) {
            return "translate(0," + x(i) + ")";
          })
          .selectAll(".cell")
          .delay(function(d) {
            return x(d.x) * 4;
          })
          .attr("x", function(d) {
            return x(d.x);
          });

        t.selectAll(".column")
          .delay(function(d, i) {
            return x(i) * 4;
          })
          .attr("transform", function(d, i) {
            return "translate(" + x(i) + ")rotate(-90)";
          });
      }
    });
  };

  const handleSelectChange = event => {
    setOrder(event.target.value);
  };

  useEffect(() => {
    if (init) {
      draw();
    } else {
      d3Container.current.focus();
      draw();
    }
    setInit(false);
  }, [draw, init]);

  return (
    <React.Fragment>
      <div className="d3-component" ref={d3Container}></div>
      <TextField
        onChange={handleSelectChange}
        ref={orderRef}
        id="options"
        select
        value={order}
        variant="outlined"
      >
        <MenuItem key="name" value="name">
          By Name
        </MenuItem>
        <MenuItem key="count" value="count">
          By Frequency
        </MenuItem>
        <MenuItem key="group" value="group">
          By Cluster
        </MenuItem>
      </TextField>
    </React.Fragment>
  );
};

const Heatmap = props => {
  const classes = useStyle();

  return (
    <Box height="100%" width="100%" className={classes.wrapper}>
      <Typography variant="h2"></Typography>
      <Box width="800px" height="800px" id="network">
        <D3Component data={miserables} />
      </Box>
    </Box>
  );
};
export default Heatmap;
