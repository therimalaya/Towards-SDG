import React, { useState, useContext } from "react";
import { Box, Grid, GridList, GridListTile } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import ImageLink from "./ImageLink";
import { GoalContext } from "../context/GoalContext";
import { SDGContext } from "../context/SDGContext";

const useStyles = makeStyles((theme) => ({
  selected: {
    marginTop: "10px",
  },
  selectedTiles: {
    boxShadow: `0 0 8px 0px red`,
    transform: "scale(0.80)",
    borderColor: "whitesmoke",
    borderWidth: "2px",
    borderStyle: "solid",
    borderRadius: "3px",
    "&:focus": {
      outline: "none",
    },
    filter: "saturate(1.3)",
  },
  regularTiles: {
    "&:focus": {
      outline: "none",
    },
  },
  dimTiles: {
    filter: "saturate(0.3)",
  },
  root: {},
}));

const Goal = (props) => {
  const classes = useStyles();
  const { PossibleGoals, UpdatePossibleGoals } = useContext(GoalContext);
  const { UpdateCurrentSDG } = useContext(SDGContext);
  const [CandidateGoals, setCandidateGoals] = useState(
    PossibleGoals.filter((goal) => goal.isPossible)
  );
  const disableFilter = (GoalList) =>
    GoalList.filter((goal) => goal.isSelected).length >= 2;
  const handleTileClick = (event) => {
    const newGoals = [...PossibleGoals];
    newGoals.forEach((goal) => {
      if (goal.goal === Number(event.target.name)) {
        goal.isSelected = !goal.isSelected;
      }
    });
    UpdateCurrentSDG(
      "Goals",
      newGoals.filter((goal) => goal.isSelected).map((goal) => goal.goal)
    );
    setCandidateGoals(newGoals.filter((goal) => goal.isPossible));
    UpdatePossibleGoals(newGoals);
  };

  return (
    <Grid container direction="column">
      <Box className={classes.root}>
        {CandidateGoals.length ? (
          <GridList cols={6} component="div" cellHeight="auto">
            {CandidateGoals.map((goal) => (
              <GridListTile key={goal.goal} component="div">
                <ImageLink
                  goal={goal}
                  onClick={handleTileClick}
                  disabled={disableFilter(CandidateGoals) & !goal.isSelected}
                  className={
                    disableFilter(CandidateGoals) & !goal.isSelected
                      ? classes.dimTiles
                      : goal.isSelected
                      ? classes.selectedTiles
                      : classes.regularTiles
                  }
                  key={goal.goal}
                />
              </GridListTile>
            ))}
          </GridList>
        ) : null}
      </Box>
    </Grid>
  );
};

export default Goal;
