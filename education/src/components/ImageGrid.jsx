// Import Javascript Modules
import React from "react";

// Import Material UI Components
import { Grid } from "@material-ui/core";
import { Box } from "@material-ui/core";
import { GridList } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

// Create Styles 
const useStyles = makeStyles((theme) => ({}));


// Image Grid container
// This is just a wrapper around the goal grid images
export const ImageGrid = (props) => {
  const classes = useStyles();
  return (
    <Grid container direction="column">
      <Box className={classes.root}>
        <GridList cols={6} component="div" cellHeight="auto">
          {props.children}
        </GridList>
      </Box>
      <Box>
        {/* <GridList cols={17} component="div" cellHeight="auto"></GridList> */}
      </Box>
    </Grid>
  );
};
