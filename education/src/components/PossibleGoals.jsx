import React, { Fragment } from "react";
import {
  Box,
  Grid,
  Typography,
  GridList,
  GridListTile,
  GridListTileBar
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import ImageLink from "./ImageLink";

const useStyles = makeStyles(theme => ({
  root: {},
  selected: {
    marginTop: "10px"
  },
  selectedTiles: {
    boxShadow: `0 0 8px 0px red`,
    transform: "scale(0.90)",
    borderColor: "whitesmoke",
    borderWidth: "2px",
    borderStyle: "solid",
    borderRadius: "3px",
    "&:focus": {
      outline: "none"
    }
  },
  regularTiles: {
    height: "100%",
    filter: "saturate(0.7)",
    "&:focus": {
      outline: "none"
    }
  },
  dimTiles: {
    filter: "saturate(0.3)"
  },
  selectAllBtn: {
    height: "100%",
    backgroundColor: theme.palette.primary.main,
    cursor: "pointer",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-evenly",
    alignItems: "center"
  },
  selectAllLabel: {
    height: "auto",
    position: "relative",
    padding: "0.5vh 0.5vw",
    outline: "1px solid #FFFFFFAA",
    "&>div": {
      margin: "0",
      "&>div": {
        fontSize: "1.5vw"
      }
    }
  }
}));

const PossibleGoals = props => {
  const classes = useStyles();
  const {PossibleGoalList, UpdatePossibleGoalList} = props;
  const handleTileClick = (event) => {
    const selectedGoal = event.target.name;
    const Goals = [...PossibleGoalList];
    Goals.forEach(goal => {
      if(String(goal.goal) === selectedGoal) {
        goal.isPossible = !goal.isPossible;
      }
      return goal;
    })
    UpdatePossibleGoalList(Goals);
  };
  const handleSelectAll = (state) => (event) => {
    const Goals = [...PossibleGoalList];
    if (state === "select") {
      Goals.forEach(goal=>{
        goal.isPossible = true
      })
    }
    if (state === "diselect") {
      Goals.forEach(goal=>{
        goal.isPossible = false
      })
    }
    UpdatePossibleGoalList(Goals);
  }

  return (
    <Fragment>
      <Grid container direction="column">
        <Box className={classes.root}>
          <GridList cols={6} component="div" cellHeight="auto">
            {PossibleGoalList.map(goal => (
              <GridListTile key={goal.goal} component="div">
                <ImageLink
                  goal={goal}
                  onClick={handleTileClick}
                  key={goal.goal}
                  disabled={false}
                  className={
                    goal.isPossible
                      ? classes.selectedTiles
                      : classes.regularTiles
                  }
                />
              </GridListTile>
            ))}
            <GridListTile key="selectAll" component="div">
              <Box className={classes.selectAllBtn}>
                <GridListTileBar
                  title="Select All"
                  className={classes.selectAllLabel}
                  onClick={handleSelectAll('select')}
                />
                <GridListTileBar
                  title="Diselect All"
                  className={classes.selectAllLabel}
                  onClick={handleSelectAll('diselect')}
                />
              </Box>
            </GridListTile>
          </GridList>
        </Box>
        <Box>
          {PossibleGoalList.filter(goal => goal.isPossible).length ? (
            <Typography>Selected Goals:</Typography>
          ) : null}
          <GridList cols={17} component="div" cellHeight="auto">
            {PossibleGoalList.filter(goal => goal.isPossible).map(goal => (
              <GridListTile key={goal.goal} component="div">
                <ImageLink
                  goal={goal}
                  key={goal.goal}
                  disabled={true}
                  className={classes.goalThumbnail}
                />
              </GridListTile>
            ))}
          </GridList>
        </Box>
      </Grid>
    </Fragment>
  );
};

export default PossibleGoals;
