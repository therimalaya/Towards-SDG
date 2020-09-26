import React from "react";
import { Box } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

// Data, Images and realted stuffs
import NMBUwhite from "../images/NMBUwhite.svg";

const useStyles = makeStyles((theme) => ({
  sideinfo: {
    backgroundColor: "#efefef",
    padding: "1rem",
    overflowY: "auto",
  },
  header: {
    background: 'url("./images/header.jpg")',
    backgroundPosition: "center",
    backgroundSize: "cover",
    minHeight: "150px",
    borderBottom: `5px solid ${theme.palette.primary.main}`,
  },
  sidefooter: {
    backgroundColor: theme.palette.primary.main,
    backgroundImage: `url(${NMBUwhite})`,
    backgroundPosition: "left",
    backgroundSize: "auto 100%",
    backgroundRepeat: "no-repeat",
    height: "60px",
  },
}));
const SideBarPanel = (props) => {
  const classes = useStyles();
  return (
    <Box height="100%" width="25%" display="flex" flexDirection="column">
      <Box className={classes.header}></Box>
      <Box className={classes.sideinfo} flexGrow={1}>
        {props.children}
      </Box>
      <Box className={classes.sidefooter}></Box>
    </Box>
  );
};

export default SideBarPanel;
