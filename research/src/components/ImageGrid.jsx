import React from "react";
import { Grid } from "@material-ui/core";
import { Box } from "@material-ui/core";
import { GridList } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({}));
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
