import React, { useState, useEffect } from 'react';
import vis from 'vis-network';
import { firestore } from 'firebase';
import { FacultyConfig } from '../config/app-config';
import { RecordSummary, RecordPlotPanel } from './Summary';
import { flatMap } from 'lodash';
import { Button, Grid, Box, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { nodes, edges } from '../data/records.js';
import miserables from '../data/miserables.json';
import { Records } from '../data/records.js';
var unsubscribe;

const useStyle = makeStyles(theme => ({
  wrapper: {
    overflowY: 'auto'
  },
  recordsWrapper: {
    width: '100%',
  }
}))

const redrawAll = () => {
  var container = document.getElementById("network");
  var data = {
    nodes: miserables.nodes.map((item, key) => ({
      id: key,
      label: item.name,
      group: item.group
    })),
    edges: miserables.links.map(item => ({
      from: item.source,
      to: item.target,
    }))
  };
  console.log(data)
  var options = {
    layout: {
      randomSeed: 123,
    },
    nodes: {
      shape: 'dot',
      size: 16
    },
    physics: {
      forceAtlas2Based: {
        gravitationalConstant: -50,
        centralGravity: 0.05,
        springLength: 50,
        springConstant: 0.18
      },
      maxVelocity: 10,
      solver: 'forceAtlas2Based',
      timestep: 0.2,
      stabilization: {
        iterations: 50
      }
    }
  };
  var network = new vis.Network(container, data, options);
  /* network.on("selectNode", function(params) {
   *   if (params.nodes.length == 1) {
   *     if (network.isCluster(params.nodes[0]) == true) {
   *       network.openCluster(params.nodes[0]);
   *     }
   *   }
   * }); */
  /* clusterByColor(network, data); */
}

function clusterByColor(network, data) {
  network.setData(data);
  var colors = [...new Set(data.nodes.flatMap(item=>item.color))];
  var clusterOptionsByData;
  for (var i = 0; i < colors.length; i++) {
    var color = colors[i];
    clusterOptionsByData = {
      joinCondition: function(childOptions) {
        return childOptions.color.background == color; // the color is fully defined in the node.
      },
      processProperties: function(clusterOptions, childNodes, childEdges) {
        var totalMass = 0;
        for (var i = 0; i < childNodes.length; i++) {
          totalMass += childNodes[i].mass;
        }
        clusterOptions.mass = totalMass;
        return clusterOptions;
      },
      clusterNodeProperties: {
        size: 200,
        id: "cluster:" + color,
        borderWidth: 3,
        shape: "dot",
        color: color,
        label: "color:" + color,
      }
    };
    network.cluster(clusterOptionsByData);
  }
}

const Network = (props) =>  {
  const classes = useStyle();
  const [records, setRecords] = useState({})
  useEffect(() => (
    redrawAll()
  ), []);
  /* useEffect(() => {
   *   const db = firestore();

   *   unsubscribe = db.collection("records")
   *     .orderBy('created', 'desc')
   *     .limit(8)
   *     .onSnapshot(snapshot => {
   *       let records = [];
   *       snapshot.forEach(doc => records.push({ ...doc.data() }))
   *       setRecords(records)
   *       console.log(records)
   *     });
   *   return () => unsubscribe();
   * }, []) */

  return(
    <Box height="100%" width="100%" className={classes.wrapper}>
      <Typography variant="h2">Recent Records</Typography>
      <Box width="800px" height="800px" id="network">
      </Box>
    </Box>
  )
}
export default Network;
