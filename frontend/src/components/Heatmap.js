import React, { useState, useEffect } from 'react';
import rd3 from 'react-d3-library';
import node from './D3/d3-heatmap.js'
import { firestore } from 'firebase';
import { FacultyConfig } from '../config/app-config';
import { RecordSummary, RecordPlotPanel } from './Summary';
import { flatMap } from 'lodash';
import { Button, Grid, Box, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { nodes, edges } from '../data/records.js';
import { Records } from '../data/records.js';

const useStyle = makeStyles(theme => ({
  wrapper: {
    overflowY: 'auto'
  },
  recordsWrapper: {
    width: '100%',
  }
}))
const RD3Component = rd3.Component;


const Heatmap = (props) =>  {
  const classes = useStyle();
  const [graph, setGraph] = useState('')

  useEffect(() => (
    setGraph(node)
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
  return <RD3Component data={graph} />


  {/* return(
      <Box height="100%" width="100%" className={classes.wrapper}>
      <Typography variant="h2"></Typography>
      <Box width="800px" height="800px" id="network">
      <RD3Component data={graph} />
      </Box>
      </Box>
      ) */}
}
export default Heatmap;
