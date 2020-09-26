import React from "react";
import { Box } from "@material-ui/core";

const MainPanel = (props) => {
  return (
    <Box
      width="96%"
      height="96%"
      display="flex"
      flexDirection="column"
      flexGrow={1}
      p={4}
      style={{ overflow: "hidden" }}
    >
      {props.children}
    </Box>
  );
};

export default MainPanel;
