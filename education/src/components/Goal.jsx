import React, { Fragment, useState, useEffect } from "react";
import GoalGrid from "./GoalGrid";
import { Box, Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  root: {}
}));

const Goal = props => {
  const classes = useStyles();
  const { GoalList } = props;
  const { PossibleGoals, SetPossibleGoals } = props;
  const disableFilter = goal => false;

  const handleClick = Goals => event => {
    const newGoals = Goals;
    SetPossibleGoals(newGoals);
  };

  return (
    <Fragment>
      <Grid container direction="column">
        <Box className={classes.root}>
          <GoalGrid 
            disableFilter={disableFilter(PossibleGoals)}
            AllGoals={GoalList}
            handleClick={handleClick}
          />
        </Box>
      </Grid>
    </Fragment>
  );
};

export default Goal;

