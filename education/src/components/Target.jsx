import React, { useState, useContext } from "react";
import {
  Box,
  Grid,
  GridList,
  GridListTile,
  Typography,
} from "@material-ui/core";

import { makeStyles } from "@material-ui/core/styles";

import { SideTable } from "./SideTable";
import ImageLink from "./ImageLink";
import TargetDrawer from "./TargetDrawer";

import { GoalContext } from "../context/GoalContext";
import { SDGContext } from "../context/SDGContext";
import { RecordsContext } from "../context/RecordsContext";

const useStyles = makeStyles((theme) => ({
  goalcover: {
    width: "100%",
    height: "175px",
    flexShrink: 0,
    backgroundPosition: "top left",
  },
  tableWrapper: {
    width: "100%",
  },
  table: {
    width: "100%",
    maxHeight: "150px",
    overflowY: "scroll",
    marginBottom: "15px",
    "& tbody": {
      "& *": {
        fontSize: "inherit",
        padding: "2px 5px",
      },
    },
  },
  goalheader: {
    display: "flex",
    alignItems: "center",
    "& p": {
      color: theme.palette.primary.contrastText,
      fontSize: "larger",
    },
    "& h3": {
      color: theme.palette.primary.contrastText,
      paddingRight: "10px",
      paddingLeft: "5px",
    },
  },
  titleTile: {
    maxWidth: "150px",
    maxHeight: "150px",
  },
}));

function Target(props) {
  const classes = useStyles();
  const { PossibleGoals } = useContext(GoalContext);
  const { CurrentSDG } = useContext(SDGContext);
  const { Records } = useContext(RecordsContext);
  const [targetFor, showTargetFor] = useState([false, false]);
  const toggleTarget = (idx) => (event) => {
    const newState = [...targetFor];
    newState[idx] = !newState[idx];
    showTargetFor(newState);
  };

  return (
    <>
      <Grid item className={classes.tableWrapper}>
        {Records.length ? (
          <React.Fragment>
            <Typography m={0} variant="overline">
              Selected Records
            </Typography>
            <SideTable />
          </React.Fragment>
        ) : null}
      </Grid>
      {CurrentSDG.Goals ? (
        <GridList cols={2} component="div" cellHeight="auto" spacing={16}>
          {PossibleGoals.filter(
            (goal) => goal.isSelected && goal.isPossible
          ).map((goal, idx) => {
            return (
              <GridListTile key={goal.goal} component="div">
                <Box
                  style={{
                    border: `2px solid ${goal.colorInfo.hex}`,
                    backgroundColor: goal.colorInfo.hex,
                    height: "150px",
                  }}
                >
                  <ImageLink
                    key={goal.goal}
                    goal={goal}
                    onClick={toggleTarget(idx)}
                    disabled={false}
                    className={classes.titleTile}
                  />
                </Box>
                <TargetDrawer state={targetFor[idx]} goal={goal} />
              </GridListTile>
            );
          })}
        </GridList>
      ) : (
        <Typography variant="h4">
          Select one/two goal(s) from sidebar.
        </Typography>
      )}
    </>
  );
}
export default Target;
