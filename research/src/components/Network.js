import React from "react";
import { Box, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Graphin from "@antv/graphin";
import "@antv/graphin/dist/index.css";

import recordNodes from "../data/records.js";

const useStyle = makeStyles((theme) => ({
  app: {
    height: "100vh",
  },
  wrapper: {
    overflowY: "auto",
  },
  recordsWrapper: {
    width: "100%",
  },
}));

const NetworkSDG = (props) => {
  const classes = useStyle();
  const data = {
    edges: [],
    nodes: recordNodes.nodes,
  };

  return (
    <Box height="100%" width="100%" className={classes.wrapper}>
      <Typography variant="h2">Recent Records</Typography>
      <Box width="800px" height="800px">
        <Graphin
          data={data}
          layout={{ name: "force" }}
          className={classes.app}
        />
      </Box>
    </Box>
  );
};
export default NetworkSDG;
