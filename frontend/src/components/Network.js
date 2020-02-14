import React, { useState, useEffect } from 'react';
import vis from 'vis-network';
import { firestore } from 'firebase';
import { FacultyConfig } from '../config/app-config';
import { RecordSummary, RecordPlotPanel } from './Summary';
import { flatMap } from 'lodash';
import { Button, Grid, Box, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { nodes, edges } from '../data/records.js';
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
    nodes: nodes,
    edges: edges
  };
  var options = {
    nodes: {
      shape: "dot",
      size: 100
    },
    layout: {
      randomSeed: 2020
    },
  };
  var network = new vis.Network(container, data, options);
  network.on("selectNode", function(params) {
    if (params.nodes.length == 1) {
      if (network.isCluster(params.nodes[0]) == true) {
        network.openCluster(params.nodes[0]);
      }
    }
  });
  clusterByColor(network, data);
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
